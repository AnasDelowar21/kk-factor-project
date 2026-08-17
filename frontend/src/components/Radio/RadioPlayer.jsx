import React, { useState, useRef, useEffect } from "react";
import {
  Play, Pause, Volume2, VolumeX, Heart, RefreshCw,
  Radio, ChevronDown, ChevronUp, Clock, User,
} from "lucide-react";

function RadioPlayer({ currentStation, isFavorite, onToggleFavorite, isPlaying, setIsPlaying }) {
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const audioRef = useRef(null);

  // Waveform bar heights (static seed, animated via CSS)
  const bars = [30, 60, 45, 80, 55, 90, 40, 75, 50, 65, 35, 85, 48, 70, 38, 88, 52, 62, 42, 78];

  useEffect(() => {
    if (!currentStation || !audioRef.current) return;
    setIsLoading(true);
    setIsPlaying(false);
    audioRef.current.src = currentStation.streamUrl;
    audioRef.current.load();
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => { setIsLoading(false); setIsPlaying(true); })
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
      audioRef.current.play()
        .then(() => { setIsLoading(false); setIsPlaying(true); })
        .catch(() => { setIsLoading(false); setIsPlaying(false); });
    }
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (v > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) { audioRef.current.volume = volume; setIsMuted(false); }
    else { audioRef.current.volume = 0; setIsMuted(true); }
  };

  if (!currentStation) return null;

  const currentShow = currentStation.schedule?.find((s) => s.isCurrent) || currentStation.schedule?.[0];

  return (
    <div className="w-full flex flex-col gap-0">
      <audio
        ref={audioRef}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => { setIsLoading(false); setIsPlaying(true); }}
        onError={() => { setIsLoading(false); setIsPlaying(false); }}
      />

      {/* ─── RADIO BODY ─── */}
      <div
        style={{
          background: "linear-gradient(160deg, #111111 0%, #0a0a0a 50%, #0f0f0f 100%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        className="rounded-3xl border border-zinc-800/80 overflow-hidden"
      >
        {/* Top grill texture strip */}
        <div className="h-1.5 bg-gradient-to-r from-zinc-900 via-red-600/60 to-zinc-900" />

        {/* Station Art + Display */}
        <div className="relative">
          {/* Station thumbnail — full bleed blurred background */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img
              src={currentStation.logo}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

            {/* Floating station art */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                style={{ boxShadow: "0 0 40px rgba(220,38,38,0.3), 0 16px 40px rgba(0,0,0,0.8)" }}
                className={`w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 ${
                  isPlaying ? "border-red-600/70" : "border-zinc-700"
                } transition-all duration-500`}
              >
                <img
                  src={currentStation.logo}
                  alt={currentStation.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isPlaying ? "scale-105" : "scale-100 grayscale"
                  }`}
                />
              </div>
            </div>

            {/* LIVE badge */}
            <div className="absolute top-4 left-4">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                isPlaying ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-white animate-pulse" : "bg-zinc-600"}`} />
                {isPlaying ? "LIVE" : "OFF AIR"}
              </div>
            </div>

            {/* Favorite */}
            <button
              onClick={() => onToggleFavorite(currentStation.id)}
              className={`absolute top-4 right-4 p-2 rounded-full border transition-all ${
                isFavorite
                  ? "bg-red-600/20 border-red-600/60 text-red-400"
                  : "bg-black/40 border-zinc-700/60 text-zinc-500 hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Station info */}
          <div className="px-6 pt-5 pb-2 text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              {currentStation.name}
            </h2>
            <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-500">
              <span className="font-mono">{currentStation.frequency}</span>
              <span className="w-px h-3 bg-zinc-700" />
              <span>{currentStation.genre}</span>
              <span className="w-px h-3 bg-zinc-700" />
              <span>{currentStation.location}</span>
            </div>
          </div>
        </div>

        {/* ─── Waveform Visualizer ─── */}
        <div className="px-6 py-4">
          <div className="flex items-end justify-center gap-[3px] h-10">
            {bars.map((h, i) => (
              <span
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: "3px",
                  height: isPlaying ? `${h}%` : "10%",
                  background: isPlaying
                    ? `hsl(${0 + i * 2}, 80%, ${45 + i}%)`
                    : "#27272a",
                  animationName: isPlaying ? "equalizerBounce" : "none",
                  animationDuration: `${0.6 + (i % 5) * 0.15}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationDelay: `${i * 0.05}s`,
                  transition: "height 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ─── Controls ─── */}
        <div className="px-6 pb-6 space-y-5">
          {/* Play Button — center hero */}
          <div className="flex items-center justify-center gap-6">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-zinc-500 hover:text-white transition-colors">
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
                className="w-20 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-red-600"
              />
            </div>

            {/* Main Play button */}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              style={{
                boxShadow: isPlaying
                  ? "0 0 30px rgba(220,38,38,0.5), 0 8px 24px rgba(220,38,38,0.3)"
                  : "0 8px 24px rgba(0,0,0,0.5)",
              }}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-60"
            >
              {isLoading ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </button>

            {/* Listeners badge */}
            <div className="text-center">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Listeners</div>
              <div className="text-xs font-bold text-white">{currentStation.listeners?.split(" ")[0] ?? "—"}</div>
            </div>
          </div>

          {/* Frequency dial / progress track */}
          <div className="relative h-8 flex items-center">
            {/* Track */}
            <div className="w-full h-px bg-zinc-800 relative">
              {/* Tick marks */}
              {[...Array(13)].map((_, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-px bg-zinc-700"
                  style={{ left: `${(i / 12) * 100}%`, height: i % 4 === 0 ? "8px" : "4px" }}
                />
              ))}
              {/* Needle */}
              <span
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-red-500 rounded-full transition-all"
                style={{ left: "62%" }}
              />
            </div>
          </div>

          {/* Bitrate / quality */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
            <span>88.0</span>
            <span className="text-zinc-500">{currentStation.bitrate}</span>
            <span>108.0</span>
          </div>
        </div>

        {/* ─── Schedule Accordion ─── */}
        {currentStation.schedule && (
          <div className="border-t border-zinc-800/80">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full flex items-center justify-between px-6 py-3 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span className="font-semibold uppercase tracking-widest text-[10px]">
                  {currentShow ? `ON AIR: ${currentShow.title}` : "Schedule"}
                </span>
              </div>
              {showSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showSchedule && (
              <div className="px-6 pb-5 space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                {currentStation.schedule.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-3 text-xs transition-all ${
                      item.isCurrent
                        ? "border-red-600/50 bg-red-950/20"
                        : "border-zinc-800/60 bg-zinc-900/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        item.isCurrent ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"
                      }`}>
                        {item.time}
                      </span>
                    </div>
                    <p className="font-semibold text-white truncate">{item.title}</p>
                    <p className="text-zinc-500 flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3" />
                      {item.host}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom grill strip */}
        <div className="h-1 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
      </div>

      {/* Keyframes injected inline (works without extra CSS file) */}
      <style>{`
        @keyframes equalizerBounce {
          0%   { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

export default RadioPlayer;
