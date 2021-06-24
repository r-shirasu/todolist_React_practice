import React from "react";
import "./App.scss";

export const App = () => {
  return (
    <div className="main">
      <h1>TO-DO LIST</h1>
      <form id="add">
        <input type="text" placeholder="new task" />
        <input type="submit" value="ADD" />
      </form>
      <div className="tasksBoard">
        <ul id="todo-list">
          <li>
            <span>×</span>

            <label>
              <input type="checkbox" name="check" />
              task
            </label>
          </li>
        </ul>
        <p>Clear</p>
      </div>
    </div>
  );
};
