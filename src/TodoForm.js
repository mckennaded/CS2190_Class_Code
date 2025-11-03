import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Add a new To Do"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '70%', padding: '6px' }}
      />
      <button type="submit" style={{ marginLeft: '8px', padding: '6px 12px' }}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
