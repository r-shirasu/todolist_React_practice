import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";

const DATA_URL = "http://localhost:3004/todoList";

export const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isShowAlertMessage, setIsShowMessage] = useState(false);

  useEffect(() => {
    const getDataUrl = async () => {
      try {
        const resGet = await axios.get(DATA_URL);
        setTodos(resGet.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataUrl();
  }, []);

  const addTask = (e) => {
    setTask(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (task === "") {
      setIsShowMessage(true);
      return;
    }

    try {
      await axios.post(DATA_URL, { description: task, isDone: false });
      const resPost = await axios.get(DATA_URL);
      setTodos(resPost.data);
      setIsShowMessage(false);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (todo, index) => {
    try {
      await axios.patch(`${DATA_URL}/${todo.id}`, {
        description: todo.description,
        isDone: !todo.isDone,
      });
      const respatch = await axios.get(DATA_URL);
      setTodos(respatch.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearAction = () => {
    setTodos([]);
  };

  const deleteAction = async (todo, index) => {
    try {
      await axios.delete(`${DATA_URL}/${todo.id}`, {});
      const resDelete = await axios.get(DATA_URL);
      setTodos(resDelete.data);
    } catch (error) {
      console.log(error);
    }
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
              <span onClick={() => deleteAction(todo, index)}>×</span>

              <label name={index} className={todo.isDone ? "checked" : ""}>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  name="check"
                  onChange={() => handleCheck(todo, index)}
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
