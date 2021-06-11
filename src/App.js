import React from "react";
import { useState } from "react";
import "./App.scss";

export const App = () => {
  const [task, newTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState("");
  const [isChecked, setChecked] = useState(false);

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

  const deleteAction = (index) => {
    const deleteArr = todos.filter((_, id) => {
      return id !== index;
    });
    setTodos(deleteArr);
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
              <span onClick={() => deleteAction(index)}>×</span>
              <input
                type="checkbox"
                checked={value.index}
                name="check"
                onChange={handleCheck}
              />
              <label id={isChecked ? "checked" : ""}>{value}</label>
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
