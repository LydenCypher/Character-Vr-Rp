// Mock data for the fusion app

export const mockCharacters = [
  {
    id: 1,
    name: "Luna the Mystic",
    tagline: "Mystical fortune teller with ancient wisdom",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    category: "Fantasy",
    conversations: 125000,
    greeting: "Greetings, traveler. The stars have foretold your arrival..."
  },
  {
    id: 2,
    name: "Tech Guru Max",
    tagline: "AI expert and futuristic tech enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Technology",
    conversations: 98000,
    greeting: "Hey! Ready to dive into the future of tech?"
  },
  {
    id: 3,
    name: "Aria Songbird",
    tagline: "Pop star with a passion for music",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    category: "Music",
    conversations: 156000,
    greeting: "Hey there! Want to talk about music, life, or maybe write a song together?"
  },
  {
    id: 4,
    name: "Dr. Nova",
    tagline: "Brilliant scientist exploring the cosmos",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    category: "Science",
    conversations: 87000,
    greeting: "Hello! The universe is full of mysteries. What shall we explore today?"
  },
  {
    id: 5,
    name: "Raven Shadowheart",
    tagline: "Gothic poet with a dark romantic soul",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    category: "Creative",
    conversations: 142000,
    greeting: "In the depths of night, I find my muse. Care to join me in the shadows?"
  },
  {
    id: 6,
    name: "Captain Steele",
    tagline: "Space commander from the year 2847",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    category: "Sci-Fi",
    conversations: 103000,
    greeting: "Commander on deck. What's your mission today, recruit?"
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
    duration: "10:24"
  },
  {
    id: 2,
    title: "Character AI Explained",
    channel: "TechVision",
    views: "850K",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    youtubeId: "jNQXAC9IVRw",
    duration: "8:15"
  },
  {
    id: 3,
    title: "Creating Music with AI",
    channel: "FutureSound",
    views: "2.1M",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
    youtubeId: "9bZkp7q19f0",
    duration: "12:45"
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
  }
];