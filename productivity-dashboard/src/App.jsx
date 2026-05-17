import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import PomodoroTimer from './components/PomodoroTimer';
import QuickLinks from './components/QuickLinks';
import TodoList from './components/TodoList';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <div className="dashboard-grid">
            <div className="grid-item timer-section">
              <PomodoroTimer />
            </div>
            
            <div className="grid-item links-section">
              <QuickLinks />
            </div>
            
            <div className="grid-item stats-section">
              <Statistics />
            </div>
            
            <div className="grid-item todo-section">
              <TodoList />
            </div>
            
            <div className="grid-item calendar-section">
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;

// Made with Bob
