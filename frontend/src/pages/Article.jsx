import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Volume2, Play, Pause, Clock, Eye, Heart, Calendar, User, Share2 } from "lucide-react";
import Footer from "../components/Footer/Footer";
import { newsDatabase } from "../data/newsDatabase";
import { usePlayer } from "../context/PlayerContext";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  const { currentTrack, isPlaying, playTrack } = usePlayer();

  useEffect(() => {
    fetchArticleData();
  }, [id]);

  const fetchArticleData = async () => {
    setLoading(true);
    try {
      const data = await newsDatabase.getNewsById(id);
      setArticle(data);
      if (data) {
        setLikes(data.likes || 0);
        await newsDatabase.incrementViews(id);
      }
    } catch (err) {
      console.error("Error fetching article:", err);
    } finally {
      setLoading(false);
    }
  };

  const isAudioPlaying = currentTrack?.id === article?.id && isPlaying;

  const handlePlayAudio = () => {
    if (!article) return;
    playTrack({
      id: article.id,
      title: article.title,
      artist: article.author?.name || "THE KK FACTOR",
      category: article.category,
      cover: article.imageUrl,
      url: article.audioUrl || "/audio/sunset-drive.mp3",
      type: "news",
    });
  };

  const handleLike = async () => {
    if (!article) return;
    const newLikes = await newsDatabase.toggleLike(article.id);
    if (newLikes) setLikes(newLikes);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-bold text-zinc-400">Loading story from database...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-3xl font-extrabold text-white">Article Not Found</h1>
        <p className="mt-2 text-zinc-400">The requested story could not be found in the database.</p>
        <Link to="/news" className="mt-6 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider">
          ← Return to Newsroom
        </Link>
      </div>
    );
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
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

        {/* Article Container */}
        <article className="overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
          {/* Header Image with Gradient */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-zinc-900">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-extrabold uppercase rounded-full tracking-wider shadow">
                {article.category}
              </span>
            </div>
          </div>

          {/* Article Header Details */}
          <div className="p-6 sm:p-10 -mt-16 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            {/* Author & Meta Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-800/80 text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                {article.author?.avatar && (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                  />
                )}
                <div>
                  <p className="font-bold text-white text-sm">{article.author?.name || "KK Factor Bureau"}</p>
                  <p className="text-zinc-500 text-[11px]">{article.author?.role || "Staff Journalist"}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-zinc-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formattedDate}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {article.views || 1} views</span>
              </div>
            </div>

            {/* Listen Audio Story Banner */}
            {article.audioUrl && (
              <div className="mt-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 flex-shrink-0">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-500">Audio Version Available</p>
                    <p className="text-sm font-bold text-white">Listen to full audio report ({article.audioDuration})</p>
                  </div>
                </div>

                <button
                  onClick={handlePlayAudio}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition ${
                    isAudioPlaying
                      ? "bg-red-600 text-white shadow-lg shadow-red-950 animate-pulse"
                      : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950"
                  }`}
                >
                  {isAudioPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Listen Story</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Article Content */}
            <div
              className="mt-8 text-zinc-300 leading-relaxed space-y-4 text-base sm:text-lg"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Footer & Likes */}
            <div className="mt-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-red-500 hover:border-red-600/40 transition font-bold text-xs"
              >
                <Heart className="w-4 h-4 fill-red-600 text-red-600" />
                <span>Like Story ({likes})</span>
              </button>

              <div className="flex items-center gap-2">
                {article.tags?.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-400 text-xs font-mono border border-zinc-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Article;