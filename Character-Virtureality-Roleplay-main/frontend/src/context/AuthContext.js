import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing session
        const sessionId = localStorage.getItem('session_id');
        const savedUser = localStorage.getItem('user');

        if (sessionId && savedUser) {
          // Verify session is still valid
          try {
            const response = await axios.get(`${backendUrl}/api/users/me`, {
              headers: {
                'X-Session-ID': sessionId
              }
            });
            
            if (response.data) {
              setUser(JSON.parse(savedUser));
            } else {
              // Session invalid, clear storage
              localStorage.removeItem('session_id');
              localStorage.removeItem('user');
            }
          } catch (error) {
            // Session invalid, clear storage
            localStorage.removeItem('session_id');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [backendUrl]);

  const login = async (username, email) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users`, {
        username,
        email
      });
      
      const userData = {
        user_id: response.data.user_id,
        username,
        email
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      if (error.response?.status === 400) {
        // User already exists, try to get user data
        try {
          const existingUsers = await axios.get(`${backendUrl}/api/users`);
          const existingUser = existingUsers.data.find(u => u.email === email);
          if (existingUser) {
            const userData = {
              user_id: existingUser.user_id,
              username: existingUser.username,
              email: existingUser.email
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
          }
        } catch (getError) {
          console.error('Error fetching existing user:', getError);
        }
      }
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('session_id');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    setUser // Export setUser for use in AuthCallback
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};