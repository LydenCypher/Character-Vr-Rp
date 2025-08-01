import React, { useState, useEffect } from 'react';
import { User, ChevronDown, Crown } from 'lucide-react';
import axios from 'axios';

const PersonaSelector = ({ selectedPersona, onPersonaChange, className = '' }) => {
  const [personas, setPersonas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      
      // If no persona is selected, select the default one
      if (!selectedPersona && response.data.personas.length > 0) {
        const defaultPersona = response.data.personas.find(p => p.is_default) || response.data.personas[0];
        onPersonaChange(defaultPersona);
      }
    } catch (error) {
      console.error('Error fetching personas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonaSelect = (persona) => {
    onPersonaChange(persona);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-600">
          <div className="w-6 h-6 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-500/50 transition-colors"
      >
        {selectedPersona ? (
          <>
            {selectedPersona.avatar ? (
              <img
                src={selectedPersona.avatar}
                alt={selectedPersona.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {selectedPersona.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-white text-sm font-medium max-w-24 truncate">
              {selectedPersona.name}
            </span>
            {selectedPersona.is_default && (
              <Crown className="w-3 h-3 text-yellow-400" />
            )}
          </>
        ) : (
          <>
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-gray-400 text-sm">Select Persona</span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
            {personas.map((persona) => (
              <button
                key={persona.persona_id}
                onClick={() => handlePersonaSelect(persona)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0 ${
                  selectedPersona?.persona_id === persona.persona_id ? 'bg-gray-700' : ''
                }`}
              >
                {persona.avatar ? (
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {persona.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-medium truncate">
                      {persona.name}
                    </p>
                    {persona.is_default && (
                      <Crown className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-400 text-xs truncate">
                    {persona.personality_traits}
                  </p>
                </div>
              </button>
            ))}
            
            {personas.length === 0 && (
              <div className="px-4 py-3 text-gray-400 text-sm text-center">
                No personas found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonaSelector;