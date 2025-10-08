import React, { useState } from 'react';
import { Play, Eye, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { mockVideos } from '../mockData';
import './VideoHub.css';

const VideoHub = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tutorial', 'Education', 'Review'];

  const filteredVideos = selectedCategory === 'All' 
    ? mockVideos 
    : mockVideos.filter(v => v.category === selectedCategory);

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="video-hub-page">
      <Navbar />
      
      <div className="video-hub-container">
        <div className="video-header">
          <h1 className="video-title">Video Hub</h1>
          <p className="video-subtitle">Discover AI and music creation content</p>
        </div>

        <div className="video-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`video-category-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="videos-grid">
          {filteredVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="video-card" 
              onClick={() => openVideo(video)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="video-thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="video-overlay">
                  <Play size={48} fill="white" />
                </div>
                <div className="video-duration">{video.duration}</div>
                <div className="video-category-badge">{video.category}</div>
              </div>

              <div className="video-info">
                <h3 className="video-card-title">{video.title}</h3>
                <p className="video-channel">{video.channel}</p>
                <div className="video-views">
                  <Eye size={14} />
                  <span>{video.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close-button" onClick={closeVideo}>
              <X size={24} />
            </button>
            
            <div className="video-player-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-modal-info">
              <h2 className="video-modal-title">{selectedVideo.title}</h2>
              <div className="video-modal-meta">
                <span>{selectedVideo.channel}</span>
                <span>{selectedVideo.views} views</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoHub;