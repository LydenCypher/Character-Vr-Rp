import React, { useState } from 'react';
import { Play, Pause, Plus, Music, Mic, Volume2, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import { mockProjects } from '../mockData';
import './BandLab.css';

const BandLab = () => {
  const [projects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Vocals', type: 'vocal', volume: 80, muted: false, color: '#f093fb' },
    { id: 2, name: 'Guitar', type: 'instrument', volume: 70, muted: false, color: '#43e97b' },
    { id: 3, name: 'Drums', type: 'drums', volume: 75, muted: false, color: '#4facfe' },
    { id: 4, name: 'Bass', type: 'bass', volume: 65, muted: false, color: '#f5576c' }
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (trackId) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, muted: !track.muted } : track
    ));
  };

  const updateVolume = (trackId, volume) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, volume: parseInt(volume) } : track
    ));
  };

  const addTrack = () => {
    const newTrack = {
      id: tracks.length + 1,
      name: `Track ${tracks.length + 1}`,
      type: 'instrument',
      volume: 70,
      muted: false,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    };
    setTracks([...tracks, newTrack]);
  };

  return (
    <div className="bandlab-page">
      <Navbar />
      
      <div className="bandlab-container">
        {!selectedProject ? (
          <div className="projects-view">
            <div className="projects-header">
              <h1 className="projects-title">Your Projects</h1>
              <button className="new-project-button">
                <Plus size={20} />
                New Project
              </button>
            </div>

            <div className="projects-grid">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <img src={project.cover} alt={project.name} className="project-cover" />
                  <div className="project-info">
                    <h3 className="project-name">{project.name}</h3>
                    <div className="project-meta">
                      <span>{project.tracks} tracks</span>
                      <span>{project.duration}</span>
                    </div>
                    <p className="project-modified">{project.lastModified}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="studio-view">
            <div className="studio-header">
              <button
                onClick={() => setSelectedProject(null)}
                className="back-to-projects"
              >
                ← Back to Projects
              </button>
              <h2 className="studio-project-name">{selectedProject.name}</h2>
              <button className="studio-settings">
                <Settings size={20} />
              </button>
            </div>

            <div className="studio-workspace">
              <div className="timeline-controls">
                <button
                  onClick={togglePlay}
                  className="play-control"
                >
                  {isPlaying ? (
                    <Pause size={24} fill="white" />
                  ) : (
                    <Play size={24} fill="white" />
                  )}
                </button>
                <div className="time-display">00:00 / {selectedProject.duration}</div>
              </div>

              <div className="tracks-panel">
                <div className="tracks-header">
                  <h3>Tracks</h3>
                  <button onClick={addTrack} className="add-track-button">
                    <Plus size={16} />
                    Add Track
                  </button>
                </div>

                <div className="tracks-list">
                  {tracks.map(track => (
                    <div key={track.id} className="track-item">
                      <div className="track-header">
                        <div
                          className="track-color-indicator"
                          style={{ background: track.color }}
                        ></div>
                        <span className="track-name">{track.name}</span>
                        <button
                          onClick={() => toggleMute(track.id)}
                          className={`track-mute ${track.muted ? 'muted' : ''}`}
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>

                      <div className="track-controls">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={track.volume}
                          onChange={(e) => updateVolume(track.id, e.target.value)}
                          className="volume-slider"
                        />
                        <span className="volume-value">{track.volume}%</span>
                      </div>

                      <div className="track-waveform" style={{ opacity: track.muted ? 0.3 : 1 }}>
                        {[...Array(50)].map((_, i) => (
                          <div
                            key={i}
                            className="waveform-bar"
                            style={{
                              height: `${Math.random() * 100}%`,
                              background: track.color
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BandLab;