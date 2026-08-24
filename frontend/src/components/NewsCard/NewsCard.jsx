import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, Clock, Film, Sparkles } from "lucide-react";
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
      <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-950/20">
        <div>
          {/* Thumbnail Container */}
          <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
            {news.imageUrl ? (
              <img
                src={news.imageUrl}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : hasVideo ? (
              <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center">
                <video
                  src={news.videoUrl}
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
                <span className="text-4xl font-black text-white/10 tracking-widest">KK FACTOR</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md backdrop-blur">
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
                className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-lg backdrop-blur bg-red-600 hover:bg-red-500 text-white shadow-red-950"
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
            <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {news.readTime || "2 min read"}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">
              <Link to={`/article/${news.id}`}>{news.title}</Link>
            </h3>

            {/* Excerpt Summary */}
            <p className="mt-2.5 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
              {news.summary}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="border-t border-zinc-800/80 p-4 pt-3 flex items-center justify-between gap-3 bg-zinc-950/40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-bold text-[11px]">
              {(news.author?.name || "K").charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-zinc-300 truncate max-w-[110px]">
              {news.author?.name || "KK Factor Staff"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasVideo ? (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 group-hover:translate-x-0.5 transition-transform"
              >
                Watch Video ▶
              </button>
            ) : (
              <Link
                to={`/article/${news.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 group-hover:translate-x-0.5 transition-transform"
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
