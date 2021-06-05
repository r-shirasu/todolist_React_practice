import React from "react";
import { useState } from "react";
import "./App.scss";

function App() {
  const [task, newTask] = useState("");
  const addTask = (e) => newTask(e.target.value);

  return (
    <div className="main">
      <h1>TO-DO LIST</h1>
      <form id="add">
        <input placeholder="new task" value={task} onChange={addTask} />
        <button>
          <strong>ADD</strong>
        </button>
      </form>
      <div class="tasksBoard">
        <ul id="todo-list"></ul>
        <a id="clear">Clear</a>
      </div>
    </div>
  );
}

export default App;
