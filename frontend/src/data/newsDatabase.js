// newsDatabase.js - Database Service for THE KK FACTOR

const DB_STORAGE_KEY = "kk_factor_news_database_v1";

const SEED_NEWS = [
  {
    id: "news-1",
    title: "Global Tech Summit Unveils Breakthrough AI and Audio Processing Tech",
    slug: "global-tech-summit-ai-audio-breakthrough",
    category: "TECHNOLOGY",
    summary:
      "Engineers and researchers have unveiled next-generation real-time neural audio synthesizers that transform how digital broadcasting works.",
    content: `
      <p class="mb-4">The annual International Technology & Audio Summit opened with a ground-breaking announcement in neural digital signal processing. Leading sound engineers demonstrated real-time streaming AI codecs capable of delivering ultra-high-definition audio at a fraction of standard bandwidth.</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">Redefining Digital Broadcasting</h3>
      <p class="mb-4">With high-resolution streaming becoming the standard across news networks and live music platforms, this development allows seamless playback even under low latency mobile networks.</p>

      <blockquote class="border-l-4 border-red-600 pl-4 py-2 my-6 bg-zinc-900/60 rounded-r text-zinc-300 italic">
        "This algorithm bridges high fidelity sound with hyper-efficient transmission, enabling live radio and news audio reports to reach any device instantly." — Dr. Elena Rostova
      </blockquote>

      <p class="mb-4">THE KK FACTOR platform has already integrated early test builds of this neural sound engine to deliver real-time audio stories directly to listeners worldwide.</p>
    `,
    author: {
      name: "Marcus Vance",
      role: "Tech Correspondent",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    publishedAt: "2026-08-10T08:30:00Z",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    audioUrl: "/audio/city-lights.mp3",
    audioDuration: "3:45",
    isFeatured: true,
    isBreaking: true,
    views: 1420,
    likes: 289,
    tags: ["Technology", "AI", "Audio", "Innovation"],
  },
  {
    id: "news-2",
    title: "Sydney Music & Live Arts Festival Announces 2026 Lineup",
    slug: "sydney-music-live-arts-festival-2026",
    category: "ENTERTAINMENT",
    summary:
      "Featuring over 40 international indie artists, electronic producers, and acoustic performers across iconic harbour stages.",
    content: `
      <p class="mb-4">Sydney's premier music festival returns this spring with an ambitious stage setup designed for immersive surround live streaming. Organizers unveiled the headline acts featuring prominent Australian talent alongside international chart-toppers.</p>

      <h3 class="text-xl font-bold text-white mt-6 mb-3">Live Streaming Partnerships</h3>
      <p class="mb-4">THE KK FACTOR Radio and Live Network will provide exclusive live audio feeds and behind-the-scenes interviews throughout the festival weekend.</p>

      <p class="mb-4">Early bird tickets sold out within minutes of release, pointing to record attendance numbers for the 2026 edition.</p>
    `,
    author: {
      name: "Sarah Jenkins",
      role: "Arts & Culture Editor",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    },
    publishedAt: "2026-08-10T06:15:00Z",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    audioUrl: "/audio/sunset-drive.mp3",
    audioDuration: "4:12",
    isFeatured: false,
    isBreaking: false,
    views: 980,
    likes: 174,
    tags: ["Music", "Live", "Festival", "Sydney"],
  },
  {
    id: "news-3",
    title: "Pacific Maritime Agreement Signed to Boost Clean Energy Trade",
    slug: "pacific-maritime-clean-energy-trade-agreement",
    category: "WORLD",
    summary:
      "Representatives from eight nations gathered in Canberra to seal a milestone treaty on green hydrogen transport routes.",
    content: `
      <p class="mb-4">In a landmark diplomatic gathering in Canberra, maritime ministers signed a comprehensive multilateral pact establishing dedicated green shipping corridors across the Pacific Ocean.</p>

      <h3 class="text-xl font-bold text-white mt-6 mb-3">Key Provisions of the Treaty</h3>
      <p class="mb-4">The treaty establishes strict emissions caps for commercial vessels operating in regional trade zones and introduces joint investment funds for clean hydrogen refuelling ports.</p>
    `,
    author: {
      name: "David Thorne",
      role: "International Affairs Bureau",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    publishedAt: "2026-08-09T22:45:00Z",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    audioUrl: "/audio/night-sky.mp3",
    audioDuration: "2:50",
    isFeatured: false,
    isBreaking: false,
    views: 1850,
    likes: 312,
    tags: ["World", "Environment", "Trade", "Energy"],
  },
  {
    id: "news-4",
    title: "Vinyl Revival: Analog Audio Sales Hit 25-Year High in Australia",
    slug: "vinyl-revival-analog-audio-sales-hit-25-year-high",
    category: "MUSIC",
    summary:
      "Music enthusiasts continue to embrace physical records alongside modern digital streaming platforms.",
    content: `
      <p class="mb-4">Industry reports released this week show physical record sales reaching levels not witnessed since the late 1990s. Australian music retailers report record collector demand for both vintage pressings and newly mastered album editions.</p>
    `,
    author: {
      name: "Liam O'Connor",
      role: "Music & Audio Journalist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
    publishedAt: "2026-08-09T14:10:00Z",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=1000&q=80",
    audioUrl: "/audio/sunset-drive.mp3",
    audioDuration: "3:10",
    isFeatured: false,
    isBreaking: false,
    views: 740,
    likes: 195,
    tags: ["Vinyl", "Music Industry", "Audio", "Culture"],
  },
  {
    id: "news-5",
    title: "Next-Gen Quantum Computing Chips Achieve Room Temperature Stability",
    slug: "quantum-computing-room-temperature-stability",
    category: "TECHNOLOGY",
    summary:
      "A breakthrough research project demonstrates stable quantum bit coherence without complex liquid helium cooling tanks.",
    content: `
      <p class="mb-4">Quantum physicists at Australia's National Nanotechnology Laboratory have successfully maintained qubit superposition at room temperature for over 45 minutes, overcoming one of computing's greatest hurdles.</p>
    `,
    author: {
      name: "Marcus Vance",
      role: "Tech Correspondent",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    publishedAt: "2026-08-08T19:00:00Z",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80",
    audioUrl: "/audio/city-lights.mp3",
    audioDuration: "4:05",
    isFeatured: false,
    isBreaking: false,
    views: 2110,
    likes: 430,
    tags: ["Quantum", "Science", "Tech", "Physics"],
  },
  {
    id: "news-6",
    title: "National Football Championship Finals Set Record Broadcast Audience",
    slug: "national-football-championship-finals-record-audience",
    category: "SPORTS",
    summary:
      "Millions tuned in across live radio feeds, digital streams, and television for the dramatic extra-time match finish.",
    content: `
      <p class="mb-4">The championship final delivered one of the most memorable sporting moments of the decade, featuring a thrilling overtime winning goal before a packed stadium crowd.</p>
    `,
    author: {
      name: "Chloe Reynolds",
      role: "Sports Desk Lead",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    publishedAt: "2026-08-08T11:20:00Z",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
    audioUrl: "/audio/night-sky.mp3",
    audioDuration: "3:15",
    isFeatured: false,
    isBreaking: false,
    views: 1640,
    likes: 290,
    tags: ["Sports", "Football", "Finals", "Broadcast"],
  },
];

// Initialize Database in localStorage if empty
const initializeDatabase = () => {
  try {
    const existing = localStorage.getItem(DB_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(SEED_NEWS));
      return SEED_NEWS;
    }
    return JSON.parse(existing);
  } catch (e) {
    console.warn("Could not access localStorage for News DB, using fallback memory state", e);
    return SEED_NEWS;
  }
};

// Database Query Methods
export const newsDatabase = {
  // Get all news with optional filtering & sorting
  getAllNews: async ({ category = "ALL", search = "", onlyAudio = false, sortBy = "latest" } = {}) => {
    // Simulate realistic async database query delay
    await new Promise((res) => setTimeout(res, 80));

    let items = initializeDatabase();

    // Filter by Category
    if (category !== "ALL") {
      items = items.filter(
        (item) => item.category.toUpperCase() === category.toUpperCase()
      );
    }

    // Filter by Search Query
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Audio Only
    if (onlyAudio) {
      items = items.filter((item) => Boolean(item.audioUrl));
    }

    // Sorting
    if (sortBy === "popular") {
      items.sort((a, b) => b.views - a.views);
    } else if (sortBy === "likes") {
      items.sort((a, b) => b.likes - a.likes);
    } else {
      // Default: latest published date
      items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    return items;
  },

  // Get single news record by ID
  getNewsById: async (id) => {
    await new Promise((res) => setTimeout(res, 50));
    const items = initializeDatabase();
    return items.find((item) => String(item.id) === String(id)) || null;
  },

  // Get Featured / Breaking News
  getFeaturedNews: async () => {
    await new Promise((res) => setTimeout(res, 60));
    const items = initializeDatabase();
    return items.find((item) => item.isFeatured) || items[0] || null;
  },

  // Increment view count in database
  incrementViews: async (id) => {
    try {
      const items = initializeDatabase();
      const target = items.find((item) => String(item.id) === String(id));
      if (target) {
        target.views = (target.views || 0) + 1;
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(items));
        return target.views;
      }
    } catch (e) {
      console.error("Error updating views in database", e);
    }
    return null;
  },

  // Toggle Likes in database
  toggleLike: async (id) => {
    try {
      const items = initializeDatabase();
      const target = items.find((item) => String(item.id) === String(id));
      if (target) {
        target.likes = (target.likes || 0) + 1;
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(items));
        return target.likes;
      }
    } catch (e) {
      console.error("Error updating likes in database", e);
    }
    return null;
  },

  // Create new article entry in database
  createNews: async (articleData) => {
    const items = initializeDatabase();
    const newRecord = {
      id: `news-${Date.now()}`,
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      isFeatured: false,
      isBreaking: false,
      ...articleData,
    };
    items.unshift(newRecord);
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(items));
    return newRecord;
  },
};
