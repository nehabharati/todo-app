import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import useSortableData from "../hooks/useSortableData";
import useSortableCompletedData from "../hooks/useSortableCompletedData";
import {
  addItem,
  setTodoItems,
  toggleSort,
  setRequestSort,
  setCompletedItems,
} from "../actions/itemActions";
import { handleLocalStorage } from "../utils/handleLocalStorage";

function Todo(props) {
  const [itemName, setItemName] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [todoCompletedItems, setTodoCompletedItems] = useState([]);
  const { items, requestSort, sortConfig } = useSortableData(todoItems);
  const {
    completedItems,
    requestCompletedSort,
    sortSortedConfig,
  } = useSortableCompletedData(todoCompletedItems);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("list"))) {
      let list = JSON.parse(localStorage.getItem("list"));
      setTodoItems(list);
    }
    if (JSON.parse(localStorage.getItem("todo"))) {
      let todo = JSON.parse(localStorage.getItem("todo"));

      setTodoCompletedItems(todo);
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("list"))) {
      let list = JSON.parse(localStorage.getItem("list"));
      setTodoItems(list);
    }
    if (JSON.parse(localStorage.getItem("todo"))) {
      let todo = JSON.parse(localStorage.getItem("todo"));

      setTodoCompletedItems(todo);
    }
  }, [localStorage.list, localStorage.todo]);

  useEffect(() => {
    props.setTodoItems(items);
    props.setCompletedItems(completedItems);
    console.log(items, completedItems);
  }, [items, completedItems]);

  const onChange = (e) => {
    setItemName(e.target.value);
  };

  // Tells what is the field we want to sort
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const getSortedClassNamesFor = (name) => {
    if (!sortSortedConfig) {
      return;
    }
    return sortSortedConfig.key === name
      ? sortSortedConfig.direction
      : undefined;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newItem = {
      id: uuid(),
      name: itemName,
    };

    if (localStorage.getItem("list") == null) {
      const list = [];
      list.push(newItem);
      localStorage.setItem("list", JSON.stringify(list));
    } else {
      const list = JSON.parse(localStorage.getItem("list"));
      list.push(newItem);
      localStorage.setItem("list", JSON.stringify(list));
    }

    const list = JSON.parse(localStorage.getItem("list"));
    const todo = JSON.parse(localStorage.getItem("todo"));

    console.log(list, todo);
    props.addItem(newItem);
    props.setCompletedItems(todo);
    props.setTodoItems(list);
    form.reset();
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <div className="todo-container">
          <div className="input-todo">
            <img src={require("../images/add-blue.svg")} alt="Add icon" />
            <input
              type="text"
              placeholder="Add a task"
              onChange={onChange}
              size="20"
            />
          </div>
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => {
              requestSort("name");
              requestCompletedSort("name");
              props.toggleSort();
              props.setRequestSort("name");
              handleLocalStorage();
            }}
            className={
              (getClassNamesFor("name"), getSortedClassNamesFor("name"))
            }
            id="field"
          >
            Sort
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
  };
};

export default connect(mapStateToProps, {
  addItem,
  setTodoItems,
  toggleSort,
  setRequestSort,
  setCompletedItems,
})(Todo);
