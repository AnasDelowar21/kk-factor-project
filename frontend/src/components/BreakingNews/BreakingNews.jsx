import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';

function BreakingNews() {
  const [headlines, setHeadlines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        if (data && data.length > 0) {
          setHeadlines(data.map(item => ({ id: item._id, title: item.title, category: item.category })));
        }
      } catch {
        // Keep empty — ticker simply won't show
      }
    };
    fetchHeadlines();
  }, []);

  // Cycle through headlines every 5s
  useEffect(() => {
    if (headlines.length <= 1) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(i => (i + 1) % headlines.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [headlines]);

  const current = headlines[currentIndex];

  return (
    <div style={{
      backgroundColor: '#dc2626',
      color: 'white',
      padding: '8px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(0,0,0,0.25)',
          padding: '3px 12px',
          borderRadius: '4px',
          flexShrink: 0,
          fontSize: '11px',
          fontWeight: 900,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ width: '7px', height: '7px', backgroundColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          LIVE
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />

        {/* Headline text */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {current ? (
            <Link
              to={`/article/${current.id}`}
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: 'white',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'opacity 0.3s, transform 0.3s',
              }}
            >
              {current.category && (
                <span style={{ opacity: 0.7, marginRight: '8px', fontWeight: 800 }}>
                  {current.category} ·
                </span>
              )}
              {current.title}
            </Link>
          ) : (
            <span style={{ fontSize: '13px', fontWeight: 600, opacity: 0.8 }}>
              Latest updates and stories from THE KK FACTOR
            </span>
          )}
        </div>

        {/* Counter */}
        {headlines.length > 1 && (
          <div style={{
            flexShrink: 0,
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
          }}>
            {headlines.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        )}

        {/* View all */}
        <Link
          to="/news"
          style={{
            flexShrink: 0,
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
            borderLeft: '1px solid rgba(255,255,255,0.25)',
            paddingLeft: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          All News →
        </Link>
      </div>
    </div>
  );
}

export default BreakingNews;