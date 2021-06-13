import React from "react";
import { useState } from "react";
import "./App.scss";

export const App = () => {
  const [task, newTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = (e) => {
    newTask(e.target.value);
  };

  const handleClick = (e) => {
    setTodos(todos.concat({ task: task, isChecked: false }));
    e.preventDefault();
    newTask("");
  };

  const handleCheck = (index) => {
    const checkedTodos = todos.map((todo, _index) => {
      if (_index !== index) {
        return { task: todo.task, isChecked: todo.isChecked };
      }
      return {
        task: todo.task,
        isChecked: !todo.isChecked,
      };
    });
    setTodos(checkedTodos);
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
          {todos.map((todo, index) => (
            <li key={`${todo}${index}`}>
              <span onClick={() => deleteAction(index)}>×</span>

              <label name={index} className={todo.isChecked ? "checked" : ""}>
                <input
                  type="checkbox"
                  checked={todo.isChecked}
                  name="check"
                  onChange={() => handleCheck(index)}
                />
                {todo.task}
              </label>
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
