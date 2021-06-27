import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";

export const App = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3004/todoList")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isShowAlertMessage, setIsShowMessage] = useState(false);

  const addTask = (e) => {
    setTask(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3004/todoList", {
        description: task,
        isDone: false,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setTodos(todos.concat({ description: task, isDone: false }));
      });

    if (task === "") {
      setIsShowMessage(true);
      return;
    }

    setIsShowMessage(false);
    setTodos(todos.concat({ description: task, isDone: false }));
    setTask("");
  };

  const handleCheck = (index) => {
    const checkedTodos = todos.map((todo, _index) => {
      if (_index !== index) {
        return todo;
      }
      return {
        description: todo.description,
        isDone: !todo.isDone,
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
      <form onSubmit={handleClick} id="add">
        <input
          type="text"
          placeholder="new task"
          value={task}
          onChange={addTask}
        />
        <input type="submit" value="ADD" />
      </form>
      {isShowAlertMessage && (
        <div className="alertMessage">Todoを入力してください</div>
      )}
      <div className="tasksBoard">
        <ul id="todo-list">
          {todos.map((todo, index) => (
            <li key={`${todo}${index}`}>
              <span onClick={() => deleteAction(index)}>×</span>

              <label name={index} className={todo.isDone ? "checked" : ""}>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  name="check"
                  onChange={() => handleCheck(index)}
                />
                {todo.description}
              </label>
            </li>
          ))}
        </ul>
        <p onClick={clearAction}>Clear</p>
      </div>
    </div>
  );
};
