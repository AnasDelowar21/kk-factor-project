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
    <div className="w-full bg-white border border-[#E8E8E8] rounded-2xl p-4 sm:p-5 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#E8E8E8] flex-shrink-0">
          <img
            src={currentStation.logo}
            alt={currentStation.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF1F8E] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#FF1F8E] uppercase tracking-widest">
              Live Stream
            </span>
            <span className="text-[11px] font-mono text-[#AAAAAA]">• {currentStation.frequency}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-[#1A1A1A] truncate">
            {currentStation.name}
          </h2>

          <p className="text-xs text-[#888888] truncate max-w-sm">
            {currentStation.location} — {currentStation.genre}
          </p>
        </div>
      </div>

      {/* Center: Play button & Visualizer */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-12 h-12 rounded-full bg-[#FF1F8E] hover:bg-[#C4006A] text-white flex items-center justify-center shadow-md shadow-[#FF1F8E]/30 transition-all active:scale-95 flex-shrink-0"
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
        <div className="flex items-end gap-1 h-6 px-3 py-1 bg-[#F5F5F5] rounded-lg border border-[#E8E8E8]">
          {[40, 70, 30, 90, 50, 80, 45, 95, 60, 35].map((height, i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full transition-all duration-300 ${
                isPlaying ? "bg-[#FF1F8E] animate-pulse" : "bg-[#CCCCCC] h-1"
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
        <div className="flex items-center gap-2 bg-[#F5F5F5] px-3 py-1.5 rounded-xl border border-[#E8E8E8]">
          <button onClick={toggleMute} className="text-[#888888] hover:text-[#1A1A1A]">
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-[#FF1F8E]" />
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
            className="w-20 sm:w-24 h-1 bg-[#DDDDDD] rounded-lg appearance-none cursor-pointer accent-[#FF1F8E]"
          />
        </div>

        <button
          onClick={() => onToggleFavorite(currentStation.id)}
          className={`p-2.5 rounded-xl border transition-all ${
            isFavorite
              ? "bg-[#FF1F8E]/10 border-[#FF1F8E]/40 text-[#FF1F8E]"
              : "bg-[#F5F5F5] border-[#E8E8E8] text-[#AAAAAA] hover:text-[#1A1A1A]"
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

