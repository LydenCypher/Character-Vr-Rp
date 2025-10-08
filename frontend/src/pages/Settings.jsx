import React, { useState } from 'react';
import { Bell, Lock, Palette, Globe, User, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import { toast } from '../hooks/use-toast';
import './Settings.css';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSave = () => {
    toast({
      title: "Settings Saved! ✅",
      description: "Your preferences have been updated.",
    });
  };

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      settings: [
        { label: 'Email', value: 'alex@example.com', type: 'text' },
        { label: 'Username', value: '@alexthompson', type: 'text' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { label: 'Push Notifications', value: notifications, type: 'toggle', onChange: setNotifications },
        { label: 'Email Updates', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        { label: 'Dark Mode', value: darkMode, type: 'toggle', onChange: setDarkMode },
        { label: 'Theme Color', value: 'purple', type: 'select', options: ['purple', 'blue', 'green'] }
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      settings: [
        { label: 'Profile Visibility', value: 'public', type: 'select', options: ['public', 'private'] },
        { label: 'Show Activity', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Language',
      icon: Globe,
      settings: [
        { label: 'Language', value: language, type: 'select', options: ['en', 'es', 'fr', 'de', 'ja'], onChange: setLanguage }
      ]
    }
  ];

  return (
    <div className="settings-page">
      <Navbar />
      
      <div className="settings-container">
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account and preferences</p>
        </div>

        <div className="settings-content">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="settings-section">
                <div className="section-title">
                  <Icon size={20} />
                  <h2>{section.title}</h2>
                </div>

                <div className="settings-list">
                  {section.settings.map((setting, idx) => (
                    <div key={idx} className="setting-item">
                      <div className="setting-label">{setting.label}</div>
                      <div className="setting-control">
                        {setting.type === 'text' && (
                          <input
                            type="text"
                            value={setting.value}
                            className="setting-input"
                            readOnly
                          />
                        )}
                        {setting.type === 'toggle' && (
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={setting.value}
                              onChange={(e) => setting.onChange && setting.onChange(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        )}
                        {setting.type === 'select' && (
                          <select
                            value={setting.value}
                            onChange={(e) => setting.onChange && setting.onChange(e.target.value)}
                            className="setting-select"
                          >
                            {setting.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="settings-actions">
            <button onClick={handleSave} className="save-settings-btn">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;