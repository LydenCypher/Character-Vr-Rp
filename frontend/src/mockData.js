// Mock data for the fusion app

export const mockCharacters = [
  {
    id: 1,
    name: "Luna the Mystic",
    tagline: "Mystical fortune teller with ancient wisdom",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    category: "Fantasy",
    conversations: 125000,
    greeting: "Greetings, traveler. The stars have foretold your arrival...",
    description: "Luna is a mystical seer who can read the cosmos and guide you through life's mysteries."
  },
  {
    id: 2,
    name: "Tech Guru Max",
    tagline: "AI expert and futuristic tech enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Technology",
    conversations: 98000,
    greeting: "Hey! Ready to dive into the future of tech?",
    description: "Max is your go-to guide for everything tech, AI, and the digital future."
  },
  {
    id: 3,
    name: "Aria Songbird",
    tagline: "Pop star with a passion for music",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    category: "Music",
    conversations: 156000,
    greeting: "Hey there! Want to talk about music, life, or maybe write a song together?",
    description: "Aria is a talented musician who loves to collaborate and inspire through music."
  },
  {
    id: 4,
    name: "Dr. Nova",
    tagline: "Brilliant scientist exploring the cosmos",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    category: "Science",
    conversations: 87000,
    greeting: "Hello! The universe is full of mysteries. What shall we explore today?",
    description: "Dr. Nova is a passionate astrophysicist dedicated to unraveling the secrets of the universe."
  },
  {
    id: 5,
    name: "Raven Shadowheart",
    tagline: "Gothic poet with a dark romantic soul",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    category: "Creative",
    conversations: 142000,
    greeting: "In the depths of night, I find my muse. Care to join me in the shadows?",
    description: "Raven weaves words into dark poetry and explores the beauty in melancholy."
  },
  {
    id: 6,
    name: "Captain Steele",
    tagline: "Space commander from the year 2847",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    category: "Sci-Fi",
    conversations: 103000,
    greeting: "Commander on deck. What's your mission today, recruit?",
    description: "Captain Steele leads deep space missions and protects the galaxy from cosmic threats."
  },
  {
    id: 7,
    name: "Sakura Tanaka",
    tagline: "Japanese anime artist and storyteller",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    category: "Creative",
    conversations: 94000,
    greeting: "Konnichiwa! Let's create something beautiful together!",
    description: "Sakura brings anime and manga to life through her creative storytelling and art."
  },
  {
    id: 8,
    name: "Professor Atlas",
    tagline: "History expert and world traveler",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    category: "Education",
    conversations: 76000,
    greeting: "Welcome! History has so many fascinating stories to share.",
    description: "Professor Atlas has traveled the world studying ancient civilizations and cultures."
  },
  {
    id: 9,
    name: "Zara Phoenix",
    tagline: "Fitness coach and wellness guru",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    category: "Lifestyle",
    conversations: 112000,
    greeting: "Hey champion! Ready to level up your fitness journey?",
    description: "Zara motivates and guides you towards a healthier, stronger version of yourself."
  },
  {
    id: 10,
    name: "Chef Marco",
    tagline: "Master chef with culinary secrets",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    category: "Lifestyle",
    conversations: 89000,
    greeting: "Buongiorno! Let's cook up something magnificent today!",
    description: "Chef Marco shares Italian cuisine secrets and teaches you to cook like a pro."
  },
  {
    id: 11,
    name: "Kai Surfer",
    tagline: "Beach lover and adventure seeker",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    category: "Adventure",
    conversations: 67000,
    greeting: "Yo! The waves are calling. You ready for an adventure?",
    description: "Kai lives for the ocean and adventure, sharing stories from around the world."
  },
  {
    id: 12,
    name: "Emma Bookworm",
    tagline: "Literary critic and book enthusiast",
    avatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=400&fit=crop",
    category: "Education",
    conversations: 58000,
    greeting: "Hello fellow reader! What book shall we discuss today?",
    description: "Emma lives and breathes literature, always ready to recommend the perfect book."
  }
];

