import React from "react";
import { useState } from "react";
import "./App.scss";

export const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = (e) => {
    setTask(e.target.value);
  };

  const handleClick = (e) => {
    // todo追加時にisChecked:falseも持たせる
    setTodos(todos.concat({ task: task, isChecked: false }));
    e.preventDefault();
    setTask("");
  };

  /**
   * チェックをクリックしたtodoのindexのisCheckedを変える
   */
  const handleCheck = (index) => {
    // クリックしたindexのtodoが持つisCheckedを反転させる
    const checkedTodos = todos.map((todo, _index) => {
      if (_index !== index) {
        return todo;
      }
      return {
        task: todo.task,
        isChecked: !todo.isChecked, // todo.isCheckedがtrueならfalse, falseならtrueになる
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
              {/* todo.isCheckedがtrueならclassNameがchecked, falseなら何もなし */}
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
