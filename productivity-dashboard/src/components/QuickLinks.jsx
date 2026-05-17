import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaSave, FaTimes } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import LinkIcon from './LinkIcon';
import '../styles/components/QuickLinks.css';

export default function QuickLinks() {
  const { getCurrentLinks, updateModeLinks, currentMode } = useApp();
  const links = getCurrentLinks();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingLinks, setEditingLinks] = useState([]);
  const [newLink, setNewLink] = useState({ name: '', url: '', iconUrl: 'https://cdn.simpleicons.org/link/6366f1' });

  const handleStartEdit = () => {
    setEditingLinks([...links]);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingLinks([]);
    setNewLink({ name: '', url: '', icon: '🔗' });
  };

  const handleSaveEdit = () => {
    updateModeLinks(currentMode, editingLinks);
    setIsEditing(false);
    setEditingLinks([]);
    setNewLink({ name: '', url: '', icon: '🔗' });
  };

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      const link = {
        id: Date.now(),
        ...newLink
      };
      setEditingLinks([...editingLinks, link]);
      setNewLink({ name: '', url: '', iconUrl: 'https://cdn.simpleicons.org/link/6366f1' });
    }
  };

  const handleDeleteLink = (id) => {
    setEditingLinks(editingLinks.filter(link => link.id !== id));
  };

  const handleUpdateLink = (id, field, value) => {
    setEditingLinks(editingLinks.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  return (
    <div className="quick-links">
      <div className="quick-links-header">
        <h3>Quick Links</h3>
        {!isEditing ? (
          <button className="btn btn-icon" onClick={handleStartEdit} title="Edit links">
            <FaEdit />
          </button>
        ) : (
          <div className="edit-actions">
            <button className="btn btn-icon btn-success" onClick={handleSaveEdit} title="Save">
              <FaSave />
            </button>
            <button className="btn btn-icon btn-secondary" onClick={handleCancelEdit} title="Cancel">
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="links-grid">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <LinkIcon
                iconUrl={link.iconUrl}
                name={link.name}
                fallbackIcon={link.icon}
              />
              <span className="link-name">{link.name}</span>
              <FaExternalLinkAlt className="link-external" />
            </a>
          ))}
        </div>
      ) : (
        <div className="links-edit">
          <div className="links-list">
            {editingLinks.map((link) => (
              <div key={link.id} className="link-edit-item">
                <input
                  type="url"
                  value={link.iconUrl || ''}
                  onChange={(e) => handleUpdateLink(link.id, 'iconUrl', e.target.value)}
                  className="input input-icon-url"
                  placeholder="Icon URL"
                  title="Use https://cdn.simpleicons.org/[brand]/[color]"
                />
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => handleUpdateLink(link.id, 'name', e.target.value)}
                  className="input"
                  placeholder="Name"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                  className="input"
                  placeholder="https://..."
                />
                <button
                  className="btn btn-icon btn-danger"
                  onClick={() => handleDeleteLink(link.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="link-add">
            <input
              type="url"
              value={newLink.iconUrl}
              onChange={(e) => setNewLink({ ...newLink, iconUrl: e.target.value })}
              className="input input-icon-url"
              placeholder="Icon URL (simpleicons.org)"
              title="Example: https://cdn.simpleicons.org/github/white"
            />
            <input
              type="text"
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
              className="input"
              placeholder="Link name"
            />
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="input"
              placeholder="https://..."
            />
            <button
              className="btn btn-primary"
              onClick={handleAddLink}
              disabled={!newLink.name || !newLink.url}
            >
              <FaPlus /> Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
