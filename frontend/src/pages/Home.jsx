import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Music, Video, Mic2, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Characters',
      description: 'Chat with intelligent AI characters in immersive worlds',
      link: '/characters',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: Music,
      title: 'Music AI',
      description: 'Generate music from text prompts with advanced AI',
      link: '/music',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: Video,
      title: 'Video Hub',
      description: 'Discover and watch AI-generated content',
      link: '/videos',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: Mic2,
      title: 'Music Studio',
      description: 'Create and collaborate on music projects',
      link: '/studio',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  return (
    <div className="home-page">
      <Navbar />
      
      <div className="hero-section">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>The Ultimate AI Creative Platform</span>
          </div>
          
          <h1 className="hero-title">
            Create, Chat, and
            <span className="gradient-text"> Collaborate</span>
            <br />
            with AI
          </h1>
          
          <p className="hero-description">
            Experience the fusion of AI character chat, music generation, 
            video content, and music production all in one powerful platform.
          </p>
          
          <div className="hero-buttons">
            <Link to="/characters" className="btn-primary">
              Get Started
              <ArrowRight size={18} />
            </Link>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="feature-card"
              >
                <div className="feature-icon" style={{ background: feature.gradient }}>
                  <Icon size={28} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">
                  <ArrowRight size={20} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">10M+</div>
          <div className="stat-label">Conversations</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500K+</div>
          <div className="stat-label">Songs Generated</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1M+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Available</div>
        </div>
      </div>
    </div>
  );
};

export default Home;