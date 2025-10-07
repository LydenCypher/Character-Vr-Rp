import React, { useState } from 'react';
import { Play, Pause, Download, Share2, Sparkles, Music } from 'lucide-react';
import Navbar from '../components/Navbar';
import { mockMusicTracks } from '../mockData';
import './MusicStudio.css';

const MusicStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('Electronic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [generatedTracks, setGeneratedTracks] = useState(mockMusicTracks);

  const genres = ['Electronic', 'Jazz', 'Rock', 'Pop', 'Classical', 'Hip Hop', 'Ambient', 'Orchestral'];

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newTrack = {
        id: generatedTracks.length + 1,
        title: prompt.slice(0, 30) || 'New Track',
        artist: 'AI Generated',
        genre: genre,
        duration: '3:' + Math.floor(Math.random() * 60).toString().padStart(2, '0'),
        cover: `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000000}?w=400&h=400&fit=crop`,
        prompt: prompt,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-' + (Math.floor(Math.random() * 10) + 1) + '.mp3'
      };
      setGeneratedTracks([newTrack, ...generatedTracks]);
      setPrompt('');
      setIsGenerating(false);
    }, 2000);
  };

  const togglePlay = (trackId) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId);
  };

  return (
    <div className="music-studio-page">
      <Navbar />
      
      <div className="music-studio-container">
        <div className="studio-header">
          <div className="header-icon">
            <Music size={32} />
          </div>
          <h1 className="studio-title">AI Music Generator</h1>
          <p className="studio-subtitle">Create music from text with advanced AI models</p>
        </div>

        <div className="generator-section">
          <div className="generator-card">
            <div className="generator-input-group">
              <label className="input-label">Describe your music</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Upbeat electronic music with synthwave vibes, perfect for a night drive..."
                className="generator-textarea"
                rows="4"
              />
            </div>

            <div className="generator-controls">
              <div className="genre-selector">
                <label className="input-label">Genre</label>
                <div className="genre-chips">
                  {genres.map(g => (
                    <button
                      key={g}
                      className={`genre-chip ${genre === g ? 'active' : ''}`}
                      onClick={() => setGenre(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="generate-button"
              >
                {isGenerating ? (
                  <>
                    <div className="spinner"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Music
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="tracks-section">
          <h2 className="section-title">Generated Tracks</h2>
          
          <div className="tracks-grid">
            {generatedTracks.map(track => (
              <div key={track.id} className="track-card">
                <div className="track-cover-wrapper">
                  <img src={track.cover} alt={track.title} className="track-cover" />
                  <button
                    onClick={() => togglePlay(track.id)}
                    className="track-play-button"
                  >
                    {currentlyPlaying === track.id ? (
                      <Pause size={24} fill="white" />
                    ) : (
                      <Play size={24} fill="white" />
                    )}
                  </button>
                </div>

                <div className="track-info">
                  <h3 className="track-title">{track.title}</h3>
                  <p className="track-artist">{track.artist}</p>
                  
                  <div className="track-meta">
                    <span className="track-genre">{track.genre}</span>
                    <span className="track-duration">{track.duration}</span>
                  </div>

                  {track.prompt && (
                    <p className="track-prompt">"{track.prompt}"</p>
                  )}

                  <div className="track-actions">
                    <button className="track-action-btn">
                      <Download size={16} />
                    </button>
                    <button className="track-action-btn">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicStudio;