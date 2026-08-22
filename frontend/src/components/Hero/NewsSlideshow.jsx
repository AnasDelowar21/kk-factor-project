import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Film } from 'lucide-react';
import VideoModal from '../VideoModal/VideoModal';

const FALLBACK_SLIDES = [
  {
    id: 'default-1',
    title: 'News, Radio, Music and Live Streaming in One Place',
    summary: 'Stay updated with the latest stories, listen to live radio, enjoy music and watch live broadcasts through THE KK FACTOR.',
    imageUrl: null,
    videoUrl: null,
    category: 'WELCOME',
  },
];

const SLIDE_INTERVAL = 6000; // 6 seconds per slide

function NewsSlideshow() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        if (data && data.length > 0) {
          const mapped = data.slice(0, 6).map((item) => ({
            id: item._id,
            title: item.title,
            summary: item.summary || (item.content ? item.content.substring(0, 160) + '...' : ''),
            imageUrl: item.imageUrl ? `http://localhost:5000${item.imageUrl}` : null,
            videoUrl: item.videoUrl ? `http://localhost:5000${item.videoUrl}` : null,
            category: item.category || 'NEWS',
            authorName: item.authorName || 'KK Factor Staff',
          }));
          setSlides(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch news for slideshow:', err);
      }
    };
    fetchNews();
  }, []);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused || activeVideoModal || slides.length <= 1) return;
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next, paused, activeVideoModal, slides.length]);

  const slide = slides[current] || slides[0];

  const gradients = [
    'from-red-950 via-slate-900 to-black',
    'from-blue-950 via-slate-900 to-black',
    'from-purple-950 via-slate-900 to-black',
    'from-emerald-950 via-slate-900 to-black',
    'from-orange-950 via-slate-900 to-black',
    'from-rose-950 via-slate-900 to-black',
  ];
  const gradient = gradients[current % gradients.length];

  return (
    <>
      <section
        className="relative overflow-hidden bg-black text-white"
        style={{ minHeight: '92vh' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background Layer — Video, Image or Dynamic Gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {slide.imageUrl ? (
            <>
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
            </>
          ) : slide.videoUrl ? (
            <>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-40 filter blur-xs"
              >
                <source src={slide.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 flex flex-col justify-center"
          style={{ minHeight: '92vh' }}
        >
          <div
            className="max-w-3xl transition-all duration-500"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
            }}
          >
            {/* Category Badge & Video Indicator */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                {slide.category} — THE KK FACTOR
              </div>

              {slide.videoUrl && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Film className="w-3 h-3" /> VIDEO BROADCAST
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white drop-shadow-2xl">
              {slide.title}
            </h1>

            {/* Summary */}
            {slide.summary && (
              <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed line-clamp-3">
                {slide.summary}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* If slide has a video, give a dedicated Watch Video button */}
              {slide.videoUrl && (
                <button
                  onClick={() => setActiveVideoModal(slide)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-2xl shadow-red-950 animate-bounce-subtle"
                >
                  <Play className="w-4 h-4 fill-current" /> Watch Video
                </button>
              )}

              {slide.id !== 'default-1' ? (
                <Link
                  to={`/article/${slide.id}`}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 ${
                    slide.videoUrl
                      ? 'bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-white'
                      : 'bg-red-600 hover:bg-red-500 text-white shadow-2xl shadow-red-950'
                  } font-bold rounded-xl text-sm uppercase tracking-wide transition`}
                >
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-2xl shadow-red-950"
                >
                  Explore News <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              <Link
                to="/live"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition"
              >
                Watch Live
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 hover:border-white/30 transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 hover:border-white/30 transition"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 h-2 bg-red-500'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Slide counter */}
        {slides.length > 1 && (
          <div className="absolute top-8 right-8 z-20 text-xs font-mono text-white/40">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        )}

        {/* Progress bar */}
        {slides.length > 1 && !paused && !activeVideoModal && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
            <div
              key={current}
              className="h-full bg-red-500"
              style={{
                animation: `progressBar ${SLIDE_INTERVAL}ms linear forwards`,
              }}
            />
          </div>
        )}

        <style>{`
          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
        videoUrl={activeVideoModal?.videoUrl}
        title={activeVideoModal?.title}
        category={activeVideoModal?.category}
        authorName={activeVideoModal?.authorName}
      />
    </>
  );
}

export default NewsSlideshow;
