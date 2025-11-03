import React from 'react';

function TodoList({ todos, toggleTodo, removeTodo }) {
  return (
    <ul style={{ padding: 0 }}>
      {todos.map((todo, index) => (
        <li
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}
        >
          <span
            style={{ flex: 1, cursor: 'pointer' }}
            onClick={() => toggleTodo(index)}
          >
            {todo.text}
          </span>
          <button onClick={() => removeTodo(index)} style={{ marginLeft: '8px' }}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
