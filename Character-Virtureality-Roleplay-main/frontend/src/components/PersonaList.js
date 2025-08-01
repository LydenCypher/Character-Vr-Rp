import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Edit, Trash2, User, Crown, Star } from 'lucide-react';
import axios from 'axios';

const PersonaList = () => {
  const { user } = useAuth();
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/personas`, {
        headers: {
          'X-Session-ID': localStorage.getItem('session_id') || ''
        }
      });
      setPersonas(response.data.personas);
    } catch (error) {
      console.error('Error fetching personas:', error);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultPersona = async (personaId) => {
    try {
      await axios.post(`${backendUrl}/api/personas/${personaId}/set-default`, {}, {
        headers: {
          'X-Session-ID': localStorage.getItem('session_id') || ''
        }
      });
      fetchPersonas(); // Refresh the list
    } catch (error) {
      console.error('Error setting default persona:', error);
    }
  };

  const deletePersona = async (personaId) => {
    if (personas.length <= 1) {
      alert('Cannot delete the last persona');
      return;
    }

    if (window.confirm('Are you sure you want to delete this persona?')) {
      try {
        await axios.delete(`${backendUrl}/api/personas/${personaId}`, {
          headers: {
            'X-Session-ID': localStorage.getItem('session_id') || ''
          }
        });
        fetchPersonas(); // Refresh the list
      } catch (error) {
        console.error('Error deleting persona:', error);
        alert('Error deleting persona. Please try again.');
      }
    }
  };

  const filteredPersonas = personas.filter(persona =>
    persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading personas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2" style={{fontFamily: 'Orbitron, monospace'}}>
              Your Personas
            </h1>
            <p className="text-gray-300">
              Manage your different personas for conversations
            </p>
          </div>
          <Link
            to="/create-persona"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Persona</span>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search personas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Personas Grid */}
        {filteredPersonas.length === 0 ? (
          <div className="text-center py-16">
            <User className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              No personas found
            </h2>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first persona to get started!'}
            </p>
            <Link
              to="/create-persona"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Persona</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersonas.map((persona) => (
              <div
                key={persona.persona_id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-200 shadow-xl relative"
              >
                {/* Default Badge */}
                {persona.is_default && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Crown className="w-3 h-3" />
                      <span>Default</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 mb-4">
                  {persona.avatar ? (
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {persona.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">
                      {persona.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Created {new Date(persona.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                  {persona.description}
                </p>

                <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Personality Traits:</p>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {persona.personality_traits}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    {!persona.is_default && (
                      <button
                        onClick={() => setDefaultPersona(persona.persona_id)}
                        className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center space-x-1"
                        title="Set as default"
                      >
                        <Star className="w-4 h-4" />
                        <span>Set Default</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/edit-persona/${persona.persona_id}`}
                      className="text-purple-400 hover:text-purple-300 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      title="Edit persona"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    {personas.length > 1 && (
                      <button
                        onClick={() => deletePersona(persona.persona_id)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        title="Delete persona"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaList;