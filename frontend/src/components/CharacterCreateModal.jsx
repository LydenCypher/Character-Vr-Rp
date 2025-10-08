import React, { useState } from 'react';
import { X, Upload, Sparkles } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import './CharacterCreateModal.css';

const CharacterCreateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: 'Fantasy',
    description: '',
    greeting: ''
  });

  const categories = ['Fantasy', 'Technology', 'Music', 'Science', 'Creative', 'Sci-Fi', 'Education', 'Lifestyle', 'Adventure'];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Character Created! 🎉",
      description: `${formData.name} is ready to chat!`,
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content character-create-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create AI Character</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="character-form">
          <div className="form-group">
            <label className="form-label">Character Avatar</label>
            <div className="avatar-upload">
              <div className="avatar-placeholder">
                <Upload size={32} />
                <span>Upload Image</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Character Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g., Luna the Mystic"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tagline *</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Brief description in one line"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us more about this character..."
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Greeting Message</label>
            <textarea
              name="greeting"
              value={formData.greeting}
              onChange={handleChange}
              placeholder="The first message your character will say..."
              className="form-textarea"
              rows="2"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-create">
              <Sparkles size={18} />
              Create Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharacterCreateModal;