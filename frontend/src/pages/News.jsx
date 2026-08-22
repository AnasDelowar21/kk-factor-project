import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Volume2,
  Play,
  Pause,
  Filter,
  Sparkles,
  Database,
  Radio,
  Clock,
  TrendingUp,
  Film,
  RefreshCw,
} from "lucide-react";
import Footer from "../components/Footer/Footer";
import NewsCard from "../components/NewsCard/NewsCard";
import VideoModal from "../components/VideoModal/VideoModal";
import { usePlayer } from "../context/PlayerContext";

function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [featuredNews, setFeaturedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [onlyVideo, setOnlyVideo] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const { currentTrack, isPlaying, playTrack } = usePlayer();

  useEffect(() => {
    loadNewsData();
  }, [category, search, onlyVideo, sortBy]);

  const loadNewsData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/news');
      const data = await response.json();

      let filteredData = data;
      if (category !== "ALL") {
        filteredData = filteredData.filter(item => item.category === category);
      }
      if (search) {
        filteredData = filteredData.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          (item.content || '').toLowerCase().includes(search.toLowerCase())
        );
      }
      if (onlyVideo) {
        filteredData = filteredData.filter(item => item.videoUrl);
      }

      const mappedData = filteredData.map(item => ({
        id: item._id,
        title: item.title,
        summary: item.summary || (item.content ? item.content.substring(0, 160) + '...' : ''),
        content: item.content,
        imageUrl: item.imageUrl ? `http://localhost:5000${item.imageUrl}` : null,
        videoUrl: item.videoUrl ? `http://localhost:5000${item.videoUrl}` : null,
        publishedAt: item.createdAt,
        category: item.category || 'NEWS',
        isFeatured: item.isFeatured,
        tags: item.tags || [],
        author: { name: item.authorName || 'KK Factor Staff' }
      }));

      setNewsItems(mappedData);

      if (!featuredNews && mappedData.length > 0) {
        const featured = mappedData.find(i => i.isFeatured) || mappedData[0];
        setFeaturedNews(featured);
      }
    } catch (err) {
      console.error("Error fetching news from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "ALL", label: "All News" },
    { id: "WORLD", label: "World" },
    { id: "ENTERTAINMENT", label: "Entertainment" },
    { id: "TECHNOLOGY", label: "Tech & AI" },
    { id: "MUSIC", label: "Music & Culture" },
    { id: "SPORTS", label: "Sports" },
  ];

  return (
    <>
      <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
        {/* Sleek Minimal Header Banner */}
        <section className="relative border-b border-zinc-800/80 py-8 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-red-600/10 border border-red-600/30 rounded-full text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  THE KK FACTOR • NEWSROOM & VIDEO HUB
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  LATEST <span className="text-red-600">HEADLINES</span> & VIDEO BROADCASTS
                </h1>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
                Real-time journalism, investigative reports and full HD video streaming powered by THE KK FACTOR.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 space-y-8">
          {/* Featured Story Hero Banner */}
          {featuredNews && !search && category === "ALL" && (
            <section className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl group">
              <div className="grid md:grid-cols-12 gap-0">
                <div className="md:col-span-7 relative h-72 md:h-96 overflow-hidden bg-zinc-950 flex items-center justify-center">
                  {featuredNews.imageUrl ? (
                    <img
                      src={featuredNews.imageUrl}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : featuredNews.videoUrl ? (
                    <div className="relative w-full h-full">
                      <video
                        src={featuredNews.videoUrl}
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => setActiveVideoModal(featuredNews)}
                          className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
                        >
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
                      <span className="text-5xl font-black text-white/10">KK FACTOR</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-900 pointer-events-none" />
                </div>

                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-zinc-900">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold uppercase rounded-full tracking-wider">
                        FEATURED REPORT
                      </span>
                      {featuredNews.videoUrl && (
                        <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase rounded-full tracking-wider flex items-center gap-1">
                          <Film className="w-3 h-3" /> VIDEO
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight hover:text-red-500 transition-colors">
                      <Link to={`/article/${featuredNews.id}`}>{featuredNews.title}</Link>
                    </h2>

                    <p className="mt-3 text-sm text-zinc-300 leading-relaxed line-clamp-3">
                      {featuredNews.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-3">
                    {featuredNews.videoUrl && (
                      <button
                        onClick={() => setActiveVideoModal(featuredNews)}
                        className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-lg shadow-red-950"
                      >
                        <Play className="w-4 h-4 fill-current" /> Watch Video
                      </button>
                    )}

                    <Link
                      to={`/article/${featuredNews.id}`}
                      className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition border border-zinc-700"
                    >
                      Read Full Story
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Filter and Search Controls Bar */}
          <section className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search articles, stories or keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Quick Toggle Controls */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Only Video Toggle */}
                <button
                  onClick={() => setOnlyVideo(!onlyVideo)}
                  className={`px-3.5 py-2 rounded-xl border font-bold flex items-center gap-1.5 transition ${
                    onlyVideo
                      ? "bg-red-600/20 border-red-600/60 text-red-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Film className="w-3.5 h-3.5" /> Videos Only
                </button>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs text-zinc-300 font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="latest" className="bg-zinc-900 text-white">Latest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-zinc-900 pt-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                    category === cat.id
                      ? "bg-red-600 text-white shadow-md shadow-red-950"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800/80 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          {/* Dynamic News Results Grid */}
          <section>
            {loading ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-red-600 animate-spin mx-auto" />
                <p className="text-sm font-bold text-zinc-400">Loading stories...</p>
              </div>
            ) : newsItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {newsItems.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center space-y-4">
                <Film className="w-12 h-12 text-zinc-600 mx-auto" />
                <h3 className="text-xl font-bold text-white">No Stories Found</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  No matching news or video items found for your search query or filters.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("ALL");
                    setOnlyVideo(false);
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
        videoUrl={activeVideoModal?.videoUrl}
        title={activeVideoModal?.title}
        category={activeVideoModal?.category}
        authorName={activeVideoModal?.author?.name}
      />
    </>
  );
}

export default News;