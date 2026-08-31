import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, Play, Film } from "lucide-react";
import Footer from "../components/Footer/Footer";

const API = "http://localhost:5000";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchArticleData();
  }, [id]);

  const fetchArticleData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/news/${id}`);
      if (!response.ok) {
        setArticle(null);
        return;
      }
      const data = await response.json();
      setArticle(data);
    } catch (err) {
      console.error("Error fetching article:", err);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] flex flex-col items-center justify-center p-10">
        <div className="w-8 h-8 border-4 border-[#FF1F8E] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm font-bold text-[#888888]">Loading story...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A]">Article Not Found</h1>
        <p className="mt-2 text-[#888888]">The requested story could not be found.</p>
        <Link to="/news" className="mt-6 px-6 py-2.5 bg-[#FF1F8E] hover:bg-[#C4006A] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition">
          ← Return to Newsroom
        </Link>
      </div>
    );
  }

  const imageUrl = article.imageUrl ? `${API}${article.imageUrl}` : null;
  const videoUrl = article.videoUrl ? `${API}${article.videoUrl}` : null;

  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-AU", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })
    : "Today";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#FF1F8E] hover:text-[#C4006A] uppercase tracking-wider mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Newsroom
        </Link>

        <article className="overflow-hidden rounded-3xl bg-white border border-[#E8E8E8] shadow-lg">
          {/* Header Cover Image (if present and no video) */}
          {imageUrl && !videoUrl && (
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-[#F5F5F5]">
              <img
                src={imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-[#FF1F8E] text-white text-xs font-extrabold uppercase rounded-full tracking-wider shadow">
                  {article.category || "NEWS"}
                </span>
                {article.isFeatured && (
                  <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-extrabold uppercase rounded-full tracking-wider shadow">
                    ⭐ Featured
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Article Header & Content */}
          <div className={`p-6 sm:p-10 ${imageUrl && !videoUrl ? '-mt-16 relative z-10' : ''}`}>
            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#FF1F8E]/10 border border-[#FF1F8E]/30 text-[#FF1F8E] text-xs font-bold uppercase rounded-full tracking-wider">
                {article.category || "NEWS"}
              </span>
              {videoUrl && (
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold uppercase rounded-full tracking-wider flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" /> Video Broadcast
                </span>
              )}
              {article.isFeatured && (
                <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 text-xs font-bold uppercase rounded-full tracking-wider">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
              {article.title}
            </h1>

            {article.summary && (
              <p className="mt-4 text-lg text-[#555555] leading-relaxed font-medium border-l-4 border-[#FF1F8E] pl-4">
                {article.summary}
              </p>
            )}

            {/* Author & Meta Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#F0F0F0] text-xs text-[#AAAAAA]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FF1F8E]/10 border border-[#FF1F8E]/30 flex items-center justify-center text-[#FF1F8E] font-bold text-sm">
                  {(article.authorName || "K").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-sm">{article.authorName || "KK Factor Bureau"}</p>
                  <p className="text-[#AAAAAA] text-[11px]">Staff Journalist</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[#AAAAAA]">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formattedDate}</span>
              </div>
            </div>

            {/* Embedded Video Player */}
            {videoUrl && (
              <div className="mt-8 rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#333333] shadow-xl">
                <div className="px-4 py-3 bg-[#111111] border-b border-[#333333] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF1F8E] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Full Video Report</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#888888]">HD 1080p</span>
                </div>
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <video
                    controls
                    playsInline
                    preload="auto"
                    poster={imageUrl}
                    className="w-full h-full object-contain bg-black"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl} type="video/webm" />
                    Your browser does not support HTML5 video playback.
                  </video>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="mt-8 text-[#444444] leading-relaxed space-y-4 text-base sm:text-lg whitespace-pre-wrap">
              {article.content}
            </div>

            {/* Tags & Footer */}
            <div className="mt-10 pt-6 border-t border-[#F0F0F0]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setLiked(l => !l)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition font-bold text-xs ${
                    liked
                      ? "bg-[#FF1F8E]/10 border-[#FF1F8E]/30 text-[#FF1F8E]"
                      : "bg-[#FAFAFA] border-[#E8E8E8] text-[#888888] hover:text-[#FF1F8E] hover:border-[#FF1F8E]/30"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-[#FF1F8E] text-[#FF1F8E]' : ''}`} />
                  {liked ? "Liked!" : "Like Story"}
                </button>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#FAFAFA] text-[#888888] text-xs font-mono border border-[#E8E8E8]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Back to news */}
        <div className="mt-8 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#FAFAFA] border border-[#E8E8E8] text-[#1A1A1A] font-bold rounded-xl text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" /> More Stories
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Article;
