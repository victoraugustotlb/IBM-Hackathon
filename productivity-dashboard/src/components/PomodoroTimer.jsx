import { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause, FaStop, FaRedo } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { useNotification } from '../hooks/useLocalStorage';
import { TIMER_STATES } from '../utils/constants';
import '../styles/components/PomodoroTimer.css';

const TIMER_STORAGE_KEY = 'pomodoro_timer_state';

export default function PomodoroTimer() {
  const { getCurrentModeConfig, updateStatistics } = useApp();
  const { showNotification } = useNotification();
  const modeConfig = getCurrentModeConfig();

  // Load saved state from localStorage
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(TIMER_STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        // Check if timer was running and calculate elapsed time
        if (state.timerState === TIMER_STATES.RUNNING && state.startTime) {
          const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
          const newTimeLeft = Math.max(0, state.timeLeft - elapsed);
          return {
            ...state,
            timeLeft: newTimeLeft,
            startTime: Date.now() - (state.timeLeft - newTimeLeft) * 1000
          };
        }
        return state;
      }
    } catch (error) {
      console.error('Error loading timer state:', error);
    }
    return {
      timeLeft: modeConfig.pomodoroTime * 60,
      timerState: TIMER_STATES.IDLE,
      isBreak: false,
      sessionsCompleted: 0,
      startTime: null
    };
  };

  const savedState = loadSavedState();
  
  const [timeLeft, setTimeLeft] = useState(savedState.timeLeft);
  const [timerState, setTimerState] = useState(savedState.timerState);
  const [isBreak, setIsBreak] = useState(savedState.isBreak);
  const [sessionsCompleted, setSessionsCompleted] = useState(savedState.sessionsCompleted);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(savedState.startTime);
  const remainingTimeRef = useRef(savedState.timeLeft);
  const isBreakRef = useRef(savedState.isBreak);
  const sessionsCompletedRef = useRef(savedState.sessionsCompleted);

  // Save state to localStorage
  const saveState = useCallback((state) => {
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving timer state:', error);
    }
  }, []);

  // Keep refs in sync and save state
  useEffect(() => {
    isBreakRef.current = isBreak;
    sessionsCompletedRef.current = sessionsCompleted;
    
    saveState({
      timeLeft,
      timerState,
      isBreak,
      sessionsCompleted,
      startTime: startTimeRef.current
    });
  }, [timeLeft, timerState, isBreak, sessionsCompleted, saveState]);

  const playSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  const handleTimerComplete = useCallback(() => {
    playSound();
    
    if (!isBreakRef.current) {
      // Work session completed
      const newSessionCount = sessionsCompletedRef.current + 1;
      setSessionsCompleted(newSessionCount);
      sessionsCompletedRef.current = newSessionCount;
      updateStatistics(modeConfig.pomodoroTime);
      
      showNotification('Pomodoro Completed! 🎉', {
        body: 'Time for a break!',
        tag: 'pomodoro-complete'
      });
      
      // Start break
      const breakTime = newSessionCount % 4 === 0
        ? modeConfig.longBreakTime
        : modeConfig.breakTime;
      setTimeLeft(breakTime * 60);
      remainingTimeRef.current = breakTime * 60;
      setIsBreak(true);
      isBreakRef.current = true;
    } else {
      // Break completed
      showNotification('Break Over! 💪', {
        body: 'Ready to get back to work?',
        tag: 'break-complete'
      });
      
      setTimeLeft(modeConfig.pomodoroTime * 60);
      remainingTimeRef.current = modeConfig.pomodoroTime * 60;
      setIsBreak(false);
      isBreakRef.current = false;
    }
    setTimerState(TIMER_STATES.IDLE);
  }, [modeConfig, updateStatistics, showNotification, playSound]);

  // Reset timer when mode changes
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerState(TIMER_STATES.IDLE);
    setTimeLeft(modeConfig.pomodoroTime * 60);
    setIsBreak(false);
    isBreakRef.current = false;
  }, [modeConfig]);

  // Timer logic using setInterval (works reliably in background)
  useEffect(() => {
    if (timerState === TIMER_STATES.RUNNING) {
      startTimeRef.current = Date.now();
      remainingTimeRef.current = timeLeft;

      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newTimeLeft = remainingTimeRef.current - elapsed;

        if (newTimeLeft <= 0) {
          clearInterval(intervalRef.current);
          setTimeLeft(0);
          handleTimerComplete();
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState, timeLeft, handleTimerComplete]);

  // Update document title with timer
  useEffect(() => {
    if (timerState === TIMER_STATES.RUNNING) {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      document.title = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} - ${isBreak ? 'Break' : 'Focus'} | Pobe`;
    } else {
      document.title = 'Pobe - Productivity Dashboard';
    }
  }, [timeLeft, timerState, isBreak]);

  const handleStart = () => {
    setTimerState(TIMER_STATES.RUNNING);
  };

  const handlePause = () => {
    setTimerState(TIMER_STATES.PAUSED);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimerState(TIMER_STATES.IDLE);
    setTimeLeft(modeConfig.pomodoroTime * 60);
    setIsBreak(false);
    isBreakRef.current = false;
  };

  const handleSkip = () => {
    if (isBreak) {
      setTimeLeft(modeConfig.pomodoroTime * 60);
      setIsBreak(false);
    } else {
      const breakTime = sessionsCompleted % 4 === 0 
        ? modeConfig.longBreakTime 
        : modeConfig.breakTime;
      setTimeLeft(breakTime * 60);
      setIsBreak(true);
    }
    setTimerState(TIMER_STATES.IDLE);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isBreak 
      ? (sessionsCompleted % 4 === 0 ? modeConfig.longBreakTime : modeConfig.breakTime) * 60
      : modeConfig.pomodoroTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer-header">
        <h2>{isBreak ? '☕ Break Time' : '🍅 Focus Time'}</h2>
        <div className="sessions-counter">
          <span className="session-dot"></span>
          <span className="session-dot"></span>
          <span className="session-dot"></span>
          <span className="session-dot"></span>
          <span className="session-count">{sessionsCompleted} sessions</span>
        </div>
      </div>

      <div className="timer-display">
        <svg className="timer-circle" viewBox="0 0 200 200">
          <circle
            className="timer-circle-bg"
            cx="100"
            cy="100"
            r="90"
          />
          <circle
            className="timer-circle-progress"
            cx="100"
            cy="100"
            r="90"
            style={{
              strokeDasharray: `${2 * Math.PI * 90}`,
              strokeDashoffset: `${2 * Math.PI * 90 * (1 - getProgress() / 100)}`,
              stroke: modeConfig.color
            }}
          />
        </svg>
        <div className="timer-time">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="timer-controls">
        {timerState === TIMER_STATES.IDLE && (
          <button className="btn btn-primary btn-large" onClick={handleStart}>
            <FaPlay /> Start
          </button>
        )}
        
        {timerState === TIMER_STATES.RUNNING && (
          <button className="btn btn-warning btn-large" onClick={handlePause}>
            <FaPause /> Pause
          </button>
        )}
        
        {timerState === TIMER_STATES.PAUSED && (
          <>
            <button className="btn btn-primary" onClick={handleStart}>
              <FaPlay /> Resume
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              <FaStop /> Stop
            </button>
          </>
        )}
        
        {timerState !== TIMER_STATES.IDLE && (
          <button className="btn btn-secondary" onClick={handleSkip}>
            <FaRedo /> Skip
          </button>
        )}
      </div>

      <div className="timer-info">
        <div className="info-item">
          <span className="info-label">Work</span>
          <span className="info-value">{modeConfig.pomodoroTime}m</span>
        </div>
        <div className="info-item">
          <span className="info-label">Break</span>
          <span className="info-value">{modeConfig.breakTime}m</span>
        </div>
        <div className="info-item">
          <span className="info-label">Long Break</span>
          <span className="info-value">{modeConfig.longBreakTime}m</span>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
