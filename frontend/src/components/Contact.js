import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Have questions about VR-RP? Want to contribute to the project? 
            We'd love to hear from you and help you on your virtual reality journey.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-sky-400">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Email Support</h3>
                    <p className="text-slate-300">
                      For technical support, feature requests, or general inquiries.
                    </p>
                    <p className="text-sky-400 font-semibold">support@vr-rp.app</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Community</h3>
                    <p className="text-slate-300">
                      Join our community for discussions, tips, and peer support.
                    </p>
                    <p className="text-pink-400 font-semibold">Discord & Forums</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Self-Hosting Support</h3>
                <p className="text-slate-300 mb-4">
                  Need help setting up VR-RP on your own server? Our documentation and 
                  community are here to help you get started.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Installation guides</li>
                  <li>• Configuration assistance</li>
                  <li>• Performance optimization</li>
                  <li>• Troubleshooting support</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-3xl font-bold mb-6 text-pink-400">Send us a Message</h2>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 text-white placeholder-slate-400"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 text-white placeholder-slate-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 text-white placeholder-slate-400"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 text-white placeholder-slate-400 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-pink-500 px-6 py-4 rounded-lg font-bold text-lg hover:from-sky-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-200 vr-glow"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Message Sent!</h3>
                  <p className="text-slate-300">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Self-Hosting Info */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
            Self-Hosting Made Easy
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            VR-RP is designed to run perfectly on your own hardware. Full control, complete privacy, 
            and the ability to customize everything to your needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 text-sky-400">Easy Setup</h3>
              <p className="text-slate-300">
                One-command Docker deployment. Get VR-RP running on your PC in minutes.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 text-pink-400">Full Control</h3>
              <p className="text-slate-300">
                Your data stays on your hardware. Complete customization and configuration freedom.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Community Support</h3>
              <p className="text-slate-300">
                Active community and comprehensive documentation to help you succeed.
              </p>
            </div>
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

export default Contact;