import React from 'react';
import { Settings, Calendar, MessageSquare, Music, Video, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import { mockRecentActivity } from '../mockData';
import './Profile.css';

const Profile = () => {
  const stats = [
    { label: 'Conversations', value: '342', icon: MessageSquare, color: '#667eea' },
    { label: 'Songs Created', value: '89', icon: Music, color: '#f093fb' },
    { label: 'Videos Watched', value: '156', icon: Video, color: '#4facfe' },
    { label: 'Achievements', value: '24', icon: Award, color: '#43e97b' }
  ];

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header-section">
          <div className="profile-avatar-wrapper">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
              alt="Profile"
              className="profile-avatar-large"
            />
            <button className="avatar-edit-btn">
              <Settings size={16} />
            </button>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">Alex Thompson</h1>
            <p className="profile-username">@alexthompson</p>
            <p className="profile-bio">
              AI enthusiast | Music lover | Creative explorer
            </p>
            <div className="profile-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>Joined January 2025</span>
              </div>
            </div>
          </div>

          <button className="edit-profile-btn">
            <Settings size={18} />
            Edit Profile
          </button>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ background: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="activity-section">
          <h2 className="section-heading">Recent Activity</h2>
          <div className="activity-list">
            {mockRecentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon activity-icon-${activity.type}`}>
                  {activity.type === 'chat' && <MessageSquare size={18} />}
                  {activity.type === 'music' && <Music size={18} />}
                  {activity.type === 'video' && <Video size={18} />}
                  {activity.type === 'studio' && <Music size={18} />}
                </div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-time">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;