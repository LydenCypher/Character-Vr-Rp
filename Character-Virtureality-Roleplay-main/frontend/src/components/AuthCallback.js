import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus('processing');
        
        // Get session ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id') || urlParams.get('sessionId');
        
        if (!sessionId) {
          throw new Error('No session ID found in callback');
        }

        // Call backend auth callback endpoint
        const response = await axios.post(`${backendUrl}/api/auth/callback`, {
          session_id: sessionId
        });

        if (response.data && response.data.user_id) {
          // Store session ID for future API calls
          localStorage.setItem('session_id', sessionId);
          
          // Get user data
          const userResponse = await axios.get(`${backendUrl}/api/users/me`, {
            headers: {
              'X-Session-ID': sessionId
            }
          });

          const userData = userResponse.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          
          setStatus('success');
          
          // Redirect to home page after a brief delay
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);
          
        } else {
          throw new Error('Invalid response from authentication server');
        }
        
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setError(error.response?.data?.detail || error.message || 'Authentication failed');
        
        // Redirect to login after error delay
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate, setUser, backendUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
      <div className="text-center">
        {status === 'processing' && (
          <>
            <div className="flex justify-center mb-4">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Authenticating...
            </h2>
            <p className="text-gray-300">
              Please wait while we complete your login
            </p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome to Character VR RP!
            </h2>
            <p className="text-gray-300">
              Redirecting you to the VR world...
            </p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-300 mb-4">
              {error}
            </p>
            <p className="text-sm text-gray-400">
              Redirecting back to login...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;