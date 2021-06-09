import React from "react";
import { useState } from "react";
import "./App.scss";

function App() {
  const [task, newTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = (e) => {
    newTask(e.target.value);
  };

  const handleClick = (e) => {
    setTodos(todos.concat(task));
    e.preventDefault();
    newTask("");
  };

  return (
    <div className="main">
      <h1>TO-DO LIST</h1>
      <form id="add">
        <input
          type="text"
          placeholder="new task"
          value={task}
          onChange={addTask}
        />
        <button onClick={handleClick}>ADD</button>
      </form>
      <div className="tasksBoard">
        <ul id="todo-list">
          {todos.map((todo) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
        <p id="clear">Clear</p>
      </div>
    </div>
  );
}

export default App;
