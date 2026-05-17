import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MODES, THEMES, STORAGE_KEYS } from '../utils/constants';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Current mode
  const [currentMode, setCurrentMode] = useLocalStorage(
    STORAGE_KEYS.CURRENT_MODE,
    'dev'
  );

  // Theme
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'dark');

  // Custom links per mode
  const [customLinks, setCustomLinks] = useLocalStorage(
    STORAGE_KEYS.CUSTOM_LINKS,
    {}
  );

  // Todos
  const [todos, setTodos] = useLocalStorage(STORAGE_KEYS.TODOS, []);

  // Calendar events
  const [calendarEvents, setCalendarEvents] = useLocalStorage(
    STORAGE_KEYS.CALENDAR_EVENTS,
    []
  );

  // Statistics
  const [statistics, setStatistics] = useLocalStorage(STORAGE_KEYS.STATISTICS, {
    totalSessions: 0,
    totalMinutes: 0,
    sessionsPerMode: {},
    dailyStats: {}
  });

  // Get current mode configuration
  const getCurrentModeConfig = () => {
    return MODES[currentMode];
  };

  // Get links for current mode (custom or default)
  const getCurrentLinks = () => {
    if (customLinks[currentMode] && customLinks[currentMode].length > 0) {
      return customLinks[currentMode];
    }
    return MODES[currentMode].defaultLinks;
  };

  // Update custom links for a mode
  const updateModeLinks = (modeId, links) => {
    setCustomLinks(prev => ({
      ...prev,
      [modeId]: links
    }));
  };

  // Add todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  // Toggle todo
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Add calendar event
  const addCalendarEvent = (event) => {
    const newEvent = {
      id: Date.now(),
      ...event,
      createdAt: new Date().toISOString()
    };
    setCalendarEvents(prev => [...prev, newEvent]);
  };

  // Delete calendar event
  const deleteCalendarEvent = (id) => {
    setCalendarEvents(prev => prev.filter(event => event.id !== id));
  };

  // Update statistics
  const updateStatistics = (sessionMinutes) => {
    const today = new Date().toISOString().split('T')[0];
    
    setStatistics(prev => ({
      totalSessions: prev.totalSessions + 1,
      totalMinutes: prev.totalMinutes + sessionMinutes,
      sessionsPerMode: {
        ...prev.sessionsPerMode,
        [currentMode]: (prev.sessionsPerMode[currentMode] || 0) + 1
      },
      dailyStats: {
        ...prev.dailyStats,
        [today]: {
          sessions: (prev.dailyStats[today]?.sessions || 0) + 1,
          minutes: (prev.dailyStats[today]?.minutes || 0) + sessionMinutes
        }
      }
    }));
  };

  // Apply theme to document
  useEffect(() => {
    const themeColors = THEMES[theme].colors;
    const root = document.documentElement;
    
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme]);

  const value = {
    currentMode,
    setCurrentMode,
    theme,
    setTheme,
    getCurrentModeConfig,
    getCurrentLinks,
    updateModeLinks,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    calendarEvents,
    addCalendarEvent,
    deleteCalendarEvent,
    statistics,
    updateStatistics
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Made with Bob
