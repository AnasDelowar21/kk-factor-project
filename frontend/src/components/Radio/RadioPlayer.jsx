import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart, Radio, RefreshCw } from "lucide-react";

function RadioPlayer({ currentStation, isFavorite, onToggleFavorite }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!currentStation || !audioRef.current) return;
    
    setIsLoading(true);
    setIsPlaying(false);

    audioRef.current.src = currentStation.streamUrl;
    audioRef.current.load();

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsLoading(false);
          setIsPlaying(true);
        })
        .catch(() => {
          setIsLoading(false);
          setIsPlaying(false);
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
      audioRef.current
        .play()
        .then(() => {
          setIsLoading(false);
          setIsPlaying(true);
        })
        .catch(() => {
          setIsLoading(false);
          setIsPlaying(false);
        });
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
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

  if (!currentStation) return null;

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <audio
        ref={audioRef}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
        }}
      />

      {/* Left: Station info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
          <img
            src={currentStation.logo}
            alt={currentStation.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              Live Stream
            </span>
            <span className="text-[11px] font-mono text-zinc-500">• {currentStation.frequency}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white truncate">
            {currentStation.name}
          </h2>

          <p className="text-xs text-zinc-400 truncate max-w-sm">
            {currentStation.location} — {currentStation.genre}
          </p>
        </div>
      </div>

      {/* Center: Sleek Play button & Visualizer */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-950 transition-all active:scale-95 flex-shrink-0"
        >
          {isLoading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Minimal Audio Equalizer Bars */}
        <div className="flex items-end gap-1 h-6 px-3 py-1 bg-zinc-900/80 rounded-lg border border-zinc-800/80">
          {[40, 70, 30, 90, 50, 80, 45, 95, 60, 35].map((height, i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full transition-all duration-300 ${
                isPlaying ? "bg-red-500 animate-pulse" : "bg-zinc-700 h-1"
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, height)}%` : "4px",
                animationDelay: `${i * 0.08}s`,
              }}
            ></span>
          ))}
        </div>
      </div>

      {/* Right: Volume & Bookmark */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <div className="flex items-center gap-2 bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-zinc-800">
          <button onClick={toggleMute} className="text-zinc-400 hover:text-white">
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
            onChange={handleVolumeChange}
            className="w-20 sm:w-24 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
        </div>

        <button
          onClick={() => onToggleFavorite(currentStation.id)}
          className={`p-2.5 rounded-xl border transition-all ${
            isFavorite
              ? "bg-red-600/20 border-red-600/60 text-red-500"
              : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white"
          }`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
}

export default RadioPlayer;
