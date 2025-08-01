import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Upload, Brain, MessageCircle, Settings } from 'lucide-react';
import axios from 'axios';

const CharacterCreator = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiProviders, setAiProviders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    personality: '',
    avatar: '',
    ai_provider: 'openai',
    ai_model: 'gpt-4.1',
    system_prompt: '',
    is_nsfw: false
  });

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    fetchAiProviders();
  }, []);

  const fetchAiProviders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/ai-providers`);
      setAiProviders(response.data.providers);
      
      // Set default provider and model
      const defaultProvider = response.data.providers.find(p => p.available);
      if (defaultProvider) {
        setFormData(prev => ({
          ...prev,
          ai_provider: defaultProvider.id,
          ai_model: defaultProvider.default_model
        }));
      }
    } catch (error) {
      console.error('Error fetching AI providers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProviderChange = (e) => {
    const providerId = e.target.value;
    const provider = aiProviders.find(p => p.id === providerId);
    
    setFormData(prev => ({
      ...prev,
      ai_provider: providerId,
      ai_model: provider ? provider.default_model : prev.ai_model
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
      const response = await axios.post(`${backendUrl}/api/characters`, formData, {
        params: { user_id: user.user_id }
      });

      if (response.data.character_id) {
        alert('Character created successfully!');
        // Reset form
        setFormData({
          name: '',
          description: '',
          personality: '',
          avatar: '',
          ai_provider: 'openai',
          ai_model: 'gpt-4.1',
          system_prompt: '',
          is_nsfw: false
        });
      }
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Error creating character. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedProvider = aiProviders.find(p => p.id === formData.ai_provider);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create AI Character
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Design your perfect AI companion with custom personality and appearance
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Character Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                    placeholder="Enter character name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                    placeholder="Brief description of your character"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Personality *
                  </label>
                  <textarea
                    name="personality"
                    value={formData.personality}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                    placeholder="Describe the character's personality traits, mannerisms, and behavior"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Avatar Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.avatar && (
                      <img
                        src={formData.avatar}
                        alt="Character avatar"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <label className="cursor-pointer bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
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

            {/* AI Configuration */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI Configuration
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    AI Provider *
                  </label>
                  <select
                    name="ai_provider"
                    value={formData.ai_provider}
                    onChange={handleProviderChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                  >
                    {aiProviders.map(provider => (
                      <option 
                        key={provider.id} 
                        value={provider.id}
                        disabled={!provider.available}
                      >
                        {provider.name} {!provider.available && '(Not Available)'}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProvider && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      AI Model *
                    </label>
                    <select
                      name="ai_model"
                      value={formData.ai_model}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                    >
                      {selectedProvider.models.map(model => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    System Prompt
                  </label>
                  <textarea
                    name="system_prompt"
                    value={formData.system_prompt}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white"
                    placeholder="Additional instructions for the AI character (optional)"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    This will be combined with the character's personality to create the final system prompt
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Advanced Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <label className="nsfw-toggle">
                    <input
                      type="checkbox"
                      name="is_nsfw"
                      checked={formData.is_nsfw}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      NSFW Content
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Allow mature/adult content in conversations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Create Character</span>
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

export default CharacterCreator;