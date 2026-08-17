import React from "react";
import { Play, Pause, Music as MusicIcon, Volume2 } from "lucide-react";
import { musicTracks } from "../data/musicData";
import { usePlayer } from "../context/PlayerContext";
import Footer from "../components/Footer/Footer";

function Music() {
  const { currentTrack, isPlaying, playTrack } = usePlayer();

  const handleTrackClick = (track) => {
    playTrack({
      id: `music-${track.id}`,
      title: track.title,
      artist: track.artist,
      category: "MUSIC",
      cover: track.cover,
      url: track.url,
      type: "music",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      {/* Header Banner */}
      <section className="relative border-b border-zinc-800/80 py-8 px-6 bg-gradient-to-b from-zinc-950 to-black">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-red-600/10 border border-red-600/30 rounded-full text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
                <MusicIcon className="w-3 h-3" />
                THE KK FACTOR • MUSIC VAULT
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                FEATURED <span className="text-red-600">MUSIC</span> TRACKS
              </h1>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
              Stream exclusive music releases and audio tracks using the integrated player.
            </p>
          </div>
        </div>
      </section>

      {/* Main Track List */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {musicTracks.map((track) => {
            const isCurrentPlaying =
              currentTrack?.id === `music-${track.id}` && isPlaying;

            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track)}
                className={`group relative flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  currentTrack?.id === `music-${track.id}`
                    ? "bg-zinc-900 border-red-600/60 shadow-xl shadow-red-950/20"
                    : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60"
                }`}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                      isCurrentPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {isCurrentPlaying ? (
                      <Pause className="w-6 h-6 text-red-500 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-base truncate group-hover:text-red-500 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
                </div>

                <div className="flex items-center gap-2">
                  {isCurrentPlaying ? (
                    <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                      <Volume2 className="w-3 h-3" /> Playing
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs font-bold uppercase group-hover:text-white">
                      Play
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Music;