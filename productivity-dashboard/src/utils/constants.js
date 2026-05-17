// Productivity Modes Configuration
export const MODES = {
  dev: {
    id: 'dev',
    name: 'Dev Mode',
    icon: '💻',
    pomodoroTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    color: '#6366f1',
    defaultLinks: [
      { id: 1, name: 'GitHub', url: 'https://github.com', iconUrl: 'https://cdn.simpleicons.org/github' },
      { id: 2, name: 'Stack Overflow', url: 'https://stackoverflow.com', iconUrl: 'https://cdn.simpleicons.org/stackoverflow' },
      { id: 3, name: 'MDN Docs', url: 'https://developer.mozilla.org', iconUrl: 'https://cdn.simpleicons.org/mdnwebdocs' },
      { id: 4, name: 'VS Code', url: 'https://code.visualstudio.com', iconUrl: 'https://cdn.simpleicons.org/visualstudiocode' },
    ]
  },
  design: {
    id: 'design',
    name: 'Design Mode',
    icon: '🎨',
    pomodoroTime: 30,
    breakTime: 10,
    longBreakTime: 20,
    color: '#ec4899',
    defaultLinks: [
      { id: 1, name: 'Figma', url: 'https://figma.com', iconUrl: 'https://cdn.simpleicons.org/figma' },
      { id: 2, name: 'Dribbble', url: 'https://dribbble.com', iconUrl: 'https://cdn.simpleicons.org/dribbble' },
      { id: 3, name: 'Behance', url: 'https://behance.net', iconUrl: 'https://cdn.simpleicons.org/behance' },
      { id: 4, name: 'Adobe', url: 'https://adobe.com', iconUrl: 'https://cdn.simpleicons.org/adobe' },
    ]
  },
  meeting: {
    id: 'meeting',
    name: 'Meeting Mode',
    icon: '👥',
    pomodoroTime: 45,
    breakTime: 15,
    longBreakTime: 30,
    color: '#10b981',
    defaultLinks: [
      { id: 1, name: 'Zoom', url: 'https://zoom.us', iconUrl: 'https://cdn.simpleicons.org/zoom' },
      { id: 2, name: 'Google Meet', url: 'https://meet.google.com', iconUrl: 'https://cdn.simpleicons.org/googlemeet' },
      { id: 3, name: 'Google Calendar', url: 'https://calendar.google.com', iconUrl: 'https://cdn.simpleicons.org/googlecalendar' },
      { id: 4, name: 'Slack', url: 'https://slack.com', iconUrl: 'https://cdn.simpleicons.org/slack' },
    ]
  },
  deepwork: {
    id: 'deepwork',
    name: 'Deep Work',
    icon: '🧠',
    pomodoroTime: 90,
    breakTime: 20,
    longBreakTime: 30,
    color: '#8b5cf6',
    defaultLinks: [
      { id: 1, name: 'Notion', url: 'https://notion.so', iconUrl: 'https://cdn.simpleicons.org/notion' },
      { id: 2, name: 'Google Scholar', url: 'https://scholar.google.com', iconUrl: 'https://cdn.simpleicons.org/googlescholar' },
      { id: 3, name: 'Spotify', url: 'https://spotify.com', iconUrl: 'https://cdn.simpleicons.org/spotify' },
      { id: 4, name: 'Obsidian', url: 'https://obsidian.md', iconUrl: 'https://cdn.simpleicons.org/obsidian' },
    ]
  }
};

// Themes Configuration
export const THEMES = {
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceLight: '#334155',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#475569'
    }
  },
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceLight: '#f1f5f9',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    }
  }
};

// Timer States
export const TIMER_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  BREAK: 'break'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CURRENT_MODE: 'productivity_current_mode',
  CUSTOM_LINKS: 'productivity_custom_links',
  TODOS: 'productivity_todos',
  CALENDAR_EVENTS: 'productivity_calendar_events',
  STATISTICS: 'productivity_statistics',
  THEME: 'productivity_theme',
  SETTINGS: 'productivity_settings'
};

// Made with Bob
