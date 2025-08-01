import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

const VRBackground = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef(null);

  // VR background images for slideshow effect
  const vrImages = [
    'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxWUiUyMGhlYWRzZXR8ZW58MHx8fHwxNzUzODcxNTYyfDA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxWUiUyMGhlYWRzZXR8ZW58MHx8fHwxNzUzODcxNTYyfDA&ixlib=rb-4.1.0&q=85',
    'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg',
    'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eXxlbnwwfHx8fDE3NTM4NzE1NjZ8MA&ixlib=rb-4.1.0&q=85',
    'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg'
  ];

  // Cycle through images for ambient background
  useEffect(() => {
    if (!showDemo) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % vrImages.length
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [showDemo, vrImages.length]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleDemo = () => {
    setShowDemo(!showDemo);
    if (!showDemo) {
      setIsPlaying(true);
    }
  };

  const restartDemo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Ambient VR Background (Option A) */}
      {!showDemo && (
        <div className="absolute inset-0 overflow-hidden">
          {vrImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                filter: 'blur(3px) brightness(0.4)'
              }}
            />
          ))}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80" />
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>
      )}

      {/* Demo Video Background (Option C) */}
      {showDemo && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{ filter: 'brightness(0.5)' }}
          >
            {/* Demo video placeholder - using a VR demo video */}
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            {/* Fallback to image if video fails */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${vrImages[0]})`,
                filter: 'blur(2px) brightness(0.4)'
              }}
            />
          </video>
          
          {/* Video overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/70 to-indigo-900/70" />
        </div>
      )}

      {/* Background Control Panel */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        {/* Toggle Demo Video Button */}
        <button
          onClick={toggleDemo}
          className="bg-gray-900/80 hover:bg-gray-800/90 text-white p-3 rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center space-x-2 text-sm"
          title={showDemo ? "Switch to Ambient Background" : "Watch Demo Video"}
        >
          {showDemo ? (
            <>
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">Ambient</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span className="hidden md:inline">Demo</span>
            </>
          )}
        </button>

        {/* Video Controls (only show when demo is active) */}
        {showDemo && (
          <div className="flex flex-col space-y-2">
            <button
              onClick={togglePlayPause}
              className="bg-gray-900/80 hover:bg-gray-800/90 text-white p-2 rounded-lg backdrop-blur-sm transition-all duration-200"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleMute}
              className="bg-gray-900/80 hover:bg-gray-800/90 text-white p-2 rounded-lg backdrop-blur-sm transition-all duration-200"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={restartDemo}
              className="bg-gray-900/80 hover:bg-gray-800/90 text-white p-2 rounded-lg backdrop-blur-sm transition-all duration-200"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Background Type Indicator */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-gray-900/80 text-white px-3 py-2 rounded-lg backdrop-blur-sm text-xs">
          {showDemo ? "🎬 Demo Video" : "🌌 Ambient VR"}
        </div>
      </div>
    </>
  );
};

export default VRBackground;