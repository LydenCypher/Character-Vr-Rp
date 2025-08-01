import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import CharacterList from './components/CharacterList';
import CharacterCreator from './components/CharacterCreator';
import Chat from './components/Chat';
import Settings from './components/Settings';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';
import PersonaList from './components/PersonaList';
import PersonaCreator from './components/PersonaCreator';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100">
            <AppContent />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <main className={user ? "pt-16" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/characters" element={
            <ProtectedRoute>
              <CharacterList />
            </ProtectedRoute>
          } />
          <Route path="/create-character" element={
            <ProtectedRoute>
              <CharacterCreator />
            </ProtectedRoute>
          } />
          <Route path="/personas" element={
            <ProtectedRoute>
              <PersonaList />
            </ProtectedRoute>
          } />
          <Route path="/create-persona" element={
            <ProtectedRoute>
              <PersonaCreator />
            </ProtectedRoute>
          } />
          <Route path="/edit-persona/:personaId" element={
            <ProtectedRoute>
              <PersonaCreator />
            </ProtectedRoute>
          } />
          <Route path="/chat/:conversationId" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </>
  );
}

export default App;