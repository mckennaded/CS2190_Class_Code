function Todo({ id, name, completed, toggleTaskCompleted, deleteTask }) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label
          htmlFor={id}
          style={{ textDecoration: completed ? "line-through" : "none" }}
        >
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todo;
