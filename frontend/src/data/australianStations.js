export const australianStations = [
  {
    id: "kk-factor-radio",
    name: "THE KK FACTOR Radio",
    frequency: "99.9 FM / Ultra HD",
    location: "Sydney / Melbourne / National",
    state: "NSW",
    genre: "Pop & Hits",
    logo: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://live-radio01.mediahubaustralia.com/2TJW/mp3/",
    fallbackStream: "https://live-radio01.mediahubaustralia.com/PBW/mp3/",
    description: "The official flagship 24/7 radio station of THE KK FACTOR network. Playing exclusive premier tracks, daily breaking news roundups, celebrity interviews, and live DJ sets.",
    listeners: "520K Listening Live",
    bitrate: "320 kbps Ultra HD",
    isFeatured: true,
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "The KK Factor Morning Show with KK & Crew",
        host: "Anas & KK Factor Broadcast Team",
        isCurrent: true,
        progress: 70,
        description: "Australia's top morning show! Live breaking headlines, trending social topics, exclusive artist interviews, and morning hits.",
        highlights: ["KK Morning Rant", "Top Trending Stories", "Artist Premieres"]
      },
      {
        time: "09:00 - 12:00",
        title: "Non-Stop KK Factor Top 40 Hits",
        host: "DJ Sarah Vee",
        isCurrent: false,
        progress: 0,
        description: "Back-to-back chart toppers, viral hits, and exclusive premier tracks requested by listeners across Australia.",
        highlights: ["Listener Request Hour", "Fresh Music Friday"]
      },
      {
        time: "12:00 - 15:00",
        title: "Midday Express & Tech Pulse",
        host: "Marcus Vance",
        isCurrent: false,
        progress: 0,
        description: "Midday news roundups, tech innovations, gaming releases, and Aussie indie music spotlights.",
        highlights: ["AI & Tech Pulse", "Indie Spotlight"]
      },
      {
        time: "15:00 - 18:00",
        title: "KK Drive Time & Live DJ Club Mix",
        host: "DJ KK & Alex Rivers",
        isCurrent: false,
        progress: 0,
        description: "High-energy afternoon drive show with live electronic mixes, comedy banter, and evening commute updates.",
        highlights: ["5pm Club Mix", "Traffic & Weather Watch"]
      },
      {
        time: "18:00 - 21:00",
        title: "The KK Factor Evening Special",
        host: "Elena Rostova",
        isCurrent: false,
        progress: 0,
        description: "Exclusive deep-dive interviews, live acoustic studio sessions, and international hit showcases.",
        highlights: ["Live Studio Acoustic Session", "Global Chart Countdown"]
      },
      {
        time: "21:00 - 00:00",
        title: "Late Night Chill & Lo-Fi Lounge",
        host: "Nightfall Beats",
        isCurrent: false,
        progress: 0,
        description: "Smooth ambient lounge, downtempo electronic beats, and late-night listener call-ins.",
        highlights: ["Lo-Fi Study Beats", "Late Night Confessions"]
      }
    ]
  },
  {
    id: "abc-newsradio",
    name: "ABC NewsRadio",
    frequency: "1026 AM / Digital",
    location: "Sydney / National",
    state: "NSW",
    genre: "News & Talk",
    logo: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://live-radio01.mediahubaustralia.com/PBW/mp3/",
    fallbackStream: "https://live-radio01.mediahubaustralia.com/PBW/aac/",
    description: "Australia's only 24/7 continuous news radio network, delivering breaking headlines, politics, world news, and live parliamentary broadcasts.",
    listeners: "245K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "Morning Newsroom Australia",
        host: "Glen Bartholomew & Karen Middleton",
        isCurrent: true,
        progress: 65,
        description: "In-depth national & global headline reports, economic updates, and live interviews with Australian federal ministers.",
        highlights: ["Federal Budget Analysis", "Global Markets Update", "Weather & Traffic Desk"]
      },
      {
        time: "09:00 - 12:00",
        title: "Midday Business & Politics",
        host: "Sandy Aloisi",
        isCurrent: false,
        progress: 0,
        description: "Breaking financial developments, ASX index breakdown, and live commentary on international affairs.",
        highlights: ["ASX 200 Live Index", "Pacific Rim Security Brief"]
      },
      {
        time: "12:00 - 15:00",
        title: "National Press Club & World Report",
        host: "Laura Tingle",
        isCurrent: false,
        progress: 0,
        description: "Live broadcast from Canberra Press Club followed by extended BBC World Service and regional reports.",
        highlights: ["Address from Key Minister", "Q&A Forum"]
      },
      {
        time: "15:00 - 18:00",
        title: "Drive Hour News Edition",
        host: "Thomas Oriti",
        isCurrent: false,
        progress: 0,
        description: "Comprehensive afternoon roundup of national news, sports summaries, and evening commute wrap-up.",
        highlights: ["State by State Weather", "Evening Commute Brief"]
      },
      {
        time: "18:00 - 21:00",
        title: "The World Today Evening Wrap",
        host: "Eleanor Hall",
        isCurrent: false,
        progress: 0,
        description: "Investigative journalism, international headlines, and deep-dive analysis into the day's biggest stories.",
        highlights: ["Global Foreign Affairs", "Tech & Climate Special"]
      },
      {
        time: "21:00 - 00:00",
        title: "Overnight BBC World Service",
        host: "BBC World Desk",
        isCurrent: false,
        progress: 0,
        description: "Live international broadcasting powered by the BBC World Service and ABC News correspondents.",
        highlights: ["European Morning News", "Global Culture Today"]
      }
    ]
  },
  {
    id: "abc-triplej",
    name: "ABC Triple J",
    frequency: "105.7 FM",
    location: "Sydney / National",
    state: "NSW",
    genre: "Pop & Hits",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://live-radio01.mediahubaustralia.com/2TJW/mp3/",
    fallbackStream: "https://live-radio01.mediahubaustralia.com/2TJW/aac/",
    description: "The home of new Australian music, alternative hits, live Like A Version performances, and youth culture.",
    listeners: "410K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "Triple J Breakfast with Concetta & Bryce",
        host: "Concetta Caristo & Bryce Mills",
        isCurrent: true,
        progress: 40,
        description: "High-energy morning laughs, fresh Aussie indie releases, live listener call-ins, and Friday Like A Version.",
        highlights: ["New Music First Play", "Caller Conundrum", "Like A Version Teaser"]
      },
      {
        time: "09:00 - 12:00",
        title: "Mornings with Lucy Smith",
        host: "Lucy Smith",
        isCurrent: false,
        progress: 0,
        description: "Exclusive track premieres, artist interviews, feature album of the week, and live studio sessions.",
        highlights: ["Feature Album Playthrough", "Aussie Music News"]
      },
      {
        time: "12:00 - 15:00",
        title: "Lunch with Dave Woodhead",
        host: "Dave Woodhead",
        isCurrent: false,
        progress: 0,
        description: "Midday beats, hilarious banter, hip-hop & indie selections to power your lunch break.",
        highlights: ["Request Hour", "Hottest 100 Flashback"]
      },
      {
        time: "15:00 - 18:00",
        title: "Drive with Hobba & Hing",
        host: "Michael Hing & Lewis Hobba",
        isCurrent: false,
        progress: 0,
        description: "Australia's favorite afternoon drive show packed with comedy segments, guest stars, and fresh tracks.",
        highlights: ["Simply The Jest", "The Daily Debate"]
      },
      {
        time: "18:00 - 20:00",
        title: "Good Nights with Bridget Hustwaite",
        host: "Bridget Hustwaite",
        isCurrent: false,
        progress: 0,
        description: "Showcasing emerging Aussie talent, indie pop, electronic, and underground hits.",
        highlights: ["Unearthed Spotlight", "Live Studio Session"]
      },
      {
        time: "20:00 - 23:00",
        title: "Home & Hosed (Aussie Special)",
        host: "Declan Byrne",
        isCurrent: false,
        progress: 0,
        description: "100% Australian music show playing brand new releases from emerging local bands and producers.",
        highlights: ["Fresh Local Demos", "Indie Record Reviews"]
      }
    ]
  },
  {
    id: "abc-classic",
    name: "ABC Classic FM",
    frequency: "92.9 FM",
    location: "Melbourne / National",
    state: "VIC",
    genre: "Classical",
    logo: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://live-radio01.mediahubaustralia.com/2FMW/mp3/",
    fallbackStream: "https://live-radio01.mediahubaustralia.com/2FMW/aac/",
    description: "Australia's premier classical music station broadcasting orchestral masterpieces, chamber music, and live concerts.",
    listeners: "180K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "Classic Breakfast with Russell Torrance",
        host: "Russell Torrance",
        isCurrent: true,
        progress: 80,
        description: "Uplifting symphonic movements, Mozart concertos, and baroque melodies to start your morning with serenity.",
        highlights: ["Baroque Hour", "Morning Symphony Spotlight", "Listener Requests"]
      },
      {
        time: "09:00 - 12:00",
        title: "Classic Morning Masterpieces",
        host: "Megan Burslem",
        isCurrent: false,
        progress: 0,
        description: "Full-length concertos by Beethoven, Brahms, and Tchaikovsky performed by world-class Australian orchestras.",
        highlights: ["Sydney Symphony Live Capture", "Piano Sonatas"]
      },
      {
        time: "12:00 - 15:00",
        title: "Midday Concert Hall",
        host: "Damien Beaumont",
        isCurrent: false,
        progress: 0,
        description: "Complete orchestral recordings from the Melbourne Symphony Orchestra and Australian Chamber Orchestra.",
        highlights: ["Melbourne Recital Hall", "Chamber Ensemble Live"]
      },
      {
        time: "15:00 - 18:00",
        title: "Classic Drive",
        host: "Vanessa Hughes",
        isCurrent: false,
        progress: 0,
        description: "Relaxing classical compositions, soothing cello suites, and choral works to unwind during your journey home.",
        highlights: ["Film Score Spotlight", "Aussie Composers"]
      },
      {
        time: "18:00 - 22:00",
        title: "Evenings Live at the Opera",
        host: "Mandy Hall",
        isCurrent: false,
        progress: 0,
        description: "Full opera broadcasts, sacred vocal works, and classical debuts recorded live across Australia.",
        highlights: ["Opera Australia Production", "Intermission Feature"]
      }
    ]
  },
  {
    id: "abc-rn",
    name: "ABC Radio National (RN)",
    frequency: "846 AM",
    location: "Canberra / National",
    state: "ACT",
    genre: "News & Talk",
    logo: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://live-radio01.mediahubaustralia.com/3RN/mp3/",
    fallbackStream: "https://live-radio01.mediahubaustralia.com/3RN/aac/",
    description: "Ideas, culture, philosophy, science, and deep investigative journalism for curious Australian minds.",
    listeners: "195K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "RN Breakfast with Patricia Karvelas",
        host: "Patricia Karvelas",
        isCurrent: true,
        progress: 50,
        description: "Essential national discourse, political accountability, science developments, and cultural perspectives.",
        highlights: ["Ministerial Debate", "Science & Innovation", "Global Economy Brief"]
      },
      {
        time: "09:00 - 10:00",
        title: "Life Matters",
        host: "Hilary Harper",
        isCurrent: false,
        progress: 0,
        description: "Exploring relationships, mental health, community stories, social policy, and Australian family life.",
        highlights: ["Community Voice", "Psychology Focus"]
      },
      {
        time: "10:00 - 12:00",
        title: "The Art Show & Books",
        host: "Daniel Browning",
        isCurrent: false,
        progress: 0,
        description: "In-depth reviews of literature, visual arts, theatre, cinema, and interviews with leading creators.",
        highlights: ["Literary Awards Special", "Artist Retrospective"]
      },
      {
        time: "12:00 - 13:00",
        title: "The World Today",
        host: "Sally Sara",
        isCurrent: false,
        progress: 0,
        description: "Comprehensive mid-day current affairs analysis from ABC's global network of foreign correspondents.",
        highlights: ["Middle East & Asia Briefing", "Pacific News Digest"]
      },
      {
        time: "13:00 - 16:00",
        title: "Science Show & Philosophy Talk",
        host: "Robyn Williams",
        isCurrent: false,
        progress: 0,
        description: "Exploring quantum physics, climate science, AI technology, and philosophical ethics.",
        highlights: ["Climate Tech Discoveries", "Ethics in Artificial Intelligence"]
      },
      {
        time: "16:00 - 18:00",
        title: "Drive with Andy Park",
        host: "Andy Park",
        isCurrent: false,
        progress: 0,
        description: "End of day analytical wrap, political roundtables, and international headlines.",
        highlights: ["Politis Power Panel", "Technology Watch"]
      }
    ]
  },
  {
    id: "sbs-chill",
    name: "SBS Chill Radio",
    frequency: "DAB+ / Digital",
    location: "Sydney / National",
    state: "NSW",
    genre: "Community",
    logo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://sbs-ice.streamguys1.com/sbs-chill",
    fallbackStream: "https://sbs-ice.streamguys1.com/sbs-chill",
    description: "Continuous global chillout, ambient beats, downtempo electronic, and world fusion melodies.",
    listeners: "160K Listening Live",
    bitrate: "256 kbps HD",
    schedule: [
      {
        time: "06:00 - 10:00",
        title: "Sunrise Ambient Sessions",
        host: "DJ Maya K",
        isCurrent: true,
        progress: 30,
        description: "Gentle acoustic guitar, lo-fi beats, ambient synths, and tranquil world soundscapes for morning focus.",
        highlights: ["Lo-Fi Morning Beats", "Nordic Ambient Lounge"]
      },
      {
        time: "10:00 - 14:00",
        title: "Global Downtempo Odyssey",
        host: "Sanjay Patel",
        isCurrent: false,
        progress: 0,
        description: "Relaxing rhythms blending Indian sitar, Mediterranean strings, and Japanese electronic lounge.",
        highlights: ["Silk Road Melodies", "Bossa Nova Chill"]
      },
      {
        time: "14:00 - 18:00",
        title: "Afternoon Balearic Lounge",
        host: "Elena Rostova",
        isCurrent: false,
        progress: 0,
        description: "Ibiza sunset vibes, deep organic house, and soothing synthwaves for afternoon relaxation.",
        highlights: ["Sunset Groove", "Organic Deep Lounge"]
      },
      {
        time: "18:00 - 22:00",
        title: "Nightfall Chillout & Beats",
        host: "Marcus Thorne",
        isCurrent: false,
        progress: 0,
        description: "Smooth jazz-infused electronica, trip-hop classics, and soothing vocal soundscapes.",
        highlights: ["Trip-Hop Revival", "Smooth Synthwave"]
      }
    ]
  },
  {
    id: "pbs-fm",
    name: "PBS 106.7 FM Melbourne",
    frequency: "106.7 FM",
    location: "Melbourne",
    state: "VIC",
    genre: "Community",
    logo: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://pbs-stream.radiojar.com/pbs-mp3",
    fallbackStream: "https://pbs-stream.radiojar.com/pbs-mp3",
    description: "Iconic independent community radio playing soul, funk, garage rock, jazz, blues, world, and electronic music.",
    listeners: "125K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "The Breakthrough Breakfast",
        host: "Crispi Black",
        isCurrent: true,
        progress: 75,
        description: "Melbourne's quintessential community morning radio playing local garage rock, soul, and post-punk releases.",
        highlights: ["Local Gig Guide", "Vinyl Spotlight", "Indie Artist Guest"]
      },
      {
        time: "09:00 - 11:00",
        title: "Soul Groove Odyssey",
        host: "Miss Goldie",
        isCurrent: false,
        progress: 0,
        description: "Rare 60s & 70s deep funk, northern soul, Afrobeat 45s, and disc-jockey gems direct from vinyl.",
        highlights: ["Rare 45s Hour", "Motown Classics"]
      },
      {
        time: "11:00 - 13:00",
        title: "Jazz On The Rocks",
        host: "Bebop Bob",
        isCurrent: false,
        progress: 0,
        description: "Hard bop, modal jazz, Australian contemporary quartets, and fusion improvisations.",
        highlights: ["Melbourne International Jazz Fest Brief", "Miles Davis Tribute"]
      },
      {
        time: "13:00 - 15:00",
        title: "Global Rhythms & Afrobeat",
        host: "Kofi Mensah",
        isCurrent: false,
        progress: 0,
        description: "Highlife, reggae, dub, Latin salsa, and tropical dance grooves live from Collingwood studio.",
        highlights: ["Reggae Vinyl Session", "Latin Percussion Hour"]
      },
      {
        time: "15:00 - 17:00",
        title: "Heavy Metal & Hard Rock Hour",
        host: "Metal Dave",
        isCurrent: false,
        progress: 0,
        description: "Classic heavy metal, doom, thrash, and local heavy underground releases.",
        highlights: ["Stoner Rock Digest", "Underground Demo Reviews"]
      }
    ]
  },
  {
    id: "sbs-popasia",
    name: "SBS PopAsia",
    frequency: "DAB+ / Digital",
    location: "Sydney / National",
    state: "NSW",
    genre: "Pop & Hits",
    logo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://sbs-ice.streamguys1.com/sbs-popasia",
    fallbackStream: "https://sbs-ice.streamguys1.com/sbs-popasia",
    description: "Australia's top Asian pop music network featuring the hottest K-Pop, J-Pop, C-Pop, and Asian electronic hits.",
    listeners: "310K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "K-Pop Morning Countdown",
        host: "Kevin Kim & Andy Trieu",
        isCurrent: true,
        progress: 45,
        description: "Non-stop BTS, BLACKPINK, NewJeans, Stray Kids, and top 20 Seoul charts with live idol news.",
        highlights: ["Billboard K-Pop 100", "Idol Birthday Shoutouts", "J-Pop Special"]
      },
      {
        time: "09:00 - 12:00",
        title: "Asian Hits Non-Stop",
        host: "Nat Tran",
        isCurrent: false,
        progress: 0,
        description: "Latest Mandarin pop releases, Cantonese classics, Taiwanese indie, and anime theme songs.",
        highlights: ["C-Pop Chart Attack", "Anime OST Hour"]
      },
      {
        time: "12:00 - 15:00",
        title: "J-Pop & City Pop Revival",
        host: "Kenji Sato",
        isCurrent: false,
        progress: 0,
        description: "80s Japanese City Pop classics mixed with contemporary Tokyo electronic hits.",
        highlights: ["80s Tokyo Vinyl", "J-Rock Explosion"]
      },
      {
        time: "15:00 - 18:00",
        title: "PopAsia Request Party",
        host: "Andy Trieu",
        isCurrent: false,
        progress: 0,
        description: "Listener requested tracks, TikTok viral Asian hits, and dance choreography music mixes.",
        highlights: ["Fan Request Hour", "Dance Cover Battles"]
      }
    ]
  },
  {
    id: "kix-country",
    name: "KIX Country Radio",
    frequency: "92.3 FM / Digital",
    location: "Brisbane / Regional AU",
    state: "QLD",
    genre: "Country",
    logo: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://kix.streamguys1.com/kix",
    fallbackStream: "https://kix.streamguys1.com/kix",
    description: "Australia's national country music station playing modern country, Aussie bush ballads, Nashville hits, and Tamworth favorites.",
    listeners: "220K Listening Live",
    bitrate: "256 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "KIX Country Breakfast with Justin & Justin",
        host: "Justin Kreeft",
        isCurrent: true,
        progress: 60,
        description: "High energy country hits, Keith Urban, Morgan Wallen, Lee Kernaghan, and country rodeo announcements.",
        highlights: ["Tamworth Golden Guitar Special", "Aussie Country Top 10"]
      },
      {
        time: "09:00 - 13:00",
        title: "Aussie Country Today",
        host: "Crossy",
        isCurrent: false,
        progress: 0,
        description: "Spotlighting homegrown Australian country artists, acoustic guitar sessions, and country news.",
        highlights: ["Acoustic Corner", "Outback Stories"]
      },
      {
        time: "13:00 - 17:00",
        title: "Nashville Hottest 20",
        host: "Luke Lewis",
        isCurrent: false,
        progress: 0,
        description: "Direct updates from Tennessee with country rock, bluegrass, and stadium country anthems.",
        highlights: ["Grand Ole Opry Spotlight", "Nashville Country Chart"]
      },
      {
        time: "17:00 - 21:00",
        title: "The Country Drive Show",
        host: "Sarah Brooks",
        isCurrent: false,
        progress: 0,
        description: "Country classics from Slim Dusty, Johnny Cash, Dolly Parton mixed with modern chart toppers.",
        highlights: ["Classic Country Vault", "Rodeo & Muster Updates"]
      }
    ]
  },
  {
    id: "abc-sport",
    name: "ABC Sport Live Radio",
    frequency: "Digital / Online",
    location: "Sydney / National",
    state: "NSW",
    genre: "News & Talk",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://live-radio01.mediahubaustralia.com/GRW/mp3/",
    fallbackStream: "https://live-radio01.mediahubaustralia.com/GRW/aac/",
    description: "Live commentary for AFL, NRL, Test Cricket, A-League, Olympic sports, and sports commentary.",
    listeners: "290K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "The Sports Morning Desk",
        host: "Quentin Hull & Corbin Middlemas",
        isCurrent: true,
        progress: 55,
        description: "Morning sports analysis, NRL team lists, AFL injury updates, and live interviews with head coaches.",
        highlights: ["AFL Round Preview", "NRL Selection Press Conference", "Cricket Test Squad"]
      },
      {
        time: "09:00 - 12:00",
        title: "Grandstand Extra & AFL Focus",
        host: "Alister Nicholson",
        isCurrent: false,
        progress: 0,
        description: "In-depth tactical breakdowns of Australian rules football, player metrics, and fan talkback.",
        highlights: ["Tactical Board Analysis", "Fan Helpline"]
      },
      {
        time: "12:00 - 18:00",
        title: "Live Matchday Grandstand",
        host: "Grandstand Broadcast Team",
        isCurrent: false,
        progress: 0,
        description: "Ball-by-ball live stadium commentary of AFL at the MCG and NRL at Accor Stadium.",
        highlights: ["Live MCG Commentary", "Post-Match Presser"]
      },
      {
        time: "18:00 - 21:00",
        title: "Sports Wrap & Offside Report",
        host: "Catherine Cox",
        isCurrent: false,
        progress: 0,
        description: "Comprehensive review of all sporting codes across Australia and global tournament results.",
        highlights: ["Super Netball Recap", "Formular 1 Grand Prix Desk"]
      }
    ]
  },
  {
    id: "triplem-sydney",
    name: "Triple M Sydney 104.9 FM",
    frequency: "104.9 FM",
    location: "Sydney",
    state: "NSW",
    genre: "Rock",
    logo: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://live-radio01.mediahubaustralia.com/2TJW/mp3/",
    fallbackStream: "https://live-radio01.mediahubaustralia.com/2TJW/mp3/",
    description: "The home of classic rock, hard rock anthems, hilarious comedy, and Aussie NRL sports coverage.",
    listeners: "350K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "Mick & MG in the Morning",
        host: "Mick Molloy & Mark Geyer",
        isCurrent: true,
        progress: 70,
        description: "Sydney's funniest rock morning show featuring NRL legends, AC/DC, Cold Chisel, Foo Fighters, and hilarious pranks.",
        highlights: ["MG's NRL Tackle", "Rock Trivia Quiz", "Mick's Rant"]
      },
      {
        time: "09:00 - 12:00",
        title: "Workday Rock Anthem Hours",
        host: "Cat Lynch",
        isCurrent: false,
        progress: 0,
        description: "Non-stop commercial free rock blocks featuring Guns N' Roses, Nirvana, Led Zeppelin, and Pearl Jam.",
        highlights: ["No Repeat Guarantee", "Aussie Rock Hour"]
      },
      {
        time: "12:00 - 15:00",
        title: "The Rush Hour with Leisel Jones",
        host: "Leisel Jones & Liam Flanagan",
        isCurrent: false,
        progress: 0,
        description: "Rocking your lunch break with Aussie sporting commentary, comedy sketches, and stadium anthems.",
        highlights: ["Olympic Gold Memories", "Rock Quiz"]
      },
      {
        time: "15:00 - 18:00",
        title: "Triple M Drive with Marty Sheargold",
        host: "Marty Sheargold",
        isCurrent: false,
        progress: 0,
        description: "Australia's sharpest comedy mind bringing laughs and classic rock during the drive home.",
        highlights: ["Marty's Mailbag", "Daily Laugh"]
      }
    ]
  },
  {
    id: "smooth-fm",
    name: "Smooth FM 95.3",
    frequency: "95.3 FM",
    location: "Sydney",
    state: "NSW",
    genre: "Pop & Hits",
    logo: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://sbs-ice.streamguys1.com/sbs-chill",
    fallbackStream: "https://sbs-ice.streamguys1.com/sbs-chill",
    description: "Sydney's feel-good station playing easy listening hits from Michael Bublé, Adele, George Michael, and Elton John.",
    listeners: "380K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "More Music Breakfast with Bogart & Glenn",
        host: "Bogart Torelli & Glenn Daniel",
        isCurrent: true,
        progress: 45,
        description: "Relaxed, stress-free morning music, positive Sydney news, weather, and smooth classics.",
        highlights: ["Feel Good Hit of the Morning", "Sydney Weather & Traffic"]
      },
      {
        time: "09:00 - 13:00",
        title: "Smooth Workday Relaxation",
        host: "Ty Frost",
        isCurrent: false,
        progress: 0,
        description: "Continuous soft AC hits, Fleetwood Mac, Whitney Houston, Lionel Richie, and Phil Collins.",
        highlights: ["Smooth Melodies", "Artist Spotlight"]
      },
      {
        time: "13:00 - 17:00",
        title: "Afternoons with Byron Webb",
        host: "Byron Webb",
        isCurrent: false,
        progress: 0,
        description: "Gentle afternoon tunes designed to keep your work stress-free.",
        highlights: ["Unwind at 4", "Love Songs Hour"]
      },
      {
        time: "17:00 - 20:00",
        title: "Smooth Drive Home",
        host: "Richard Wilkins",
        isCurrent: false,
        progress: 0,
        description: "Legendary entertainment personality Richard Wilkins hosting timeless tracks and Hollywood gossip.",
        highlights: ["Hollywood Buzz", "Evening Romance Classics"]
      }
    ]
  },
  {
    id: "gold-1043",
    name: "Gold 104.3 Melbourne",
    frequency: "101.9 FM / 104.3 FM",
    location: "Melbourne",
    state: "VIC",
    genre: "Pop & Hits",
    logo: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&auto=format&fit=crop&q=80",
    streamUrl: "https://pbs-stream.radiojar.com/pbs-mp3",
    fallbackStream: "https://pbs-stream.radiojar.com/pbs-mp3",
    description: "Melbourne's #1 radio station playing the best classic hits from the 80s, 90s, and 2000s.",
    listeners: "420K Listening Live",
    bitrate: "320 kbps HD",
    schedule: [
      {
        time: "06:00 - 09:00",
        title: "The Christian O'Connell Show",
        host: "Christian O'Connell, Jack Post & Patsy",
        isCurrent: true,
        progress: 85,
        description: "Melbourne's award-winning morning show packed with heartwarming listener stories, 80s anthems, and comedy.",
        highlights: ["Christian's Daily Wall of Fame", "80s @ 8", "Jack's Tech News"]
      },
      {
        time: "09:00 - 12:00",
        title: "104 Minutes Non-Stop 80s & 90s",
        host: "Toni Tenaglia",
        isCurrent: false,
        progress: 0,
        description: "The biggest hits from Michael Jackson, Queen, INXS, Madonna, and U2 without interruption.",
        highlights: ["80s Flashback", "Melbourne Nostalgia"]
      },
      {
        time: "12:00 - 15:00",
        title: "Gold Workday Vault",
        host: "Craig Huggins",
        isCurrent: false,
        progress: 0,
        description: "30 years of radio history with Melbourne's favorite radio veteran Craig Huggins.",
        highlights: ["Vinyl Request", "Classic Concert Memories"]
      },
      {
        time: "15:00 - 18:00",
        title: "The Drive Home Gold Hits",
        host: "Dave Higgins",
        isCurrent: false,
        progress: 0,
        description: "Cruising home with 90s classic rock, pop anthems, and traffic updates.",
        highlights: ["5pm Hit List", "Melbourne Traffic Desk"]
      }
    ]
  }
];

export const AustralianStates = ["All Australia", "NSW", "VIC", "QLD", "WA", "SA", "ACT", "TAS"];

export const RadioGenres = ["All Genres", "News & Talk", "Pop & Hits", "Rock", "Classical", "Country", "Community"];
