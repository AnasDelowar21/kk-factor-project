import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Play, Film } from 'lucide-react';
import VideoModal from '../VideoModal/VideoModal';

function LatestNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        setArticles(data.slice(0, 3));
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#FAFAFA] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-[#1A1A1A]">Latest News</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl bg-white border border-[#E8E8E8] shadow-sm animate-pulse" style={{ height: '280px' }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="bg-[#FAFAFA] py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-[#888888]">No news articles published yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-[#FAFAFA] py-14">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF1F8E] mb-1">
                Latest from the Newsroom
              </p>
              <h2 className="text-3xl font-extrabold text-[#1A1A1A]">Latest News</h2>
            </div>
            <Link
              to="/news"
              className="flex items-center gap-2 font-bold text-[#FF1F8E] hover:text-[#C4006A] text-sm transition-colors duration-200"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => {
              const imageUrl = item.imageUrl ? `http://localhost:5000${item.imageUrl}` : null;
              const videoUrl = item.videoUrl ? `http://localhost:5000${item.videoUrl}` : null;
              const summary =
                item.summary || (item.content ? item.content.substring(0, 120) + '...' : '');
              const date = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '';

              return (
                <article
                  key={item._id}
                  className="group rounded-2xl bg-white border border-[#E8E8E8] shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Container */}
                    <div className="relative h-48 bg-[#F5F5F5] overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : videoUrl ? (
                        <div className="relative w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                          <video
                            src={videoUrl}
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#FF1F8E] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F7] to-[#F5F0FF]">
                          <span className="text-4xl font-black text-[#FF1F8E]/20">KK</span>
                        </div>
                      )}

                      {/* Category badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF1F8E] text-white text-xs font-bold uppercase rounded-full tracking-wider shadow">
                        {item.category || 'NEWS'}
                      </span>

                      {videoUrl && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-black text-xs font-black uppercase rounded-full tracking-wider flex items-center gap-1 shadow">
                          <Film className="w-3 h-3" /> VIDEO
                        </span>
                      )}

                      {videoUrl && (
                        <button
                          onClick={() =>
                            setSelectedVideo({
                              videoUrl,
                              title: item.title,
                              category: item.category,
                              authorName: item.authorName,
                            })
                          }
                          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Watch video now"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#FF1F8E] flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-[#1A1A1A] leading-tight text-base mb-2 group-hover:text-[#FF1F8E] transition-colors line-clamp-2">
                        <Link to={`/article/${item._id}`}>{item.title}</Link>
                      </h3>
                      <p className="text-sm text-[#888888] line-clamp-2 mb-4">{summary}</p>
                      <div className="flex items-center justify-between text-xs text-[#AAAAAA]">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{item.authorName || 'KK Factor Staff'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Read more / Watch button */}
                  <div className="px-5 pb-5 pt-2 border-t border-[#F0F0F0] flex items-center justify-between">
                    {videoUrl ? (
                      <button
                        onClick={() =>
                          setSelectedVideo({
                            videoUrl,
                            title: item.title,
                            category: item.category,
                            authorName: item.authorName,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF1F8E] hover:text-[#C4006A] uppercase tracking-wide transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Watch Video
                      </button>
                    ) : (
                      <Link
                        to={`/article/${item._id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#FF1F8E] hover:text-[#C4006A] uppercase tracking-wide transition-colors"
                      >
                        Read Story <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}

                    <Link
                      to={`/article/${item._id}`}
                      className="text-xs text-[#AAAAAA] hover:text-[#888888] font-medium"
                    >
                      Article Details →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
        category={selectedVideo?.category}
        authorName={selectedVideo?.authorName}
      />
    </>
  );
}

export default LatestNews;
