import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Music, Video, Mic2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

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
      
      <div className="navbar-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <button className="navbar-btn">Sign In</button>
    </nav>
  );
};

export default Navbar;