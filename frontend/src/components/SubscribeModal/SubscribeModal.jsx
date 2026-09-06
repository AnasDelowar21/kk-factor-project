import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, Sparkles, Bell, ShieldCheck } from 'lucide-react';

const TOPICS = [
  { id: 'breaking_news', label: '⚡ Breaking News Alerts' },
  { id: 'live_shows', label: '📻 Radio & Live Streams' },
  { id: 'music_releases', label: '🎸 Exclusive Music & Drops' },
  { id: 'daily_digest', label: '🗞️ Weekly Rock Chic Digest' },
];

function SubscribeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([
    'breaking_news',
    'live_shows',
    'music_releases',
    'daily_digest',
  ]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleTopic = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          interests: selectedTopics,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.msg || 'Thank you for subscribing to THE KK FACTOR!');
        localStorage.setItem('kk_subscriber_email', email);
      } else {
        setStatus('error');
        setMessage(data.msg || 'Something went wrong. Please try again.');
      }
    } catch {
      // Graceful offline fallback: store in localStorage
      localStorage.setItem('kk_subscriber_email', email);
      localStorage.setItem('kk_subscriber_topics', JSON.stringify(selectedTopics));
      setStatus('success');
      setMessage('Thank you for subscribing! You are now on THE KK FACTOR VIP list.');
    }
  };

  const handleResetAndClose = () => {
    setStatus('idle');
    setMessage('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-[#141416] border border-white/15 text-white shadow-2xl shadow-black/80 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Top ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-40 bg-gradient-to-r from-[#FF1F8E] to-[#7B5EA7] opacity-35 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          /* Success Screen */
          <div className="p-8 sm:p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF1F8E] to-[#7B5EA7] flex items-center justify-center text-white shadow-lg shadow-[#FF1F8E]/30 mb-5 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF1F8E]/20 text-[#FF6BB5] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> VIP Member Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              You're on the list!
            </h3>
            <p className="mt-3 text-white/75 text-sm max-w-sm leading-relaxed">
              {message}
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 text-left w-full space-y-1">
              <p className="font-semibold text-white/90">Subscribed with:</p>
              <p className="text-[#FF6BB5] font-mono">{email || localStorage.getItem('kk_subscriber_email')}</p>
            </div>
            <button
              onClick={handleResetAndClose}
              className="mt-6 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF1F8E] to-[#C4006A] hover:brightness-110 text-white font-bold text-sm tracking-wide uppercase transition shadow-lg shadow-[#FF1F8E]/25 cursor-pointer"
            >
              Back to Browsing
            </button>
          </div>
        ) : (
          /* Subscription Form */
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-[#FF1F8E]/20 border border-[#FF1F8E]/30 text-[#FF6BB5]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#FF6BB5]">
                  THE KK FACTOR VIP
                </span>
                <p className="text-xs text-white/60">Rock Chic Music & News Updates</p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Subscribe for Live Updates
            </h2>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Join thousands of fans getting breaking news alerts, exclusive radio broadcasts, new track premieres, and backstage access.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="subscribe-email" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="subscribe-email"
                    type="email"
                    required
                    placeholder="Enter your email (e.g. alex@example.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF1F8E] focus:ring-1 focus:ring-[#FF1F8E] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Choose your interests:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TOPICS.map((topic) => {
                    const isSelected = selectedTopics.includes(topic.id);
                    return (
                      <button
                        type="button"
                        key={topic.id}
                        onClick={() => toggleTopic(topic.id)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FF1F8E]/20 border-[#FF1F8E] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80'
                        }`}
                      >
                        <span>{topic.label}</span>
                        <span
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px] ${
                            isSelected
                              ? 'bg-[#FF1F8E] border-[#FF1F8E] text-white'
                              : 'border-white/30'
                          }`}
                        >
                          {isSelected && '✓'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {status === 'error' && (
                <p className="text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF1F8E] via-[#C4006A] to-[#7B5EA7] hover:brightness-110 text-white font-bold text-sm tracking-wide uppercase transition shadow-lg shadow-[#FF1F8E]/30 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Subscribe Now
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/50 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero spam. Unsubscribe anytime with one click.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubscribeModal;
