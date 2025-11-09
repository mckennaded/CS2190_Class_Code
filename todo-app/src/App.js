import { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function addTask(name) {
    const newTask = { id: Date.now(), name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const displayedTasks = tasks.filter(
    (task) => showCompleted || !task.completed
  );

  return (
    <div className="todoapp stack-large">
      <h1>TODO Application</h1>
      <Form addTask={addTask} />
      <div>
        <button onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
      </div>
      <ul className="todo-list stack-large">
        {displayedTasks.map((task) => (
          <Todo
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
