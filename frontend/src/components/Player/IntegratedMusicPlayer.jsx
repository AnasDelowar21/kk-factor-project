import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Radio,
  Newspaper,
  Music as MusicIcon,
  RefreshCw,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function IntegratedMusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    closePlayer,
  } = usePlayer();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentTrack) return null;

  const getSourceBadge = () => {
    switch (currentTrack.type) {
      case "news":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-wider">
            <Newspaper className="w-3 h-3" /> News Audio Story
          </span>
        );
      case "radio":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-bold uppercase tracking-wider">
            <Radio className="w-3 h-3 animate-pulse" /> Live Radio
          </span>
        );
      case "music":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
            <MusicIcon className="w-3 h-3" /> Music Player
          </span>
        );
    }
  };

  return (
    <aside aria-label="Audio Player" className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-6 pb-3 pt-0 pointer-events-none">
      <div
        className={`mx-auto max-w-6xl bg-zinc-950/95 backdrop-blur-md border border-zinc-800/90 rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto overflow-hidden ${
          isMinimized ? "p-2.5" : "p-3 sm:p-4"
        }`}
      >
        {/* Minimized View Header Bar */}
        {isMinimized ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={currentTrack.cover || currentTrack.imageUrl || "/assets/music1.jpg"}
                alt={currentTrack.title}
                className="w-9 h-9 rounded-lg object-cover bg-zinc-900 border border-zinc-800 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {currentTrack.title}
                </p>
                <p className="text-[11px] text-zinc-400 truncate">
                  {currentTrack.artist || currentTrack.category || "THE KK FACTOR"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow transition"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={() => setIsMinimized(false)}
                aria-label="Expand player"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={closePlayer}
                aria-label="Close player"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Full Player View */
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
            {/* Track Metadata Info */}
            <div className="flex items-center gap-3.5 w-full md:w-1/3 min-w-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 shadow-inner group">
                <img
                  src={currentTrack.cover || currentTrack.imageUrl || "/assets/music1.jpg"}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-red-500 animate-pulse h-full"></span>
                      <span className="w-1 bg-red-500 animate-pulse h-2" style={{ animationDelay: "0.15s" }}></span>
                      <span className="w-1 bg-red-500 animate-pulse h-3" style={{ animationDelay: "0.3s" }}></span>
                    </div>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1">{getSourceBadge()}</div>
                <h4 className="text-sm sm:text-base font-bold text-white truncate leading-tight">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-zinc-400 truncate">
                  {currentTrack.artist || currentTrack.author?.name || currentTrack.category || "THE KK FACTOR"}
                </p>
              </div>
            </div>

            {/* Controls & Scrubber Progress */}
            <div className="flex flex-col items-center gap-2 w-full md:w-2/5">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-950/60 active:scale-95 transition flex-shrink-0"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Animated Equalizer Bars */}
                <div className="hidden sm:flex items-end gap-1 h-5 px-2 py-1 bg-zinc-900/80 rounded-md border border-zinc-800/80">
                  {[40, 75, 35, 90, 60, 80, 45, 95].map((h, i) => (
                    <span
                      key={i}
                      className={`w-0.5 rounded-full transition-all duration-300 ${
                        isPlaying ? "bg-red-500 animate-pulse" : "bg-zinc-700 h-1"
                      }`}
                      style={{
                        height: isPlaying ? `${h}%` : "3px",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Scrubber / Progress Bar */}
              {currentTrack.type !== "radio" && (
                <div className="flex items-center gap-2.5 w-full text-[11px] font-mono text-zinc-400">
                  <span className="w-8 text-right">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime || 0}
                    onChange={(e) => seek(parseFloat(e.target.value))}
                    aria-label="Audio progress slider"
                    className="flex-1 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500"
                  />
                  <span className="w-8">{formatTime(duration)}</span>
                </div>
              )}
            </div>

            {/* Volume & Header Controls */}
            <div className="flex items-center gap-3 w-full md:w-1/4 justify-end">
              <div className="flex items-center gap-2 bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-zinc-800">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                  className="text-zinc-400 hover:text-white"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-500" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  aria-label="Volume slider"
                  className="w-16 sm:w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              <button
                onClick={() => setIsMinimized(true)}
                aria-label="Minimize player"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                title="Minimize player"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              <button
                onClick={closePlayer}
                aria-label="Close player"
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-600/40"
                title="Close player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default IntegratedMusicPlayer;
