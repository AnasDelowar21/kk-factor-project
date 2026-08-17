import React from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, Clock, Eye, Heart, Share2, Sparkles } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";

function NewsCard(props) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();

  // Support both single news object OR separate individual props
  const news = props.news || {
    id: props.id || 1,
    category: props.category || "WORLD",
    title: props.title || "Headline Story",
    summary: props.description || props.summary || "Stay updated with latest news.",
    imageUrl: props.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    publishedAt: props.publishedAt || "Recently",
    readTime: props.readTime || "3 min read",
    audioUrl: props.audioUrl || "/audio/sunset-drive.mp3",
    audioDuration: props.audioDuration || "3:30",
    author: props.author || { name: "Editorial Team" },
    views: props.views || 450,
    likes: props.likes || 89,
    isBreaking: props.isBreaking || false,
  };

  const isCurrentAudioPlaying =
    currentTrack?.id === news.id && isPlaying;

  const handlePlayAudio = (e) => {
    e.preventDefault();
    e.stopPropagation();

    playTrack({
      id: news.id,
      title: news.title,
      artist: news.author?.name || "THE KK FACTOR",
      category: news.category,
      cover: news.imageUrl,
      url: news.audioUrl || "/audio/sunset-drive.mp3",
      type: "news",
    });
  };

  const formattedDate = news.publishedAt
    ? new Date(news.publishedAt).toLocaleDateString("en-AU", {
      month: "short",
      day: "numeric",
    })
    : "Today";

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-950/20">
      <div>
        {/* Thumbnail Container */}
        <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md backdrop-blur">
              {news.category}
            </span>

            {news.isBreaking && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[11px] font-bold text-black shadow animate-pulse">
                <Sparkles className="w-3 h-3" /> BREAKING
              </span>
            )}
          </div>

          {/* Quick Play Audio Button on Thumbnail */}
          {news.audioUrl && (
            <button
              onClick={handlePlayAudio}
              className={`absolute bottom-3 right-3 flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-lg backdrop-blur ${isCurrentAudioPlaying
                  ? "bg-red-600 text-white shadow-red-900 animate-pulse"
                  : "bg-zinc-950/80 text-zinc-200 border border-zinc-700/80 hover:bg-red-600 hover:text-white hover:border-red-500"
                }`}
              title={isCurrentAudioPlaying ? "Pause Audio Story" : "Listen to Audio Story"}
            >
              {isCurrentAudioPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PLAYING</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-red-500 group-hover:text-white" />
                  <span>LISTEN ({news.audioDuration || "AUDIO"})</span>
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
              <Clock className="w-3 h-3" /> {news.readTime}
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
          {news.author?.avatar && (
            <img
              src={news.author.avatar}
              alt={news.author.name}
              className="w-6 h-6 rounded-full object-cover border border-zinc-700"
            />
          )}
          <span className="text-xs font-medium text-zinc-300 truncate max-w-[110px]">
            {news.author?.name || "KK Factor Staff"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/article/${news.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 group-hover:translate-x-0.5 transition-transform"
          >
            Read Story →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;