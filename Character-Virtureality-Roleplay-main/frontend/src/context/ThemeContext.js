import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [customTheme, setCustomTheme] = useState({
    primary: '#d946ef',
    secondary: '#0ea5e9',
    background: '#f8fafc',
    text: '#1e293b'
  });

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedCustomTheme = localStorage.getItem('customTheme');
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (savedCustomTheme) {
      setCustomTheme(JSON.parse(savedCustomTheme));
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply custom theme colors
    root.style.setProperty('--color-primary', customTheme.primary);
    root.style.setProperty('--color-secondary', customTheme.secondary);
    root.style.setProperty('--color-background', customTheme.background);
    root.style.setProperty('--color-text', customTheme.text);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
  }, [theme, customTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const applyTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const updateCustomTheme = (newCustomTheme) => {
    setCustomTheme(prev => ({ ...prev, ...newCustomTheme }));
  };

  const resetTheme = () => {
    setTheme('light');
    setCustomTheme({
      primary: '#d946ef',
      secondary: '#0ea5e9',
      background: '#f8fafc',
      text: '#1e293b'
    });
  };

  const value = {
    theme,
    customTheme,
    toggleTheme,
    applyTheme,
    updateCustomTheme,
    resetTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};