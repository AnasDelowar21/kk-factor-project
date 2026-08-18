import React, { useState, useRef, useEffect } from "react";
import {
  Play, Pause, Volume2, VolumeX, RefreshCw,
  Heart, ChevronDown, Radio as RadioIcon,
} from "lucide-react";
import Footer from "../components/Footer/Footer";
import { australianStations } from "../data/australianStations";

function RadioPage() {
  const [currentStation, setCurrentStation] = useState(australianStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const s = localStorage.getItem("kk_radio_favorites");
      return s ? JSON.parse(s) : ["kk-factor-radio"];
    } catch { return ["kk-factor-radio"]; }
  });
  const audioRef = useRef(null);
  const dropdownRef = useRef(null);

  // Persist favorites
  useEffect(() => {
    try { localStorage.setItem("kk_radio_favorites", JSON.stringify(favorites)); }
    catch {}
  }, [favorites]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Load & play when station changes
  useEffect(() => {
    if (!audioRef.current || !currentStation) return;
    setIsLoading(true);
    setIsPlaying(false);
    audioRef.current.src = currentStation.streamUrl;
    audioRef.current.load();
    audioRef.current.volume = isMuted ? 0 : volume;
    const p = audioRef.current.play();
    if (p !== undefined) {
      p.then(() => { setIsLoading(false); setIsPlaying(true); })
       .catch(() => {
         setIsLoading(false); setIsPlaying(false);
         if (currentStation.fallbackStream) {
           audioRef.current.src = currentStation.fallbackStream;
           audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
         }
       });
    }
  }, [currentStation]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => { setIsLoading(false); setIsPlaying(true); })
        .catch(() => { setIsLoading(false); setIsPlaying(false); });
    }
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (v > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFav = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectStation = (st) => {
    setCurrentStation(st);
    setDropdownOpen(false);
  };

  const isFav = favorites.includes(currentStation.id);
  const currentShow = currentStation.schedule?.find(s => s.isCurrent) || currentStation.schedule?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F7] via-white to-[#F5F0FF] flex flex-col">
      <audio
        ref={audioRef}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => { setIsLoading(false); setIsPlaying(true); }}
        onError={() => { setIsLoading(false); setIsPlaying(false); }}
      />

      {/* Page Header */}
      <div className="text-center pt-12 pb-4 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF1F8E]/10 border border-[#FF1F8E]/25 rounded-full text-[#FF1F8E] text-xs font-bold uppercase tracking-widest mb-3">
          <span className={`w-1.5 h-1.5 rounded-full bg-[#FF1F8E] ${isPlaying ? "animate-pulse" : ""}`}></span>
          Live Radio
        </div>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
          THE KK FACTOR <span className="text-[#FF1F8E]">RADIO</span>
        </h1>
        <p className="mt-2 text-sm text-[#888888]">Australian live radio, right here.</p>
      </div>

      {/* === Radio Player Widget === */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-xl">

          {/* Radio Body */}
          <div
            className="relative rounded-[2rem] overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #fff 0%, #f7f7f7 50%, #efefef 100%)",
              boxShadow: "0 25px 60px rgba(255,31,142,0.15), 0 8px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
              border: "1px solid #E8E8E8",
            }}
          >
            {/* Top stripe accent */}
            <div className="h-2 w-full bg-gradient-to-r from-[#FF1F8E] via-[#FF6BB5] to-[#7B5EA7]" />

            <div className="px-8 pt-6 pb-8 space-y-6">

              {/* === LCD Display === */}
              <div
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a0a12 0%, #2d0f1f 100%)",
                  boxShadow: "inset 0 3px 10px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {/* Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)",
                  }}
                />

                {/* Live badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full bg-[#FF1F8E] ${isPlaying ? "animate-pulse" : "opacity-40"}`} />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6BB5]">
                      {isPlaying ? "On Air" : "Off Air"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#FF6BB5]/60">
                    {currentStation.frequency}
                  </span>
                </div>

                {/* Station name */}
                <div className="text-[#FF1F8E] font-extrabold text-lg leading-tight truncate" style={{ textShadow: "0 0 20px rgba(255,31,142,0.6)" }}>
                  {currentStation.name}
                </div>
                <div className="text-[#FF6BB5]/70 text-xs mt-0.5 truncate">
                  {currentStation.location} · {currentStation.genre}
                </div>

                {/* Now playing show */}
                {currentShow && (
                  <div className="mt-3 pt-3 border-t border-[#FF1F8E]/20">
                    <div className="text-[10px] text-[#FF6BB5]/60 uppercase tracking-widest mb-0.5">Now Playing</div>
                    <div className="text-[#FFB3D9] text-xs font-semibold truncate">{currentShow.title}</div>
                    <div className="text-[#FF6BB5]/50 text-[10px] truncate">{currentShow.host}</div>
                  </div>
                )}

                {/* Equalizer bars */}
                <div className="flex items-end gap-0.5 h-5 mt-3">
                  {[35, 65, 45, 80, 55, 90, 40, 75, 60, 85, 50, 70, 42, 88, 38].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm transition-all duration-300 ${isPlaying ? "bg-[#FF1F8E] animate-pulse" : "bg-[#FF1F8E]/20"}`}
                      style={{
                        height: isPlaying ? `${Math.max(15, h)}%` : "15%",
                        animationDelay: `${i * 0.07}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* === Channel Dropdown === */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(o => !o)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E8E8E8] rounded-2xl text-sm font-semibold text-[#1A1A1A] hover:border-[#FF1F8E] transition-colors duration-200 shadow-sm group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <RadioIcon className="w-4 h-4 text-[#FF1F8E] flex-shrink-0" />
                    <span className="truncate">{currentStation.name}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#AAAAAA] flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E8E8E8] rounded-2xl shadow-xl z-50 overflow-hidden"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {australianStations.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => selectStation(st)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#FFF0F7] transition-colors duration-150 ${
                          st.id === currentStation.id ? "bg-[#FFF0F7] border-l-2 border-[#FF1F8E]" : "border-l-2 border-transparent"
                        }`}
                      >
                        <img
                          src={st.logo}
                          alt={st.name}
                          className="w-9 h-9 rounded-xl object-cover flex-shrink-0 border border-[#E8E8E8]"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-[#1A1A1A] truncate">{st.name}</div>
                          <div className="text-xs text-[#888888] truncate">{st.frequency} · {st.genre}</div>
                        </div>
                        {favorites.includes(st.id) && (
                          <Heart className="w-3.5 h-3.5 text-[#FF1F8E] fill-current flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* === Controls Row === */}
              <div className="flex items-center justify-between gap-4">

                {/* Favourite */}
                <button
                  onClick={() => toggleFav(currentStation.id)}
                  className={`p-3 rounded-2xl border transition-all duration-200 ${
                    isFav
                      ? "bg-[#FF1F8E]/10 border-[#FF1F8E]/40 text-[#FF1F8E]"
                      : "bg-white border-[#E8E8E8] text-[#CCCCCC] hover:text-[#FF1F8E] hover:border-[#FF1F8E]/40"
                  }`}
                  title={isFav ? "Remove favourite" : "Add favourite"}
                >
                  <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
                </button>

                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-95 disabled:opacity-70"
                  style={{
                    background: "linear-gradient(145deg, #FF1F8E, #C4006A)",
                    boxShadow: isPlaying
                      ? "0 0 0 8px rgba(255,31,142,0.15), 0 10px 30px rgba(255,31,142,0.4)"
                      : "0 6px 25px rgba(255,31,142,0.3)",
                  }}
                >
                  {isLoading
                    ? <RefreshCw className="w-10 h-10 animate-spin" />
                    : isPlaying
                    ? <Pause className="w-10 h-10 fill-current" />
                    : <Play className="w-10 h-10 fill-current ml-1" />
                  }
                </button>

                {/* Mute toggle */}
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-2xl border bg-white border-[#E8E8E8] text-[#AAAAAA] hover:text-[#1A1A1A] hover:border-[#CCCCCC] transition-all duration-200"
                >
                  {isMuted || volume === 0
                    ? <VolumeX className="w-5 h-5 text-[#FF1F8E]" />
                    : <Volume2 className="w-5 h-5" />
                  }
                </button>
              </div>

              {/* === Volume Slider === */}
              <div className="px-1">
                <div className="flex items-center justify-between text-[10px] text-[#AAAAAA] mb-1.5 font-medium">
                  <span>Volume</span>
                  <span>{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF1F8E ${(isMuted ? 0 : volume) * 100}%, #E8E8E8 ${(isMuted ? 0 : volume) * 100}%)`,
                    accentColor: "#FF1F8E",
                  }}
                />
              </div>

              {/* === Station Info Footer === */}
              <div className="flex items-center justify-between pt-1 border-t border-[#F0F0F0]">
                <div className="flex items-center gap-2">
                  <img
                    src={currentStation.logo}
                    alt={currentStation.name}
                    className="w-8 h-8 rounded-lg object-cover border border-[#E8E8E8]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1A1A1A] leading-tight">{currentStation.listeners}</div>
                    <div className="text-[10px] text-[#AAAAAA]">{currentStation.bitrate}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#AAAAAA] bg-[#F5F5F5] px-2 py-1 rounded-lg border border-[#EEEEEE]">
                  {currentStation.frequency}
                </span>
              </div>
            </div>
          </div>

          {/* Station description (read more style) */}
          <details className="mt-4 bg-white border border-[#E8E8E8] rounded-2xl shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer text-sm font-semibold text-[#1A1A1A] select-none list-none hover:bg-[#FAFAFA] transition-colors">
              <span>About this station</span>
              <ChevronDown className="w-4 h-4 text-[#AAAAAA] group-open:rotate-180 transition-transform duration-200" />
            </summary>
            <div className="px-5 pb-5 pt-1 space-y-3 border-t border-[#F0F0F0]">
              <p className="text-sm text-[#555555] leading-relaxed">{currentStation.description}</p>
              {currentStation.schedule && (
                <div>
                  <div className="text-xs font-bold text-[#AAAAAA] uppercase tracking-widest mb-2">Today's Schedule</div>
                  <div className="space-y-2">
                    {currentStation.schedule.map((show, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-2.5 rounded-xl text-xs ${
                          show.isCurrent ? "bg-[#FFF0F7] border border-[#FF1F8E]/20" : "bg-[#F8F8F8]"
                        }`}
                      >
                        <span className={`font-mono px-1.5 py-0.5 rounded text-[10px] flex-shrink-0 ${
                          show.isCurrent ? "bg-[#FF1F8E] text-white" : "bg-[#E8E8E8] text-[#666666]"
                        }`}>{show.time}</span>
                        <div>
                          <div className="font-bold text-[#1A1A1A]">{show.title}</div>
                          <div className="text-[#888888]">{show.host}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </details>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RadioPage;