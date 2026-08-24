import { useState, useRef, useEffect, useMemo } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  Search,
  Compass,
  Sparkles,
  Radio as RadioIcon,
  Clock,
  ListMusic,
  Disc,
  Mic2,
  Flame,
  Music2,
  Headphones,
  X,
  Share2,
  Check,
  ExternalLink,
  Layers
} from "lucide-react";
import {
  musicTracks,
  musicAlbums,
  curatedPlaylists,
  appleMusicEmbeds
} from "../data/musicData";

function Music() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState("listen-now"); // listen-now, browse, embeds, radio, favorites, recently-played
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmbed, setSelectedEmbed] = useState(appleMusicEmbeds[0]);

  // Audio Playback state
  const [currentTrack, setCurrentTrack] = useState(musicTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(372);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat-all, 2: repeat-one

  // UI Panels state
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("kk_music_favorites");
      return saved ? JSON.parse(saved) : [1, 2, 4];
    } catch {
      return [1, 2, 4];
    }
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState([
    musicTracks[0],
    musicTracks[1],
    musicTracks[3]
  ]);
  const [copiedToast, setCopiedToast] = useState(false);

  const audioRef = useRef(null);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kk_music_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Could not save favorites", e);
    }
  }, [favorites]);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  // Play specific track
  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);

    // Update recently played
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((t) => t.id !== track.id);
      return [track, ...filtered].slice(0, 10);
    });

    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  // Next Track
  const handleNext = () => {
    const list = filteredTracks.length > 0 ? filteredTracks : musicTracks;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * list.length);
      handlePlayTrack(list[randomIndex]);
      return;
    }
    const currentIndex = list.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % list.length;
    handlePlayTrack(list[nextIndex]);
  };

  // Previous Track
  const handlePrev = () => {
    if (currentTime > 4 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const list = filteredTracks.length > 0 ? filteredTracks : musicTracks;
    const currentIndex = list.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    handlePlayTrack(list[prevIndex]);
  };

  // Toggle Favorite
  const toggleFavorite = (trackId, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]
    );
  };

  // Audio Events
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnded = () => {
    if (repeatMode === 2) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === 1) {
      handleNext();
    } else {
      const list = filteredTracks.length > 0 ? filteredTracks : musicTracks;
      const currentIndex = list.findIndex((t) => t.id === currentTrack.id);
      if (currentIndex < list.length - 1) {
        handleNext();
      } else {
        setIsPlaying(false);
      }
    }
  };

  // Seek
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Volume
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.9;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  // Format Time
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return musicTracks.filter((track) => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre = selectedGenre === "All" || track.genre === selectedGenre;

      if (!matchesSearch || !matchesGenre) return false;

      if (activeTab === "favorites") {
        return favorites.includes(track.id);
      }
      if (activeTab === "recently-played") {
        return recentlyPlayed.some((t) => t.id === track.id);
      }
      return true;
    });
  }, [searchQuery, selectedGenre, activeTab, favorites, recentlyPlayed]);

  const featuredTrack = musicTracks[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const genres = ["All", "Rock Chic", "Electric Chic", "Acoustic"];

  return (
    <div className="min-h-screen bg-[#0E0E12] text-[#F0F0F5] flex flex-col font-sans selection:bg-[#FF1F8E] selection:text-white pb-28">
      {/* Hidden Native Audio Element with Direct Working Audio */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
      />

      {/* Main Apple Music Container */}
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto overflow-hidden">
        {/* Left Sidebar - Apple Music Style */}
        <aside className="w-64 lg:w-72 shrink-0 hidden md:flex flex-col border-r border-[#23232E] bg-[#14141B]/95 backdrop-blur-2xl p-5 sticky top-14 h-[calc(100vh-3.5rem)] justify-between">
          <div className="space-y-6">
            {/* Top Left Logo & Apple Music Style Header */}
            <div className="flex items-center gap-3 px-1 py-1 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF1F8E] to-[#7B5EA7] rounded-xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center">
                  <img
                    src="/kk-logo.png"
                    alt="The KK Factor"
                    className="h-9 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider uppercase text-white flex items-center gap-1.5">
                  KK Music
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FF1F8E] animate-pulse" />
                </span>
                <span className="text-[11px] font-semibold text-[#8E8EA0]">
                  Apple Music Player
                </span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8EA0]" />
              <input
                type="text"
                placeholder="Search songs, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1F1F2A] text-white text-xs placeholder-[#707085] pl-9 pr-8 py-2 rounded-lg border border-transparent focus:border-[#FF1F8E] focus:outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8EA0] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Navigation Sections */}
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#707085] px-3 mb-2">
                  Discover
                </p>
                <nav className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab("listen-now");
                      setSelectedGenre("All");
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "listen-now"
                        ? "bg-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/25"
                        : "text-[#B0B0C5] hover:bg-[#1F1F2A] hover:text-white"
                    }`}
                  >
                    <Compass className="w-4 h-4" />
                    <span>Listen Now</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("browse");
                      setSelectedGenre("All");
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "browse"
                        ? "bg-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/25"
                        : "text-[#B0B0C5] hover:bg-[#1F1F2A] hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Browse All</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("embeds");
                      setSelectedGenre("All");
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "embeds"
                        ? "bg-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/25"
                        : "text-[#B0B0C5] hover:bg-[#1F1F2A] hover:text-white"
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Apple & Spotify Embeds</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("radio");
                      setSelectedGenre("All");
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "radio"
                        ? "bg-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/25"
                        : "text-[#B0B0C5] hover:bg-[#1F1F2A] hover:text-white"
                    }`}
                  >
                    <RadioIcon className="w-4 h-4" />
                    <span>Rock Chic Radio</span>
                  </button>
                </nav>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#707085] px-3 mb-2">
                  Library
                </p>
                <nav className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab("favorites");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "favorites"
                        ? "bg-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/25"
                        : "text-[#B0B0C5] hover:bg-[#1F1F2A] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Heart
                        className={`w-4 h-4 ${favorites.length > 0 ? "fill-current" : ""}`}
                      />
                      <span>Favorite Songs</span>
                    </div>
                    {favorites.length > 0 && (
                      <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("recently-played");
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === "recently-played"
                        ? "bg-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/25"
                        : "text-[#B0B0C5] hover:bg-[#1F1F2A] hover:text-white"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Recently Played</span>
                  </button>
                </nav>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#707085] px-3 mb-2">
                  Playlists
                </p>
                <nav className="space-y-1">
                  {curatedPlaylists.map((pl) => (
                    <button
                      key={pl.id}
                      onClick={() => {
                        const targetTrack = musicTracks.find((t) => t.id === pl.firstTrackId) || musicTracks[0];
                        handlePlayTrack(targetTrack);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-[#8E8EA0] hover:text-white hover:bg-[#1F1F2A] transition-all text-left truncate"
                    >
                      <ListMusic className="w-3.5 h-3.5 shrink-0 text-[#FF1F8E]" />
                      <span className="truncate">{pl.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Sidebar Footer Badge */}
          <div className="p-3 rounded-xl bg-[#1B1B24] border border-[#2B2B38] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF1F8E]/15 border border-[#FF1F8E]/30 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4 text-[#FF1F8E]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-bold text-white truncate">Apple Lossless Audio</p>
              <p className="text-[10px] text-[#8E8EA0] truncate">24-bit • Spatial Audio</p>
            </div>
          </div>
        </aside>

        {/* Main Content Stage */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar space-y-8">
          {/* Mobile Header with Logo & Tabs */}
          <div className="flex md:hidden items-center justify-between pb-3 border-b border-[#23232E]">
            <div className="flex items-center gap-2.5">
              <div className="bg-white rounded-lg p-1">
                <img src="/kk-logo.png" alt="Logo" className="h-7 w-auto object-contain" />
              </div>
              <span className="font-black text-sm text-white">THE KK FACTOR</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("listen-now")}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activeTab === "listen-now"
                    ? "bg-[#FF1F8E] text-white"
                    : "bg-[#1F1F2A] text-[#B0B0C5]"
                }`}
              >
                Listen Now
              </button>
              <button
                onClick={() => setActiveTab("embeds")}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activeTab === "embeds"
                    ? "bg-[#FF1F8E] text-white"
                    : "bg-[#1F1F2A] text-[#B0B0C5]"
                }`}
              >
                Embeds
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activeTab === "favorites"
                    ? "bg-[#FF1F8E] text-white"
                    : "bg-[#1F1F2A] text-[#B0B0C5]"
                }`}
              >
                Favorites ({favorites.length})
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23232E] pb-4">
            <div className="flex items-center gap-2 overflow-x-auto py-1 custom-scrollbar">
              <button
                onClick={() => setActiveTab("listen-now")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "listen-now"
                    ? "bg-white text-black shadow-lg"
                    : "bg-[#1B1B24] text-[#B0B0C5] hover:text-white hover:bg-[#262632]"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>The KK Factor Player</span>
              </button>

              <button
                onClick={() => setActiveTab("embeds")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "embeds"
                    ? "bg-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/30"
                    : "bg-[#1B1B24] text-[#B0B0C5] hover:text-white hover:bg-[#262632]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Apple Music & Spotify Web Embeds</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1B1B24] hover:bg-[#282836] text-xs font-medium text-[#B0B0C5] hover:text-white transition-all border border-[#2B2B38]"
              >
                {copiedToast ? (
                  <Check className="w-3.5 h-3.5 text-[#FF1F8E]" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
                <span>{copiedToast ? "Link Copied!" : "Share"}</span>
              </button>
            </div>
          </div>

          {/* TAB 1: EMBEDDED APPLE MUSIC & SPOTIFY PLAYERS */}
          {activeTab === "embeds" ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#FF1F8E]">Apple Music</span> & Spotify Streaming Embeds
                </h2>
                <p className="text-xs text-[#8E8EA0] mt-1">
                  Listen directly to official Apple Music and Spotify curated playlists right on this page.
                </p>
              </div>

              {/* Embed Selector Pills */}
              <div className="flex flex-wrap gap-2.5">
                {appleMusicEmbeds.map((emb) => (
                  <button
                    key={emb.id}
                    onClick={() => setSelectedEmbed(emb)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                      selectedEmbed.id === emb.id
                        ? "bg-[#FF1F8E] border-[#FF1F8E] text-white shadow-lg shadow-[#FF1F8E]/30"
                        : "bg-[#181822] border-[#2A2A38] text-[#B0B0C5] hover:text-white hover:bg-[#222230]"
                    }`}
                  >
                    <span>{emb.title}</span>
                  </button>
                ))}
              </div>

              {/* Embedded Player Iframe Container */}
              <div className="rounded-2xl overflow-hidden bg-[#14141C] border border-[#2B2B38] p-4 sm:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedEmbed.title}</h3>
                    <p className="text-xs text-[#8E8EA0]">{selectedEmbed.subtitle}</p>
                  </div>
                  <a
                    href={selectedEmbed.src}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-[#FF1F8E] hover:underline"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="w-full rounded-xl overflow-hidden shadow-inner bg-black">
                  <iframe
                    title={selectedEmbed.title}
                    src={selectedEmbed.src}
                    height={selectedEmbed.height || "450"}
                    className="w-full rounded-xl border-0"
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Genre Filter Pills for Native Player */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 custom-scrollbar">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedGenre === genre
                        ? "bg-white text-black shadow-md"
                        : "bg-[#1B1B24] text-[#B0B0C5] hover:bg-[#262632] hover:text-white border border-[#2B2B38]"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              {/* Apple Music Spotlight Banner (Listen Now tab) */}
              {activeTab === "listen-now" && !searchQuery && (
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#26112A] via-[#1A1428] to-[#12121B] border border-[#34243C] shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 group">
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF1F8E]/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7B5EA7]/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Album Art */}
                  <div className="relative shrink-0 w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl group/art">
                    <img
                      src={featuredTrack.cover}
                      alt={featuredTrack.title}
                      className="w-full h-full object-cover group-hover/art:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <button
                      onClick={() => handlePlayTrack(featuredTrack)}
                      className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-[#FF1F8E] text-white flex items-center justify-center shadow-lg shadow-[#FF1F8E]/40 hover:scale-110 active:scale-95 transition-transform duration-200"
                    >
                      {currentTrack.id === featuredTrack.id && isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Text & Actions */}
                  <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left z-10">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FF1F8E]/15 border border-[#FF1F8E]/30 text-[#FF1F8E] text-[11px] font-extrabold uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5" />
                      Featured Rock Chic Anthem
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                        {featuredTrack.title}
                      </h2>
                      <p className="text-sm sm:text-base text-[#D0D0E0] font-semibold mt-1">
                        {featuredTrack.artist} •{" "}
                        <span className="text-[#A0A0B8]">{featuredTrack.album}</span>
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#8E8EA0] max-w-xl line-clamp-2">
                      {featuredTrack.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                      <button
                        onClick={() => handlePlayTrack(featuredTrack)}
                        className="flex items-center gap-2 bg-[#FF1F8E] hover:bg-[#E0157A] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-[#FF1F8E]/30 transition-all hover:scale-105 active:scale-95"
                      >
                        {currentTrack.id === featuredTrack.id && isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>Play Track</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setIsShuffle(true);
                          handleNext();
                        }}
                        className="flex items-center gap-2 bg-[#252532] hover:bg-[#323242] text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all"
                      >
                        <Shuffle className="w-4 h-4" />
                        <span>Shuffle</span>
                      </button>

                      <button
                        onClick={(e) => toggleFavorite(featuredTrack.id, e)}
                        className={`p-2.5 rounded-full border transition-all ${
                          favorites.includes(featuredTrack.id)
                            ? "bg-[#FF1F8E]/20 border-[#FF1F8E] text-[#FF1F8E]"
                            : "bg-[#252532] border-transparent text-[#8E8EA0] hover:text-white"
                        }`}
                        title="Favorite"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(featuredTrack.id) ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      <div className="hidden sm:flex items-center gap-2 pl-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white uppercase tracking-wider">
                          Lossless
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white uppercase tracking-wider">
                          Dolby Atmos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section: Track List (Apple Music Table Style) */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {activeTab === "favorites"
                        ? "Favorite Tracks"
                        : activeTab === "recently-played"
                        ? "Recently Played"
                        : "Top Songs & Singles"}
                    </h3>
                    <p className="text-xs text-[#8E8EA0]">
                      High-fidelity studio tracks with working audio and synchronized playback
                    </p>
                  </div>

                  {filteredTracks.length > 0 && (
                    <button
                      onClick={() => handlePlayTrack(filteredTracks[0])}
                      className="text-xs font-bold text-[#FF1F8E] hover:text-[#FF6BB5] flex items-center gap-1 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play All</span>
                    </button>
                  )}
                </div>

                {filteredTracks.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#14141C] border border-[#262632] space-y-3">
                    <Music2 className="w-10 h-10 text-[#707085] mx-auto" />
                    <p className="text-sm font-semibold text-white">No songs match your selection</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedGenre("All");
                        setActiveTab("listen-now");
                      }}
                      className="px-4 py-2 rounded-full bg-[#FF1F8E] text-white text-xs font-bold"
                    >
                      Show All Tracks
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-[#13131B] border border-[#22222E] overflow-hidden shadow-xl">
                    {/* Header */}
                    <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] font-bold text-[#707085] border-b border-[#22222E] uppercase tracking-wider">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-6 sm:col-span-5">Song Title</div>
                      <div className="hidden sm:block sm:col-span-3">Album</div>
                      <div className="col-span-3 sm:col-span-2 text-right">Duration</div>
                      <div className="col-span-2 sm:col-span-1 text-center">Like</div>
                    </div>

                    {/* Track Rows */}
                    <div className="divide-y divide-[#1C1C26]/60">
                      {filteredTracks.map((track, index) => {
                        const isCurrent = currentTrack?.id === track.id;
                        const isFav = favorites.includes(track.id);

                        return (
                          <div
                            key={track.id}
                            onClick={() => handlePlayTrack(track)}
                            className={`grid grid-cols-12 items-center px-4 py-3 cursor-pointer group transition-colors duration-150 ${
                              isCurrent
                                ? "bg-[#FF1F8E]/12 text-white"
                                : "hover:bg-[#1A1A26] text-[#D0D0E0]"
                            }`}
                          >
                            {/* Number / Equalizer */}
                            <div className="col-span-1 flex items-center justify-center text-xs font-semibold">
                              {isCurrent && isPlaying ? (
                                <div className="flex items-end gap-[2px] h-4">
                                  <span className="w-1 bg-[#FF1F8E] rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                                  <span className="w-1 bg-[#FF1F8E] rounded-full animate-bounce [animation-delay:-0.1s] h-4" />
                                  <span className="w-1 bg-[#FF1F8E] rounded-full animate-bounce [animation-delay:-0.2s] h-2" />
                                </div>
                              ) : (
                                <>
                                  <span
                                    className={`group-hover:hidden ${
                                      isCurrent ? "text-[#FF1F8E] font-bold" : "text-[#707085]"
                                    }`}
                                  >
                                    {index + 1}
                                  </span>
                                  <Play className="w-3.5 h-3.5 text-white fill-current hidden group-hover:block" />
                                </>
                              )}
                            </div>

                            {/* Title, Artwork & Artist */}
                            <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0 pr-2">
                              <img
                                src={track.cover}
                                alt={track.title}
                                className="w-10 h-10 rounded-lg object-cover shrink-0 shadow-sm"
                              />
                              <div className="min-w-0">
                                <p
                                  className={`text-xs sm:text-sm font-bold truncate ${
                                    isCurrent ? "text-[#FF1F8E]" : "text-white group-hover:text-white"
                                  }`}
                                >
                                  {track.title}
                                </p>
                                <p className="text-[11px] text-[#8E8EA0] truncate flex items-center gap-1.5">
                                  {track.isExplicit && (
                                    <span className="px-1 py-[1px] rounded-[3px] bg-white/20 text-[9px] font-bold text-white">
                                      E
                                    </span>
                                  )}
                                  <span>{track.artist}</span>
                                </p>
                              </div>
                            </div>

                            {/* Album */}
                            <div className="hidden sm:block sm:col-span-3 text-xs text-[#8E8EA0] truncate pr-2">
                              {track.album}
                            </div>

                            {/* Duration */}
                            <div className="col-span-3 sm:col-span-2 text-right text-xs text-[#8E8EA0] font-mono">
                              {track.duration}
                            </div>

                            {/* Like Action */}
                            <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                              <button
                                onClick={(e) => toggleFavorite(track.id, e)}
                                className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
                                  isFav ? "text-[#FF1F8E]" : "text-[#707085] hover:text-white"
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>

              {/* Section: Albums & EPs Grid */}
              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <Disc className="w-5 h-5 text-[#FF1F8E]" />
                      Albums & EPs
                    </h3>
                    <p className="text-xs text-[#8E8EA0]">
                      Studio releases mastered for Apple Lossless audio
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {musicAlbums.map((album) => {
                    const albumTrack =
                      musicTracks.find((t) => t.id === album.firstTrackId) || musicTracks[0];

                    return (
                      <div
                        key={album.id}
                        onClick={() => handlePlayTrack(albumTrack)}
                        className="bg-[#13131B] hover:bg-[#1B1B26] border border-[#22222E] rounded-2xl p-3 sm:p-4 cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-3 shadow-lg">
                          <img
                            src={album.cover}
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#FF1F8E] text-white flex items-center justify-center shadow-lg shadow-[#FF1F8E]/50 transform scale-75 group-hover:scale-100 transition-transform">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                          {album.isSpatial && (
                            <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[9px] font-bold px-1.5 py-0.5 rounded text-white uppercase">
                              Spatial
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#FF1F8E] transition-colors">
                          {album.title}
                        </h4>
                        <p className="text-[11px] text-[#8E8EA0] truncate mt-0.5">
                          {album.artist} • {album.year}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section: Curated Playlists */}
              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <ListMusic className="w-5 h-5 text-[#FF1F8E]" />
                      Curated Playlists
                    </h3>
                    <p className="text-xs text-[#8E8EA0]">
                      Handcrafted sets for every rock chic mood
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {curatedPlaylists.map((pl) => {
                    const plTrack =
                      musicTracks.find((t) => t.id === pl.firstTrackId) || musicTracks[0];

                    return (
                      <div
                        key={pl.id}
                        onClick={() => handlePlayTrack(plTrack)}
                        className={`relative rounded-2xl p-5 cursor-pointer overflow-hidden border border-white/10 shadow-lg bg-gradient-to-br ${pl.gradient} group hover:scale-[1.02] transition-transform`}
                      >
                        <div className="relative z-10 flex flex-col justify-between h-40">
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white mb-2">
                              {pl.badge}
                            </span>
                            <h4 className="text-lg font-black text-white leading-tight">
                              {pl.title}
                            </h4>
                            <p className="text-xs text-white/80 mt-1 line-clamp-2">
                              {pl.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/70">
                              {pl.subtitle}
                            </span>
                            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {/* Floating / Sliding Lyrics Panel */}
      {showLyrics && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#12121A]/95 backdrop-blur-2xl border-l border-[#262634] z-50 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-[#262634]">
            <div className="flex items-center gap-2">
              <Mic2 className="w-4 h-4 text-[#FF1F8E]" />
              <h3 className="font-bold text-sm text-white">Live Lyrics</h3>
            </div>
            <button
              onClick={() => setShowLyrics(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#8E8EA0] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar py-6 space-y-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1C1C26]">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-white truncate">{currentTrack.title}</p>
                <p className="text-[11px] text-[#8E8EA0] truncate">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="space-y-4 text-center sm:text-left">
              {currentTrack.lyrics?.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-sm sm:text-base font-semibold leading-relaxed transition-all ${
                    idx === 0 || idx === 1
                      ? "text-white scale-105 font-bold text-[#FF1F8E]"
                      : "text-[#7B7B92] hover:text-[#B4B4C7]"
                  }`}
                >
                  {line}
                </p>
              )) || (
                <p className="text-xs text-[#8E8EA0] text-center">Lyrics not available for this track.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#262634] text-center">
            <p className="text-[10px] text-[#707085]">The KK Factor • Rock Chic Studio Master</p>
          </div>
        </div>
      )}

      {/* Floating / Sliding Queue Panel */}
      {showQueue && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#12121A]/95 backdrop-blur-2xl border-l border-[#262634] z-50 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-[#262634]">
            <div className="flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-[#FF1F8E]" />
              <h3 className="font-bold text-sm text-white">Up Next</h3>
            </div>
            <button
              onClick={() => setShowQueue(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#8E8EA0] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#707085] px-1 mb-1">
              Now Playing
            </p>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FF1F8E]/15 border border-[#FF1F8E]/30">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-white truncate">{currentTrack.title}</p>
                <p className="text-[11px] text-[#FF6BB5] truncate">{currentTrack.artist}</p>
              </div>
              <span className="text-[10px] font-mono text-[#FF1F8E] font-bold">PLAYING</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#707085] px-1 pt-3 mb-1">
              Queue ({musicTracks.length - 1} tracks)
            </p>
            {musicTracks
              .filter((t) => t.id !== currentTrack.id)
              .map((track) => (
                <div
                  key={track.id}
                  onClick={() => handlePlayTrack(track)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1C1C26] cursor-pointer transition-colors"
                >
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-white truncate">{track.title}</p>
                    <p className="text-[10px] text-[#8E8EA0] truncate">{track.artist}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#8E8EA0]">{track.duration}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Persistent Bottom Apple Music Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#13131B]/95 backdrop-blur-2xl border-t border-[#262634] z-40 px-4 sm:px-6 py-2.5 shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6">
          {/* Left: Track Info & Like */}
          <div className="flex items-center gap-3 w-full md:w-1/4 justify-between md:justify-start">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative group">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded-xl object-cover shadow-md border border-white/10 shrink-0"
                />
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              <div className="min-w-0">
                <p className="font-bold text-xs sm:text-sm text-white truncate">
                  {currentTrack.title}
                </p>
                <p className="text-[11px] text-[#8E8EA0] truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => toggleFavorite(currentTrack.id, e)}
              className={`p-2 rounded-full transition-colors ${
                favorites.includes(currentTrack.id)
                  ? "text-[#FF1F8E]"
                  : "text-[#707085] hover:text-white"
              }`}
              title="Add to Favorites"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites.includes(currentTrack.id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center w-full md:w-2/4 max-w-xl space-y-1">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Shuffle */}
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-1.5 rounded-full transition-colors ${
                  isShuffle ? "text-[#FF1F8E]" : "text-[#707085] hover:text-white"
                }`}
                title="Shuffle"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Prev */}
              <button
                onClick={handlePrev}
                className="text-[#D0D0E0] hover:text-white p-1.5 transition-colors hover:scale-110 active:scale-95"
                title="Previous track"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-[#FF1F8E] hover:text-white flex items-center justify-center shadow-lg shadow-white/10 hover:shadow-[#FF1F8E]/40 transition-all hover:scale-105 active:scale-95"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="text-[#D0D0E0] hover:text-white p-1.5 transition-colors hover:scale-110 active:scale-95"
                title="Next track"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              {/* Repeat */}
              <button
                onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
                className={`p-1.5 rounded-full transition-colors relative ${
                  repeatMode > 0 ? "text-[#FF1F8E]" : "text-[#707085] hover:text-white"
                }`}
                title={
                  repeatMode === 0
                    ? "Repeat Off"
                    : repeatMode === 1
                    ? "Repeat All"
                    : "Repeat Track"
                }
              >
                {repeatMode === 2 ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                {repeatMode > 0 && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF1F8E]" />
                )}
              </button>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="w-full flex items-center gap-2.5 text-[11px] font-mono text-[#8E8EA0]">
              <span className="w-9 text-right shrink-0">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 372}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 rounded-lg appearance-none bg-[#262636] accent-[#FF1F8E] cursor-pointer hover:h-2 transition-all"
              />
              <span className="w-9 text-left shrink-0">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Actions & Volume */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
            {/* Lyrics */}
            <button
              onClick={() => {
                setShowLyrics(!showLyrics);
                if (showQueue) setShowQueue(false);
              }}
              className={`p-2 rounded-lg transition-colors ${
                showLyrics
                  ? "bg-[#FF1F8E] text-white"
                  : "text-[#8E8EA0] hover:text-white hover:bg-[#1C1C26]"
              }`}
              title="Lyrics"
            >
              <Mic2 className="w-4 h-4" />
            </button>

            {/* Queue */}
            <button
              onClick={() => {
                setShowQueue(!showQueue);
                if (showLyrics) setShowLyrics(false);
              }}
              className={`p-2 rounded-lg transition-colors ${
                showQueue
                  ? "bg-[#FF1F8E] text-white"
                  : "text-[#8E8EA0] hover:text-white hover:bg-[#1C1C26]"
              }`}
              title="Up Next"
            >
              <ListMusic className="w-4 h-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 pl-2">
              <button
                onClick={toggleMute}
                className="text-[#8E8EA0] hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#FF1F8E]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 sm:w-24 h-1.5 rounded-lg appearance-none bg-[#262636] accent-[#FF1F8E] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;