import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Send, 
  ArrowLeft, 
  Settings, 
  Mic, 
  Video,
  MoreVertical,
  Brain,
  MessageCircle,
  User,
  Bot
} from 'lucide-react';
import axios from 'axios';
import PersonaSelector from './PersonaSelector';

const Chat = () => {
  const { conversationId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [character, setCharacter] = useState(null);
  const [aiProviders, setAiProviders] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedMode, setSelectedMode] = useState('casual');
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4.1');
  const [selectedPersona, setSelectedPersona] = useState(null);
  const messagesEndRef = useRef(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    fetchConversationData();
    fetchMessages();
    fetchAiProviders();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversationData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/conversations/${user.user_id}`);
      const conv = response.data.conversations.find(c => c.conversation_id === conversationId);
      
      if (conv) {
        setConversation(conv);
        setSelectedMode(conv.mode || 'casual');
        setSelectedProvider(conv.ai_provider || 'openai');
        setSelectedModel(conv.ai_model || 'gpt-4.1');
        
        // Fetch character data
        const characterResponse = await axios.get(`${backendUrl}/api/characters/${conv.character_id}`);
        setCharacter(characterResponse.data);
      }
    } catch (error) {
      console.error('Error fetching conversation data:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/conversations/${conversationId}/messages`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiProviders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/ai-providers`);
      setAiProviders(response.data.providers);
    } catch (error) {
      console.error('Error fetching AI providers:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      const response = await axios.post(`${backendUrl}/api/chat`, {
        conversation_id: conversationId,
        message: messageText,
        ai_provider: selectedProvider,
        ai_model: selectedModel,
        persona_id: selectedPersona?.persona_id
      }, {
        headers: {
          'X-Session-ID': localStorage.getItem('session_id') || ''
        }
      });

      setMessages(prev => [...prev, response.data.user_message, response.data.ai_response]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const updateAiSettings = async () => {
    try {
      await axios.put(`${backendUrl}/api/conversations/${conversationId}/ai-settings`, {
        ai_provider: selectedProvider,
        ai_model: selectedModel
      });
      setShowSettings(false);
    } catch (error) {
      console.error('Error updating AI settings:', error);
      alert('Error updating AI settings. Please try again.');
    }
  };

  const chatModes = [
    { id: 'casual', name: 'Casual', description: 'Natural conversation' },
    { id: 'rp', name: 'Roleplay', description: 'Creative storytelling' },
    { id: 'rpg', name: 'RPG', description: 'Interactive game-like experience' }
  ];

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!conversation || !character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Conversation not found
          </h2>
          <Link
            to="/"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            
            <div className="flex items-center space-x-3">
              {character.avatar ? (
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {character.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {character.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedProvider} • {selectedModel}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Persona Selector */}
            <PersonaSelector
              selectedPersona={selectedPersona}
              onPersonaChange={setSelectedPersona}
              className="mr-4"
            />
            
            {/* Chat Mode Selector */}
            <div className="chat-mode-selector">
              {chatModes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`chat-mode-btn ${selectedMode === mode.id ? 'active' : ''}`}
                  title={mode.description}
                >
                  {mode.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">AI Settings</h3>
            <div className="ai-provider-grid">
              {aiProviders.filter(p => p.available).map(provider => (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`ai-provider-card ${selectedProvider === provider.id ? 'selected' : ''}`}
                >
                  <Brain className="w-6 h-6 mb-2 mx-auto" />
                  <div className="font-medium">{provider.name}</div>
                </div>
              ))}
            </div>
            
            {selectedProvider && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-600 dark:text-white"
                >
                  {aiProviders.find(p => p.id === selectedProvider)?.models.map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="mt-4 flex space-x-2">
              <button
                onClick={updateAiSettings}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Apply Settings
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 chat-container">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Start a conversation with {character.name}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.message_id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`message-bubble ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-dark-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  } p-4 rounded-lg shadow-sm`}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender === 'character' && (
                      <div className="flex-shrink-0">
                        {character.avatar ? (
                          <img
                            src={character.avatar}
                            alt={character.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === 'user' ? (
                          <div className="flex items-center space-x-2">
                            {selectedPersona ? (
                              <>
                                {selectedPersona.avatar ? (
                                  <img
                                    src={selectedPersona.avatar}
                                    alt={selectedPersona.name}
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">
                                      {selectedPersona.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <span className="text-sm font-medium">{selectedPersona.name}</span>
                              </>
                            ) : (
                              <>
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">You</span>
                              </>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm font-medium">{character.name}</span>
                        )}
                        <span className="text-xs opacity-75">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {sending && (
            <div className="flex justify-start">
              <div className="message-bubble bg-white dark:bg-dark-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder={`Message ${character.name}...`}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-white resize-none"
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Voice Message (Coming Soon)"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Video Chat (Coming Soon)"
              >
                <Video className="w-5 h-5" />
              </button>
              
              <button
                type="submit"
                disabled={!newMessage.trim() || sending}
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;