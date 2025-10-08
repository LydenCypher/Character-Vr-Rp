import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Music, Video, Mic2, User, Settings, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { path: '/characters', label: 'Characters', icon: MessageSquare },
    { path: '/music', label: 'Music AI', icon: Music },
    { path: '/videos', label: 'Videos', icon: Video },
    { path: '/studio', label: 'Studio', icon: Mic2 }
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="logo-icon">F</div>
        <span className="logo-text">Fusion AI</span>
      </Link>
      
      <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="navbar-actions">
        <div className="user-menu-wrapper">
          <button 
            className="user-avatar-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="User"
              className="user-avatar"
            />
          </button>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                <User size={16} />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                <Settings size={16} />
                <span>Settings</span>
              </Link>
            </div>
          )}
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;