import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Cpu, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-slate-900/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/vr-rp-logo.png" 
              alt="VR-RP Logo" 
              className="w-12 h-12 rounded-lg vr-glow group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
                VR-RP
              </h1>
              <p className="text-xs text-slate-400">Virtual Reality RP</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-sky-400 transition-colors">Home</Link>
            <Link to="/features" className="text-slate-300 hover:text-sky-400 transition-colors">Features</Link>
            <Link to="/about" className="text-slate-300 hover:text-sky-400 transition-colors">About</Link>
            <Link to="/contact" className="text-slate-300 hover:text-sky-400 transition-colors">Contact</Link>
          </div>
          
          <button className="bg-gradient-to-r from-sky-500 to-pink-500 px-6 py-2 rounded-lg font-semibold hover:from-sky-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-200">
            Launch VR-RP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className={`max-w-7xl mx-auto text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Hero Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/vr-rp-logo.png" 
              alt="VR-RP Character" 
              className="w-64 h-64 rounded-3xl vr-glow hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            VR-RP
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-slate-300 font-light">
            Virtual Reality Role-Playing Platform
          </p>
          
          <p className="text-lg md:text-xl mb-12 text-slate-400 max-w-3xl mx-auto">
            Immerse yourself in the ultimate VR experience with AI-powered characters, 
            multiplayer interactions, and endless adventures in virtual worlds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-pink-500 px-8 py-4 rounded-lg font-bold text-lg hover:from-sky-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-200 vr-glow">
              <Play className="w-5 h-5" />
              <span>Start Your Adventure</span>
            </button>
            
            <button className="flex items-center space-x-2 border-2 border-sky-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-sky-400/10 transition-all duration-200">
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            Experience the Future of RP
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-sky-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-400">AI Characters</h3>
              <p className="text-slate-300 leading-relaxed">
                Interact with intelligent AI-powered characters that remember your conversations and adapt to your play style.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-pink-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Multiplayer</h3>
              <p className="text-slate-300 leading-relaxed">
                Join friends in shared virtual spaces and create unforgettable role-playing experiences together.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-sky-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">VR Ready</h3>
              <p className="text-slate-300 leading-relaxed">
                Built from the ground up for VR, experience true immersion with haptic feedback and spatial audio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Enter the Virtual World?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join thousands of players already exploring infinite possibilities in VR-RP.
          </p>
          
          <Link 
            to="/features"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-pink-500 px-10 py-5 rounded-lg font-bold text-xl hover:from-sky-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-200 vr-glow"
          >
            <span>Explore Features</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 px-6 py-12 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <img src="/vr-rp-logo.png" alt="VR-RP" className="w-8 h-8 rounded" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
              VR-RP
            </span>
          </div>
          <p className="text-slate-400 mb-4">
            The ultimate Virtual Reality Role-Playing platform
          </p>
          <p className="text-slate-500 text-sm">
            © 2025 VR-RP. All rights reserved. | Self-hosted on your PC
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;