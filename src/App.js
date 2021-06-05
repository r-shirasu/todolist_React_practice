import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="main">
      <h1>TO-DO LIST</h1>
      <form id="add">
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
