import React from "react";
import "./App.css";
import Todo from "./components/Todo";
import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./components/TodoList";
import TodoCompleted from "./components/TodoCompleted";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Todo />
        <div className="items">
          <TodoList />
          <TodoCompleted />
        </div>
      </div>
    </Provider>
  );
}

export default App;
