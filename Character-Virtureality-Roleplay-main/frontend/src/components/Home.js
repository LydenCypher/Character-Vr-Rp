import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MessageCircle, 
  Plus, 
  Users, 
  Zap, 
  Brain, 
  Globe, 
  Heart,
  Glasses,
  Gamepad2,
  Sparkles,
  Crown,
  Shield,
  Headphones
} from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const [recentConversations, setRecentConversations] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [multiplayerRooms, setMultiplayerRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [conversationsRes, charactersRes, roomsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/conversations/${user.user_id}`),
        axios.get(`${backendUrl}/api/characters?limit=8`),
        axios.get(`${backendUrl}/api/rooms?limit=6`)
      ]);

      setRecentConversations((conversationsRes.data?.conversations || []).slice(0, 5));
      setCharacters(charactersRes.data?.characters || []);
      setMultiplayerRooms(roomsRes.data?.rooms || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewConversation = async (characterId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/conversations`, {
        character_id: characterId,
        title: `New Chat`,
        mode: 'casual',
        is_nsfw: false
      }, {
        headers: {
          'X-Session-ID': localStorage.getItem('session_id') || ''
        }
      });

      if (response.data.conversation_id) {
        window.location.href = `/chat/${response.data.conversation_id}`;
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const joinRoom = async (roomId) => {
    try {
      await axios.post(`${backendUrl}/api/rooms/${roomId}/join`, {}, {
        headers: {
          'X-Session-ID': localStorage.getItem('session_id') || ''
        }
      });
      window.location.href = `/room/${roomId}`;
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const features = [
    {
      icon: Glasses,
      title: 'VR Experience',
      description: 'Immersive virtual reality role-playing adventures',
      color: 'text-purple-400'
    },
    {
      icon: Gamepad2,
      title: 'Multiplayer Rooms',
      description: 'Join or create multiplayer experiences with friends',
      color: 'text-blue-400'
    },
    {
      icon: Brain,
      title: 'Multi-AI Support',
      description: 'Switch between OpenAI, Anthropic Claude, and Google Gemini',
      color: 'text-green-400'
    },
    {
      icon: MessageCircle,
      title: 'Multiple Chat Modes',
      description: 'Casual, Roleplay, and RPG-style interactions',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      title: 'Character Creation',
      description: 'Create custom AI characters with unique personalities',
      color: 'text-pink-400'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Chat in any language with AI characters',
      color: 'text-indigo-400'
    },
    {
      icon: Zap,
      title: 'Real-time Chat',
      description: 'Instant responses with streaming support',
      color: 'text-cyan-400'
    },
    {
      icon: Heart,
      title: 'NSFW Support',
      description: 'Mature content support for adult conversations',
      color: 'text-red-400'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading VR World...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4" style={{fontFamily: 'Orbitron, monospace'}}>
            Welcome to Character VR RP
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Enter a virtual reality universe where you can interact with AI characters, create multiplayer experiences, and explore endless role-playing possibilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/characters"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Explore Characters</span>
            </Link>
            <Link
              to="/multiplayer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Join Multiplayer</span>
            </Link>
            <Link
              to="/create-character"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium border border-purple-500/50 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Character</span>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 hover:transform hover:scale-105">
                <div className={`${feature.color} mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Multiplayer Rooms */}
        {multiplayerRooms.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Gamepad2 className="w-6 h-6 mr-2 text-purple-400" />
                Active Multiplayer Rooms
              </h2>
              <Link
                to="/multiplayer"
                className="text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {multiplayerRooms.map((room) => (
                <div
                  key={room.room_id}
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-200 cursor-pointer"
                  onClick={() => joinRoom(room.room_id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">
                      {room?.name || 'Unnamed Room'}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">
                        {room?.participants?.length || 0}/{room?.max_participants || 10}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {room?.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-gray-400">
                        Active
                      </span>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                      Join Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Conversations */}
        {recentConversations.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-blue-400" />
              Recent Conversations
            </h2>
            <div className="space-y-3">
              {recentConversations.map((conversation) => (
                <Link
                  key={conversation.conversation_id}
                  to={`/chat/${conversation.conversation_id}`}
                  className="block p-4 rounded-lg border border-gray-600/50 hover:border-purple-500/50 transition-all duration-200 bg-gray-800/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">
                        {conversation?.title || 'Untitled Chat'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {conversation?.created_at ? new Date(conversation.created_at).toLocaleDateString() : 'Recent'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                        {conversation?.mode || 'casual'}
                      </span>
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Popular Characters */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Crown className="w-6 h-6 mr-2 text-yellow-400" />
              Popular Characters
            </h2>
            <Link
              to="/characters"
              className="text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
          
          {characters.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">
                No characters available yet.
              </p>
              <Link
                to="/create-character"
                className="text-purple-400 hover:text-purple-300 font-medium flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create the first character</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {characters.map((character) => (
                <div
                  key={character.character_id}
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-200 cursor-pointer group"
                  onClick={() => startNewConversation(character.character_id)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {character?.avatar ? (
                      <img
                        src={character.avatar}
                        alt={character?.name || 'Character'}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {character?.name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                        {character?.name || 'Unnamed Character'}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center space-x-1">
                        <Brain className="w-3 h-3" />
                        <span>{character?.ai_provider || 'Unknown'}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                    {character?.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {character.is_nsfw && (
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                          NSFW
                        </span>
                      )}
                      {character.is_multiplayer && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          MP
                        </span>
                      )}
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;