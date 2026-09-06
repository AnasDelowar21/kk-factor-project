import React from 'react';
import { Mail, Sparkles, Bell, ArrowRight } from 'lucide-react';
import { useSubscribeModal } from '../../context/SubscribeContext';

function NewsletterBanner() {
  const { openSubscribeModal } = useSubscribeModal();

  return (
    <section className="bg-gradient-to-r from-[#18181B] via-[#24172E] to-[#18181B] text-white py-14 border-y border-white/10 relative overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF1F8E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#7B5EA7]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-10 backdrop-blur-md">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1F8E]/20 border border-[#FF1F8E]/30 text-[#FF6BB5] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> THE KK FACTOR NEWSLETTER
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Get Breaking News & Exclusive Drops in Your Inbox
            </h2>
            <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
              Stay ahead with daily alerts, exclusive interviews, radio schedules, and the latest in Rock Chic culture. Never miss a beat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-center">
            <button
              type="button"
              onClick={openSubscribeModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#FF1F8E] via-[#C4006A] to-[#7B5EA7] hover:brightness-110 text-white font-bold rounded-2xl text-sm uppercase tracking-wider transition shadow-2xl shadow-[#FF1F8E]/40 cursor-pointer group"
            >
              <Bell className="w-4 h-4 animate-bounce" />
              <span>Subscribe for Free</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterBanner;
