import { FaChartLine, FaClock, FaFire, FaDownload } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { MODES } from '../utils/constants';
import '../styles/components/Statistics.css';

export default function Statistics() {
  const { statistics } = useApp();

  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(statistics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `productivity-stats-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTopMode = () => {
    const modes = Object.entries(statistics.sessionsPerMode || {});
    if (modes.length === 0) return null;
    const [modeId, count] = modes.reduce((a, b) => a[1] > b[1] ? a : b);
    return { mode: MODES[modeId], count };
  };

  const topMode = getTopMode();

  return (
    <div className="statistics">
      <div className="statistics-header">
        <h3>Statistics</h3>
        <button 
          className="btn btn-icon" 
          onClick={exportData}
          title="Export statistics"
        >
          <FaDownload />
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaFire />
          </div>
          <div className="stat-content">
            <div className="stat-value">{statistics.totalSessions || 0}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {formatMinutes(statistics.totalMinutes || 0)}
            </div>
            <div className="stat-label">Total Time</div>
          </div>
        </div>

        {topMode && (
          <div className="stat-card">
            <div className="stat-icon">
              {topMode.mode.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{topMode.count}</div>
              <div className="stat-label">Top Mode: {topMode.mode.name}</div>
            </div>
          </div>
        )}
      </div>

      <div className="modes-breakdown">
        <h4>Sessions by Mode</h4>
        <div className="modes-list">
          {Object.entries(statistics.sessionsPerMode || {}).map(([modeId, count]) => {
            const mode = MODES[modeId];
            if (!mode) return null;
            return (
              <div key={modeId} className="mode-stat">
                <div className="mode-stat-info">
                  <span className="mode-icon">{mode.icon}</span>
                  <span className="mode-name">{mode.name}</span>
                </div>
                <div className="mode-stat-bar">
                  <div 
                    className="mode-stat-fill"
                    style={{
                      width: `${(count / statistics.totalSessions) * 100}%`,
                      backgroundColor: mode.color
                    }}
                  ></div>
                </div>
                <span className="mode-stat-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {Object.keys(statistics.dailyStats || {}).length > 0 && (
        <div className="daily-stats">
          <h4>Recent Activity</h4>
          <div className="daily-list">
            {Object.entries(statistics.dailyStats || {})
              .sort(([a], [b]) => b.localeCompare(a))
              .slice(0, 7)
              .map(([date, data]) => (
                <div key={date} className="daily-item">
                  <span className="daily-date">
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="daily-bar">
                    <div 
                      className="daily-bar-fill"
                      style={{
                        width: `${Math.min((data.sessions / 10) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  <span className="daily-count">
                    {data.sessions} sessions · {formatMinutes(data.minutes)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
