import React from 'react';
import { Link } from 'react-router-dom';
import {
  Radio,
  Music,
  Award,
  Sparkles,
  Mail,
  Mic,
  Calendar,
  MapPin,
  Flame,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Globe,
  Share2
} from 'lucide-react';
import Footer from '../components/Footer/Footer';
import { useSubscribeModal } from '../context/SubscribeContext';

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

function About() {
  const { openSubscribeModal } = useSubscribeModal();

  const bioFacts = [
    { label: 'Stage / Brand', value: 'KK / THE KK FACTOR', icon: Mic },
    { label: 'Role & Speciality', value: 'Broadcaster, Curator & Journalist', icon: Headphones },
    { label: 'Musical Focus', value: 'Rock Chic, Indie, Alternative & Live Acts', icon: Music },
    { label: 'Headquarters', value: 'Melbourne, Australia & Global Airwaves', icon: MapPin },
    { label: 'Broadcast Schedule', value: '24/7 Radio & Scheduled Live Broadcasts', icon: Radio },
    { label: 'Core Mission', value: 'Amplifying Real Rock Culture & Unfiltered Music', icon: Flame },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The Underground Genesis',
      description:
        'Started with late-night independent radio sets, curating the best hidden rock gems and underground releases across Australia and overseas.',
    },
    {
      year: '2022',
      title: 'Broadcasting & The Rock Chic Sound',
      description:
        'Established THE KK FACTOR signature brand: bold, unapologetic, high-energy Rock Chic aesthetics fusing style, attitude, and cutting-edge music.',
    },
    {
      year: '2024',
      title: 'Festival Coverage & Exclusive Artist Sessions',
      description:
        'Conducted in-depth artist interviews, backstage video reports, and curated festival previews connecting thousands of global music fans.',
    },
    {
      year: '2026',
      title: 'The All-in-One Digital Media Powerhouse',
      description:
        'Unveiled the full KK Factor platform uniting real-time breaking news, 24/7 digital live radio, multi-track music players, and exclusive live broadcasts.',
    },
  ];

  const pillars = [
    {
      title: 'Live Radio & Audio Stream',
      description:
        'Curating non-stop high-energy rock chic tracks, artist spotlights, and live radio broadcasting directly accessible from any device.',
      icon: Radio,
      link: '/radio',
      btnText: 'Tune In Live',
    },
    {
      title: 'Music Journalism & Newsroom',
      description:
        'Delivering breaking music news, concert reviews, exclusive interviews, and authentic cultural commentary from the front row.',
      icon: Mic,
      link: '/news',
      btnText: 'Read Stories',
    },
    {
      title: 'Curated Rock Chic Playlists',
      description:
        'Hand-picked playlists showcasing both established rock icons and the fiercest breakthrough artists taking over the airwaves.',
      icon: Music,
      link: '/music',
      btnText: 'Listen to Tracks',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-[#141416] text-white py-20 lg:py-28 border-b border-white/10">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF1F8E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#7B5EA7]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Bio Introduction */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1F8E]/20 border border-[#FF1F8E]/40 text-[#FF6BB5] text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" /> FOUNDER & HOST — THE KK FACTOR
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1F8E] via-[#FF6BB5] to-[#A685D4]">KK</span>.
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-bold text-white/90">
                Broadcaster, Music Curator & Rock Culture Creator
              </p>

              <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
                Welcome to my universe. I built <strong className="text-white">THE KK FACTOR</strong> with a singular mission: to bring raw, unfiltered rock energy, authentic stories, and the freshest sounds back to the forefront of modern broadcasting.
              </p>
              <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl">
                From live radio streams and festival trenches to exclusive artist sit-downs and weekly rock culture news, this platform is for the renegades, the music lovers, and everyone who lives for the rhythm of rock chic.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openSubscribeModal}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#FF1F8E] to-[#C4006A] hover:brightness-110 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-xl shadow-[#FF1F8E]/30 cursor-pointer"
                >
                  Join VIP Inner Circle <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition"
                >
                  Get In Touch
                </a>
              </div>

              {/* Social links */}
              <div className="mt-8 flex items-center gap-4 text-white/60">
                <span className="text-xs uppercase font-bold tracking-widest text-white/40">Connect:</span>
                <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-[#FF1F8E] hover:text-white transition-colors" title="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-[#FF1F8E] hover:text-white transition-colors" title="YouTube">
                  <YoutubeIcon />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-[#FF1F8E] hover:text-white transition-colors" title="Facebook">
                  <FacebookIcon />
                </a>
                <a href="mailto:contact@thekkfactor.com" className="p-2.5 rounded-full bg-white/5 hover:bg-[#FF1F8E] hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Featured Portrait & Brand Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative glow border */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#FF1F8E] to-[#7B5EA7] opacity-60 blur-xl" />
                
                <div className="relative rounded-3xl bg-[#1D1D21] border border-white/15 p-7 text-white shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF1F8E] to-[#7B5EA7] flex items-center justify-center font-black text-xl shadow-lg">
                        KK
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white">THE KK FACTOR</h3>
                        <p className="text-xs text-[#FF6BB5] font-semibold tracking-wide">Official Identity & Bio</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>

                  <div className="space-y-4">
                    {bioFacts.map((fact, idx) => {
                      const Icon = fact.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="p-2 rounded-lg bg-[#FF1F8E]/20 text-[#FF6BB5] mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">{fact.label}</p>
                            <p className="text-sm font-semibold text-white/95 mt-0.5">{fact.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 text-center">
                    <p className="text-xs text-white/60 italic">
                      "Rock & Roll isn't just music — it's an undeniable frequency of living."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars / What I Do */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF1F8E] mb-2 block">
              What We Create
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              The Pillars of THE KK FACTOR
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#666666]">
              A dynamic digital ecosystem engineered for rock lovers, culture enthusiasts, and modern audiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#FAFAFA] border border-[#E8E8E8] p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF1F8E] to-[#7B5EA7] flex items-center justify-center text-white shadow-lg shadow-[#FF1F8E]/20 mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black text-[#1A1A1A] mb-3 group-hover:text-[#FF1F8E] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#666666] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <Link
                    to={pillar.link}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#FF1F8E] hover:text-[#C4006A] transition-colors"
                  >
                    <span>{pillar.btnText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey & Milestones Timeline */}
      <section className="py-20 bg-[#F5F5F7] border-y border-[#E8E8E8]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B5EA7] mb-2 block">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Milestones Along the Airwaves
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#666666]">
              How a passion for rock music transformed into an international digital broadcasting hub.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white p-7 border border-[#E8E8E8] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF1F8E]/10 to-[#7B5EA7]/10 rounded-bl-full pointer-events-none" />
                <span className="inline-block px-3 py-1 rounded-full bg-[#FF1F8E]/10 text-[#FF1F8E] text-xs font-black tracking-wider mb-4">
                  {item.year}
                </span>
                <h3 className="text-lg font-extrabold text-[#1A1A1A] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration / Contact & Booking Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#18181B] via-[#24172E] to-[#18181B] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#FF1F8E]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4">
                <Mail className="w-3.5 h-3.5 text-[#FF6BB5]" /> Inquiries & Bookings
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Let's Make Noise Together
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                Interested in sponsorship opportunities, artist interviews, radio track submissions, or hosting collaborations? Reach out directly and let's bring bold projects to life.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:contact@thekkfactor.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#FF1F8E] to-[#C4006A] hover:brightness-110 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-xl shadow-[#FF1F8E]/30"
                >
                  <Mail className="w-4 h-4" /> contact@thekkfactor.com
                </a>

                <button
                  type="button"
                  onClick={openSubscribeModal}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition cursor-pointer"
                >
                  Subscribe for Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
