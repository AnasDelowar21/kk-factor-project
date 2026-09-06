import React, { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, Handshake, ArrowUpRight } from 'lucide-react';

const FALLBACK_SPONSORS = [
  {
    _id: 'seed-1',
    name: 'Marshall Amplification',
    tagline: 'The Sound of Rock',
    tier: 'Headline Partner',
    websiteUrl: 'https://marshall.com',
    logoUrl: null,
  },
  {
    _id: 'seed-2',
    name: 'Fender Tone & Guitars',
    tagline: 'Born in Underground Stages',
    tier: 'Gold Sponsor',
    websiteUrl: 'https://fender.com',
    logoUrl: null,
  },
  {
    _id: 'seed-3',
    name: 'Rock City Live',
    tagline: 'Premier Live Broadcast Stage',
    tier: 'Headline Partner',
    websiteUrl: 'https://rockcity.example.com',
    logoUrl: null,
  },
  {
    _id: 'seed-4',
    name: 'SoundWave Studios',
    tagline: 'High-Fidelity Audio Gear',
    tier: 'Gold Sponsor',
    websiteUrl: 'https://soundwave.example.com',
    logoUrl: null,
  },
  {
    _id: 'seed-5',
    name: 'Vinyl Vault Melbourne',
    tagline: 'Rare Rock Chic Records',
    tier: 'Official Partner',
    websiteUrl: 'https://vinylvault.example.com',
    logoUrl: null,
  },
  {
    _id: 'seed-6',
    name: 'Thunder Stage Gear',
    tagline: 'Tour Equipment & Lighting',
    tier: 'Silver Sponsor',
    websiteUrl: 'https://thundergear.example.com',
    logoUrl: null,
  },
];

const TIER_COLORS = {
  'Headline Partner': 'from-[#FF1F8E] to-[#C4006A] text-white border-[#FF1F8E]/50',
  'Gold Sponsor': 'from-amber-400 to-amber-600 text-black border-amber-400/60 font-bold',
  'Silver Sponsor': 'from-slate-200 to-slate-400 text-slate-900 border-slate-300 font-semibold',
  'Official Partner': 'from-[#7B5EA7] to-[#5E4580] text-white border-[#7B5EA7]/50',
};

function SponsorsCarousel() {
  const [sponsors, setSponsors] = useState(FALLBACK_SPONSORS);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/sponsors');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSponsors(data);
          }
        }
      } catch (err) {
        console.log('Using fallback sponsors list:', err.message);
      }
    };
    fetchSponsors();
  }, []);

  // Duplicate sponsors for continuous infinite scrolling
  const displayList = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="bg-[#101013] border-b border-white/10 text-white relative overflow-hidden select-none z-20">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/3 w-80 h-10 bg-[#FF1F8E]/15 blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-80 h-10 bg-[#7B5EA7]/20 blur-2xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 flex items-center gap-4">
        {/* Pinned Title / Badge */}
        <div className="flex-shrink-0 flex items-center gap-2 pr-3 border-r border-white/10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF1F8E]/20 border border-[#FF1F8E]/40 text-[#FF6BB5] text-[11px] font-black uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">OFFICIAL</span> SPONSORS
          </div>

          <a
            href="/about#contact"
            className="hidden lg:inline-flex items-center gap-1 text-[11px] text-white/50 hover:text-[#FF1F8E] font-medium transition"
            title="Sponsor THE KK FACTOR"
          >
            <span>Partner</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Continuous Auto-Scrolling Marquee Track */}
        <div
          className="relative flex-1 overflow-hidden mask-fade"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle edge fades */}
          <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-[#101013] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-[#101013] to-transparent z-10 pointer-events-none" />

          <div
            className="flex items-center gap-4 whitespace-nowrap will-change-transform"
            style={{
              animation: `sponsorMarquee 32s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
              width: 'max-content',
            }}
          >
            {displayList.map((sponsor, idx) => {
              const logoSrc = sponsor.logoUrl
                ? sponsor.logoUrl.startsWith('http')
                  ? sponsor.logoUrl
                  : `http://localhost:5000${sponsor.logoUrl}`
                : null;

              const tierStyle =
                TIER_COLORS[sponsor.tier] || TIER_COLORS['Official Partner'];

              const cardContent = (
                <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF1F8E]/70 hover:bg-white/[0.08] transition-all duration-200 group">
                  {/* Logo thumbnail or Initial badge */}
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                      />
                    ) : (
                      <span className="text-[11px] font-black text-[#FF6BB5]">
                        {sponsor.name.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Name & Tagline */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-[#FF1F8E] transition-colors leading-tight">
                        {sponsor.name}
                      </span>
                      {sponsor.websiteUrl && (
                        <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-[#FF1F8E] transition-colors" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-gradient-to-r ${tierStyle}`}
                      >
                        {sponsor.tier || 'Partner'}
                      </span>
                      {sponsor.tagline && (
                        <span className="text-[10px] text-white/50 truncate max-w-[140px]">
                          {sponsor.tagline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );

              return sponsor.websiteUrl ? (
                <a
                  key={`${sponsor._id}-${idx}`}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                  title={`Visit ${sponsor.name}`}
                >
                  {cardContent}
                </a>
              ) : (
                <div key={`${sponsor._id}-${idx}`}>{cardContent}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Marquee Animation CSS */}
      <style>{`
        @keyframes sponsorMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default SponsorsCarousel;