export const mockMessages = {
  1: [
    { sender: "character", text: "Greetings, traveler. The stars have foretold your arrival...", timestamp: "10:30 AM" },
    { sender: "user", text: "Hello Luna! Can you tell me about my future?", timestamp: "10:31 AM" },
    { sender: "character", text: "Ah, I sense great curiosity within you. The cards reveal a journey of discovery ahead...", timestamp: "10:32 AM" }
  ]
};

export const mockMusicTracks = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "AI Generated",
    genre: "Electronic",
    duration: "3:24",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce0b13b1e?w=400&h=400&fit=crop",
    prompt: "Upbeat electronic music with synthwave vibes",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Midnight Jazz",
    artist: "Suno AI",
    genre: "Jazz",
    duration: "4:15",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    prompt: "Smooth jazz with saxophone and piano",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Epic Adventure",
    artist: "AI Studio",
    genre: "Orchestral",
    duration: "5:30",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop",
    prompt: "Cinematic orchestral music for epic moments",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Chill Vibes",
    artist: "AI Generated",
    genre: "Ambient",
    duration: "4:45",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    prompt: "Relaxing ambient music for studying",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Rock Anthem",
    artist: "AI Studio",
    genre: "Rock",
    duration: "3:58",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
    prompt: "Energetic rock music with electric guitar",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

export const mockVideos = [
  {
    id: 1,
    title: "AI Music Creation Tutorial",
    channel: "MusicTech",
    views: "1.2M",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "10:24",
    category: "Tutorial"
  },
  {
    id: 2,
    title: "Character AI Explained",
    channel: "TechVision",
    views: "850K",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    youtubeId: "jNQXAC9IVRw",
    duration: "8:15",
    category: "Education"
  },
  {
    id: 3,
    title: "Creating Music with AI",
    channel: "FutureSound",
    views: "2.1M",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
    youtubeId: "9bZkp7q19f0",
    duration: "12:45",
    category: "Tutorial"
  },
  {
    id: 4,
    title: "Best AI Tools 2025",
    channel: "TechDaily",
    views: "3.5M",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:32",
    category: "Review"
  },
  {
    id: 5,
    title: "Music Production Basics",
    channel: "StudioPro",
    views: "920K",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
    youtubeId: "jNQXAC9IVRw",
    duration: "18:20",
    category: "Tutorial"
  },
  {
    id: 6,
    title: "AI Art Generation Guide",
    channel: "CreativeAI",
    views: "1.8M",
    thumbnail: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&h=300&fit=crop",
    youtubeId: "9bZkp7q19f0",
    duration: "14:10",
    category: "Tutorial"
  }
];

export const mockProjects = [
  {
    id: 1,
    name: "Summer Vibes Mix",
    tracks: 8,
    duration: "24:30",
    lastModified: "2 hours ago",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Lo-Fi Study Session",
    tracks: 12,
    duration: "45:20",
    lastModified: "1 day ago",
    cover: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Electronic Beats",
    tracks: 6,
    duration: "18:45",
    lastModified: "3 days ago",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce0b13b1e?w=400&h=400&fit=crop"
  }
];

export const mockRecentActivity = [
  {
    id: 1,
    type: "chat",
    title: "Chatted with Luna the Mystic",
    timestamp: "2 hours ago",
    icon: "message"
  },
  {
    id: 2,
    type: "music",
    title: "Generated 'Neon Dreams'",
    timestamp: "5 hours ago",
    icon: "music"
  },
  {
    id: 3,
    type: "video",
    title: "Watched 'AI Music Tutorial'",
    timestamp: "1 day ago",
    icon: "video"
  },
  {
    id: 4,
    type: "studio",
    title: "Created 'Summer Vibes Mix'",
    timestamp: "2 days ago",
    icon: "studio"
  }
];