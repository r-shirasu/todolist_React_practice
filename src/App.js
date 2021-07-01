import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";

const DATAURL = "http://localhost:3004/todoList";

export const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isShowAlertMessage, setIsShowMessage] = useState(false);

  useEffect(() => {
    axios
      .get(DATAURL)
      .then((res) => setTodos(res.data))
      .catch((error) => console.log(error));
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
      await axios.post(DATAURL, { description: task, isDone: false });
      const res = await axios.get(DATAURL);
      setTodos(res.data);
      setIsShowMessage(false);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (todo, index) => {
    try {
      await axios.patch(`${DATAURL}/${todo.id}`, {
        description: todo.description,
        isDone: !todo.isDone,
      });
      const res = await axios.get(DATAURL);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearAction = () => {
    setTodos([]);
  };

  const deleteAction = async (todo, index) => {
    try {
      await axios.delete(`${DATAURL}/${todo.id}`, {});
      const res = await axios.get(DATAURL);
      setTodos(res.data);
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
