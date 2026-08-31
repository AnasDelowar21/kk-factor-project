import React, { useEffect } from 'react';
import { X, Film } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white border border-[#E8E8E8] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAFAFA] border-b border-[#E8E8E8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF1F8E]/10 border border-[#FF1F8E]/30 flex items-center justify-center text-[#FF1F8E]">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FF1F8E] text-white text-[10px] font-black uppercase rounded tracking-wider">
                  {category || 'NEWS'}
                </span>
                <span className="text-xs text-[#888888] font-mono">KK FACTOR VIDEO BROADCAST</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] truncate max-w-lg mt-0.5">
                {title || 'Video Story'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5F5F5] hover:bg-[#FF1F8E] text-[#888888] hover:text-white flex items-center justify-center transition-colors border border-[#E8E8E8] hover:border-[#FF1F8E]"
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
        <div className="px-6 py-3 bg-[#FAFAFA] border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#888888]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Streaming in High Definition</span>
            {authorName && <span>• Reported by {authorName}</span>}
          </div>
          <span className="font-mono text-[11px] text-[#AAAAAA]">THE KK FACTOR MEDIA PLAYER</span>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
