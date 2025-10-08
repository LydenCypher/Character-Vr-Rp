import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, TrendingUp, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import CharacterCreateModal from '../components/CharacterCreateModal';
import { mockCharacters } from '../mockData';
import './Characters.css';

const Characters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = ['All', 'Fantasy', 'Technology', 'Music', 'Science', 'Creative', 'Sci-Fi', 'Education', 'Lifestyle', 'Adventure'];

  const filteredCharacters = mockCharacters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || character.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="characters-page">
      <Navbar />
      
      <div className="characters-container">
        <div className="characters-header">
          <div>
            <h1 className="page-title">Explore AI Characters</h1>
            <p className="page-subtitle">Chat with intelligent AI personalities in immersive worlds</p>
          </div>
          <button 
            className="create-character-btn"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={20} />
            Create Character
          </button>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="categories-section">
          {categories.map(category => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="characters-grid">
          {filteredCharacters.map((character, index) => (
            <Link
              key={character.id}
              to={`/chat/${character.id}`}
              className="character-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="character-avatar-wrapper">
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="character-avatar"
                />
                <div className="character-badge">{character.category}</div>
              </div>
              
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <p className="character-tagline">{character.tagline}</p>
                
                <div className="character-stats">
                  <div className="stat">
                    <MessageSquare size={14} />
                    <span>{(character.conversations / 1000).toFixed(0)}K chats</span>
                  </div>
                  <div className="stat trending">
                    <TrendingUp size={14} />
                    <span>Trending</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CharacterCreateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Characters;