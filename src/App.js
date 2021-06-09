import React from "react";
import { useState } from "react";
import "./App.scss";

export const App = () => {
  const [task, newTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState("");

  const addTask = (e) => {
    newTask(e.target.value);
  };

  const handleClick = (e) => {
    setTodos(todos.concat(task));
    e.preventDefault();
    newTask("");
  };

  const handleCheck = (e) => {
    setCheckedTodos(e.target.checked);
  };

  const clearAction = () => {
    setTodos([]);
  };

  const deleteAction = () => {
    console.log("クリック");
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
          {todos.map((value, index) => (
            <li key={`${value}${index}`}>
              <span onClick={deleteAction}>×</span>
              <input
                type="checkbox"
                value={checkedTodos}
                name="check"
                onChange={handleCheck}
              />
              {value}
            </li>
          ))}
        </ul>
        <p onClick={clearAction} id="clear">
          Clear
        </p>
      </div>
    </div>
  );
};
