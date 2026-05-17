import { useState } from 'react';
import { FaPlus, FaTrash, FaCheck, FaFilter } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import '../styles/components/TodoList.css';

export default function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useApp();
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h3>To-Do List</h3>
        <div className="todo-stats">
          <span className="stat-badge">{activeTodosCount} active</span>
        </div>
      </div>

      <form onSubmit={handleAddTodo} className="todo-add">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="input"
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!newTodoText.trim()}
        >
          <FaPlus />
        </button>
      </form>

      <div className="todo-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="todo-items">
        {filteredTodos.length === 0 ? (
          <div className="todo-empty">
            <p>
              {filter === 'completed' 
                ? '🎉 No completed tasks yet'
                : filter === 'active'
                ? '✨ No active tasks'
                : '📝 No tasks yet. Add one above!'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <button
                className="todo-checkbox"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed && <FaCheck />}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                className="btn btn-icon btn-danger"
                onClick={() => deleteTodo(todo.id)}
                title="Delete task"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Made with Bob
