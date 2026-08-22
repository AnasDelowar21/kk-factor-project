import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, Play, Film, Share2 } from "lucide-react";
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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm font-bold text-zinc-400">Loading story...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-3xl font-extrabold text-white">Article Not Found</h1>
        <p className="mt-2 text-zinc-400">The requested story could not be found.</p>
        <Link to="/news" className="mt-6 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider">
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
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Newsroom
        </Link>

        <article className="overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
          {/* Header Cover Image (if present and no video, or alongside video) */}
          {imageUrl && !videoUrl && (
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-zinc-900">
              <img
                src={imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-extrabold uppercase rounded-full tracking-wider shadow">
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
              <span className="px-3 py-1 bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold uppercase rounded-full tracking-wider">
                {article.category || "NEWS"}
              </span>
              {videoUrl && (
                <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase rounded-full tracking-wider flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" /> Video Broadcast
                </span>
              )}
              {article.isFeatured && (
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold uppercase rounded-full tracking-wider">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            {article.summary && (
              <p className="mt-4 text-lg text-zinc-300 leading-relaxed font-medium border-l-4 border-red-600 pl-4">
                {article.summary}
              </p>
            )}

            {/* Author & Meta Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-800/80 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-bold text-sm">
                  {(article.authorName || "K").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{article.authorName || "KK Factor Bureau"}</p>
                  <p className="text-zinc-500 text-[11px]">Staff Journalist</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-zinc-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formattedDate}</span>
              </div>
            </div>

            {/* Embedded Video Player */}
            {videoUrl && (
              <div className="mt-8 rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
                <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Full Video Report</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">HD 1080p</span>
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
            <div className="mt-8 text-zinc-300 leading-relaxed space-y-4 text-base sm:text-lg whitespace-pre-wrap">
              {article.content}
            </div>

            {/* Tags & Footer */}
            <div className="mt-10 pt-6 border-t border-zinc-800/80">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setLiked(l => !l)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition font-bold text-xs ${
                    liked
                      ? "bg-red-600/20 border-red-600/40 text-red-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-red-500 hover:border-red-600/40"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                  {liked ? "Liked!" : "Like Story"}
                </button>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-400 text-xs font-mono border border-zinc-800">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold rounded-xl text-sm transition"
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