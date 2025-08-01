import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Save, Upload, User, ArrowLeft, Crown } from 'lucide-react';
import axios from 'axios';

const PersonaCreator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { personaId } = useParams(); // For editing existing persona
  const isEditing = Boolean(personaId);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personality_traits: '',
    avatar: '',
    preferences: {},
    is_default: false
  });

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    if (isEditing) {
      fetchPersona();
    }
  }, [personaId]);

  const fetchPersona = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/personas/${personaId}`, {
        headers: {
          'X-Session-ID': localStorage.getItem('session_id') || ''
        }
      });
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching persona:', error);
      navigate('/personas');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await axios.put(`${backendUrl}/api/personas/${personaId}`, formData, {
          headers: {
            'X-Session-ID': localStorage.getItem('session_id') || ''
          }
        });
        alert('Persona updated successfully!');
      } else {
        await axios.post(`${backendUrl}/api/personas`, formData, {
          headers: {
            'X-Session-ID': localStorage.getItem('session_id') || ''
          }
        });
        alert('Persona created successfully!');
      }
      navigate('/personas');
    } catch (error) {
      console.error('Error saving persona:', error);
      alert('Error saving persona. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => navigate('/personas')}
                className="mr-4 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent" style={{fontFamily: 'Orbitron, monospace'}}>
                {isEditing ? 'Edit Persona' : 'Create New Persona'}
              </h1>
            </div>
            <p className="text-gray-300">
              {isEditing ? 'Update your persona details' : 'Create a new persona to represent yourself in conversations'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Persona Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Enter persona name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Brief description of your persona"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Personality Traits *
                  </label>
                  <textarea
                    name="personality_traits"
                    value={formData.personality_traits}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Describe the personality traits (e.g., adventurous, curious, friendly, optimistic)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Avatar Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.avatar && (
                      <img
                        src={formData.avatar}
                        alt="Persona avatar"
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30"
                      />
                    )}
                    <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="is_default"
                    checked={formData.is_default}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 border-gray-600 rounded focus:ring-purple-500 bg-gray-800"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-300">
                      Set as Default Persona
                    </span>
                    <p className="text-xs text-gray-500">
                      This persona will be used by default in conversations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => navigate('/personas')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>{isEditing ? 'Update Persona' : 'Create Persona'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonaCreator;