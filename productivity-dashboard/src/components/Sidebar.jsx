import { FaSun, FaMoon, FaCog } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { MODES } from '../utils/constants';
import '../styles/components/Sidebar.css';

export default function Sidebar() {
  const { currentMode, setCurrentMode, theme, setTheme } = useApp();

  const handleModeChange = (modeId) => {
    setCurrentMode(modeId);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">
          <img src="/favicon.svg" alt="Pobe" className="logo-favicon" />
          <span className="logo-text">Pobe</span>
        </h1>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Modes</h3>
          <ul className="nav-list">
            {Object.values(MODES).map((mode) => (
              <li key={mode.id}>
                <button
                  className={`nav-item ${currentMode === mode.id ? 'active' : ''}`}
                  onClick={() => handleModeChange(mode.id)}
                  style={{
                    '--mode-color': mode.color
                  }}
                >
                  <span className="nav-icon">{mode.icon}</span>
                  <span className="nav-text">{mode.name}</span>
                  {currentMode === mode.id && (
                    <span className="nav-indicator"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-action sidebar-action-full"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
          <span className="action-label">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </aside>
  );
}

// Made with Bob
