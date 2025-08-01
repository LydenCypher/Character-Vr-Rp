import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Globe, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
          
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-slate-300 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              About VR-RP
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We're revolutionizing virtual reality role-playing by combining cutting-edge AI technology 
              with immersive VR experiences to create unprecedented interactive worlds.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-sky-400">Our Mission</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                At VR-RP, we believe that the future of entertainment lies in immersive, interactive experiences 
                that blur the line between reality and imagination. Our mission is to create the most advanced 
                virtual reality role-playing platform where users can explore infinite worlds, interact with 
                intelligent AI characters, and forge meaningful connections with other players.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                We're not just building a game – we're crafting a new form of digital existence where creativity, 
                storytelling, and technology converge to create experiences that were once only possible in dreams.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/vr-rp-logo.png" 
                alt="VR-RP Character" 
                className="w-full max-w-md mx-auto rounded-3xl vr-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-sky-400">Innovation</h3>
              <p className="text-slate-300">
                Pushing the boundaries of what's possible in VR and AI technology.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Community</h3>
              <p className="text-slate-300">
                Building inclusive spaces where everyone can express their creativity.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Accessibility</h3>
              <p className="text-slate-300">
                Making advanced VR experiences available to users worldwide.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Performance</h3>
              <p className="text-slate-300">
                Delivering seamless, high-performance experiences across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              VR-RP leverages the latest advancements in artificial intelligence, virtual reality, 
              and cloud computing to deliver unparalleled experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-4 text-sky-400">AI Integration</h3>
              <p className="text-slate-300 mb-4">
                Multi-provider AI support including OpenAI GPT models, Anthropic Claude, and Google Gemini 
                for dynamic, context-aware character interactions.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Advanced natural language processing</li>
                <li>• Contextual memory systems</li>
                <li>• Adaptive personality modeling</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">VR Technology</h3>
              <p className="text-slate-300 mb-4">
                Built from the ground up for virtual reality with support for all major VR headsets 
                and haptic feedback systems.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Full 6DOF movement tracking</li>
                <li>• Spatial audio systems</li>
                <li>• Hand and eye tracking</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Self-Hosting</h3>
              <p className="text-slate-300 mb-4">
                Complete self-hosting capability allowing you to run VR-RP on your own hardware 
                with full control over your data and experiences.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Docker containerization</li>
                <li>• Local database storage</li>
                <li>• Privacy-first architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            Join the VR-RP Revolution
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Be part of the next generation of virtual reality role-playing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-sky-500 to-pink-500 px-8 py-4 rounded-lg font-bold text-lg hover:from-sky-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-200 vr-glow">
              Get Started Today
            </button>
            <Link 
              to="/contact"
              className="border-2 border-sky-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-sky-400/10 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
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

export default About;