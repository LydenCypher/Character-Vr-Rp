import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, MoreVertical, Image as ImageIcon, Smile } from 'lucide-react';
import { mockCharacters, mockMessages } from '../mockData';
import './ChatRoom.css';

const ChatRoom = () => {
  const { id } = useParams();
  const character = mockCharacters.find(c => c.id === parseInt(id));
  const [messages, setMessages] = useState(mockMessages[id] || [
    { sender: 'character', text: character?.greeting || 'Hello! How can I help you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's interesting! Tell me more about that.",
        "I understand. What would you like to know?",
        "Great question! Let me think about that...",
        "I'd love to help you with that!",
        "That reminds me of something fascinating...",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        sender: 'character',
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!character) {
    return <div className="chat-room">Character not found</div>;
  }

  return (
    <div className="chat-room">
      <div className="chat-header">
        <Link to="/characters" className="back-button">
          <ArrowLeft size={20} />
        </Link>
        
        <div className="chat-header-info">
          <img src={character.avatar} alt={character.name} className="chat-avatar" />
          <div>
            <h2 className="chat-character-name">{character.name}</h2>
            <p className="chat-character-status">Active now</p>
          </div>
        </div>

        <button className="chat-menu-button">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'message-user' : 'message-character'}`}
          >
            {message.sender === 'character' && (
              <img src={character.avatar} alt={character.name} className="message-avatar" />
            )}
            <div className="message-content">
              <p className="message-text">{message.text}</p>
              <span className="message-time">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-wrapper">
        <div className="chat-input-container">
          <button className="input-action-button">
            <ImageIcon size={20} />
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${character.name}...`}
            className="chat-input"
            rows="1"
          />
          
          <button className="input-action-button">
            <Smile size={20} />
          </button>
          
          <button
            onClick={handleSend}
            className="send-button"
            disabled={!inputValue.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;