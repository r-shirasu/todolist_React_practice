import React, { useState } from "react";
import "./App.scss";

export const App = () => {
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo("test");
  };

  const addTodo = (inputValue) => {
    setTodoList([...todoList, inputValue]);
  };

  return (
    <div className="main">
      <h1>TO-DO LIST</h1>
      <form id="add" onSubmit={handleSubmit}>
        <input type="text" placeholder="new task" />
        <input type="submit" value="ADD" />
      </form>
      <div className="tasksBoard">
        <ul id="todo-list">
          {todoList.map((todo, index) => {
            return <li key={`${todo}${index}`}>{todo}</li>;
          })}
        </ul>
        <p>Clear</p>
      </div>
    </div>
  );
};
