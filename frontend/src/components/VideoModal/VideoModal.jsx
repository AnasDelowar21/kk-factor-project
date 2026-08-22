import React, { useEffect } from 'react';
import { X, Play, Volume2, ShieldCheck, Film } from 'lucide-react';

function VideoModal({ isOpen, onClose, videoUrl, title, category, authorName }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase rounded tracking-wider">
                  {category || 'NEWS'}
                </span>
                <span className="text-xs text-zinc-400 font-mono">KK FACTOR VIDEO BROADCAST</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg mt-0.5">
                {title || 'Video Story'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            title="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black flex items-center justify-center aspect-video max-h-[70vh]">
          <video
            controls
            autoPlay
            playsInline
            preload="auto"
            className="w-full h-full object-contain bg-black"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Streaming in High Definition</span>
            {authorName && <span>• Reported by {authorName}</span>}
          </div>
          <span className="font-mono text-[11px] text-zinc-500">THE KK FACTOR MEDIA PLAYER</span>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
