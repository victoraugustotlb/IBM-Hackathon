import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes } from 'react-icons/fa';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { useApp } from '../context/AppContext';
import '../styles/components/Calendar.css';

export default function Calendar() {
  const { calendarEvents, addCalendarEvent, deleteCalendarEvent } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = monthStart.getDay();

  // Create array with empty slots for days before month starts
  const calendarDays = [
    ...Array(firstDayOfWeek).fill(null),
    ...daysInMonth
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDate(day);
      setShowEventModal(true);
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && selectedDate) {
      addCalendarEvent({
        title: newEvent.title,
        time: newEvent.time,
        date: format(selectedDate, 'yyyy-MM-dd')
      });
      setNewEvent({ title: '', time: '' });
      setShowEventModal(false);
    }
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = format(day, 'yyyy-MM-dd');
    return calendarEvents.filter(event => event.date === dateStr);
  };

  const hasEvents = (day) => {
    return day && getEventsForDay(day).length > 0;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>Calendar</h3>
        <div className="calendar-nav">
          <button className="btn btn-icon" onClick={handlePrevMonth}>
            <FaChevronLeft />
          </button>
          <span className="calendar-month">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button className="btn btn-icon" onClick={handleNextMonth}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        <div className="calendar-days">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              className={`calendar-day ${!day ? 'empty' : ''} ${
                day && isToday(day) ? 'today' : ''
              } ${day && hasEvents(day) ? 'has-events' : ''}`}
              onClick={() => handleDayClick(day)}
              disabled={!day}
            >
              {day && (
                <>
                  <span className="day-number">{format(day, 'd')}</span>
                  {hasEvents(day) && (
                    <span className="event-indicator">
                      {getEventsForDay(day).length}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>
                {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
              </h4>
              <button
                className="btn btn-icon"
                onClick={() => setShowEventModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleAddEvent} className="event-form">
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Event title"
                  className="input"
                  autoFocus
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="input"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!newEvent.title}
                >
                  <FaPlus /> Add Event
                </button>
              </form>

              <div className="events-list">
                {selectedDate && getEventsForDay(selectedDate).map((event) => (
                  <div key={event.id} className="event-item">
                    <div className="event-info">
                      <span className="event-time">{event.time || 'All day'}</span>
                      <span className="event-title">{event.title}</span>
                    </div>
                    <button
                      className="btn btn-icon btn-danger"
                      onClick={() => deleteCalendarEvent(event.id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
