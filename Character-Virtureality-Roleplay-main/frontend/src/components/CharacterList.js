import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Filter, Users, MessageCircle } from 'lucide-react';
import axios from 'axios';

const CharacterList = () => {
  const { user } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNSFW, setFilterNSFW] = useState(false);
  const [filterProvider, setFilterProvider] = useState('all');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/characters?limit=50`);
      setCharacters(response.data.characters);
    } catch (error) {
      console.error('Error fetching characters:', error);
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
        params: { user_id: user.user_id }
      });

      if (response.data.conversation_id) {
        window.location.href = `/chat/${response.data.conversation_id}`;
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNSFW = !filterNSFW || character.is_nsfw;
    const matchesProvider = filterProvider === 'all' || character.ai_provider === filterProvider;
    
    return matchesSearch && matchesNSFW && matchesProvider;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading characters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Characters
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Discover and chat with AI characters
            </p>
          </div>
          <Link
            to="/create-character"
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Character</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search characters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterProvider}
                  onChange={(e) => setFilterProvider(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                >
                  <option value="all">All Providers</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="gemini">Gemini</option>
                </select>
              </div>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterNSFW}
                  onChange={(e) => setFilterNSFW(e.target.checked)}
                  className="w-5 h-5 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">NSFW Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">
              No characters found
            </h2>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Be the first to create a character!'}
            </p>
            <Link
              to="/create-character"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Character</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <div
                key={character.character_id}
                className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary-500"
                onClick={() => startNewConversation(character.character_id)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  {character.avatar ? (
                    <img
                      src={character.avatar}
                      alt={character.name}
                      className="character-avatar"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-lg">
                        {character.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {character.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {character.ai_provider} • {character.ai_model}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                  {character.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {character.is_nsfw && (
                      <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                        NSFW
                      </span>
                    )}
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
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
  );
};

export default CharacterList;