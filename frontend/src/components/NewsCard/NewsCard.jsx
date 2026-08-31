import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Volume2, Clock, Film, Sparkles } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import VideoModal from "../VideoModal/VideoModal";

function NewsCard(props) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Support both single news object OR separate individual props
  const news = props.news || {
    id: props.id || 1,
    category: props.category || "WORLD",
    title: props.title || "Headline Story",
    summary: props.description || props.summary || "Stay updated with latest news.",
    imageUrl: props.imageUrl || null,
    videoUrl: props.videoUrl || null,
    publishedAt: props.publishedAt || "Recently",
    readTime: props.readTime || "3 min read",
    author: props.author || { name: "Editorial Team" },
    views: props.views || 450,
    likes: props.likes || 89,
    isBreaking: props.isBreaking || false,
    isFeatured: props.isFeatured || false,
  };

  const hasVideo = !!news.videoUrl;

  const handlePlayAudio = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // If it's a video, open the video player modal instead!
    if (hasVideo) {
      setIsVideoModalOpen(true);
      return;
    }

    if (news.audioUrl) {
      playTrack({
        id: news.id,
        title: news.title,
        artist: news.author?.name || "THE KK FACTOR",
        category: news.category,
        cover: news.imageUrl,
        url: news.audioUrl,
        type: "news",
      });
    }
  };

  const formattedDate = news.publishedAt
    ? new Date(news.publishedAt).toLocaleDateString("en-AU", {
        month: "short",
        day: "numeric",
      })
    : "Today";

  return (
    <>
      <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-[#E8E8E8] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1F8E]/40 hover:shadow-lg hover:shadow-[#FF1F8E]/10">
        <div>
          {/* Thumbnail Container */}
          <div className="relative h-52 w-full overflow-hidden bg-[#F5F5F5]">
            {news.imageUrl ? (
              <img
                src={news.imageUrl}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : hasVideo ? (
              <div className="relative w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                <video
                  src={news.videoUrl}
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FF1F8E]/90 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F7] to-[#F5F0FF]">
                <span className="text-4xl font-black text-[#FF1F8E]/20 tracking-widest">KK FACTOR</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FF1F8E] px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md">
                {news.category}
              </span>

              {hasVideo && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[11px] font-black text-black shadow-md">
                  <Film className="w-3 h-3" /> VIDEO
                </span>
              )}

              {news.isBreaking && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[11px] font-bold text-black shadow animate-pulse">
                  <Sparkles className="w-3 h-3" /> BREAKING
                </span>
              )}
            </div>

            {/* Quick Play Button on Thumbnail */}
            {(hasVideo || news.audioUrl) && (
              <button
                onClick={handlePlayAudio}
                className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-lg bg-[#FF1F8E] hover:bg-[#C4006A] text-white"
                title={hasVideo ? "Watch Video Story" : "Listen to Audio Story"}
              >
                {hasVideo ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>WATCH VIDEO</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>LISTEN</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Content Body */}
          <div className="p-5">
            {/* Metadata Bar */}
            <div className="flex items-center gap-3 text-xs text-[#AAAAAA] mb-2">
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {news.readTime || "2 min read"}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#FF1F8E] transition-colors line-clamp-2 leading-snug">
              <Link to={`/article/${news.id}`}>{news.title}</Link>
            </h3>

            {/* Excerpt Summary */}
            <p className="mt-2.5 text-sm text-[#888888] line-clamp-3 leading-relaxed">
              {news.summary}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="border-t border-[#F0F0F0] p-4 pt-3 flex items-center justify-between gap-3 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF1F8E]/10 border border-[#FF1F8E]/30 flex items-center justify-center text-[#FF1F8E] font-bold text-[11px]">
              {(news.author?.name || "K").charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-[#888888] truncate max-w-[110px]">
              {news.author?.name || "KK Factor Staff"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasVideo ? (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FF1F8E] hover:text-[#C4006A] group-hover:translate-x-0.5 transition-transform"
              >
                Watch Video ▶
              </button>
            ) : (
              <Link
                to={`/article/${news.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FF1F8E] hover:text-[#C4006A] group-hover:translate-x-0.5 transition-transform"
              >
                Read Story →
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Video Modal */}
      {hasVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={news.videoUrl}
          title={news.title}
          category={news.category}
          authorName={news.author?.name}
        />
      )}
    </>
  );
}

export default NewsCard;
