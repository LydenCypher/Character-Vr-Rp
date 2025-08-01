import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Users, Zap, Gamepad2, Mic, Shield, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI-Powered Characters",
      description: "Interact with intelligent NPCs that remember your conversations, adapt to your playstyle, and create dynamic storylines.",
      gradient: "from-sky-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multiplayer Worlds",
      description: "Join friends in shared virtual spaces, create guilds, and embark on epic adventures together in real-time.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "VR Immersion",
      description: "Full VR support with haptic feedback, spatial audio, and realistic physics for the ultimate immersive experience.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Multiple Game Modes",
      description: "Choose from Casual, Role-Playing (RP), or RPG modes. Each offers unique gameplay mechanics and experiences.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Chat",
      description: "Crystal-clear voice communication with spatial audio. Talk naturally with other players and AI characters.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe Environment",
      description: "Robust moderation tools, content filtering, and privacy controls ensure a safe and welcoming community.",
      gradient: "from-teal-500 to-blue-500"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Customizable Personas",
      description: "Create detailed character personas that influence AI interactions. Build unique backstories and personalities.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

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
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Features
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover the cutting-edge technology and innovative features that make VR-RP 
            the most advanced virtual reality role-playing platform.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-sky-400/50 transition-all duration-300 group hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-sky-400">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            Built with Modern Technology
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold mb-2 text-sky-400">Frontend</h3>
              <p className="text-slate-300">React 18 + Tailwind CSS</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold mb-2 text-pink-400">Backend</h3>
              <p className="text-slate-300">FastAPI + Python</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold mb-2 text-purple-400">Database</h3>
              <p className="text-slate-300">MongoDB</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold mb-2 text-emerald-400">AI</h3>
              <p className="text-slate-300">OpenAI + Claude + Gemini</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Experience VR-RP?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join the revolution in virtual reality role-playing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-sky-500 to-pink-500 px-8 py-4 rounded-lg font-bold text-lg hover:from-sky-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-200 vr-glow">
              Launch VR-RP
            </button>
            <Link 
              to="/about"
              className="border-2 border-sky-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-sky-400/10 transition-all duration-200"
            >
              Learn More
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

export default Features;