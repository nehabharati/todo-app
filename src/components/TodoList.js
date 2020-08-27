import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addItem,
  getSpecificItem,
  setCompletedItems,
  setTodoItems,
} from "../actions/itemActions";
import { v4 as uuid } from "uuid";
import { handleLocalStorage } from "../utils/handleLocalStorage";
import { deleteLocalStorageItem } from "../utils/deleteLocalStorageItem";
import { moveItems } from "../utils/moveItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import UncheckedCheckbox from "../images/not-checked.svg";

function TodoList(props) {
  const [todoList] = useState([
    {
      id: uuid(),
      name: "Buy groceries",
    },
  ]);
  const [image] = useState(UncheckedCheckbox);

  const UP = -1;
  const DOWN = 1;

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("list"));
    if (JSON.parse(localStorage.getItem("list"))) {
      props.setTodoItems(list);
    } else {
      localStorage.setItem("list", JSON.stringify(todoList));
    }
  }, []);

  function completeItem(e, item) {
    let index = e.target.getAttribute("data-key");
    props.getSpecificItem(item);
    let listValue = JSON.parse(localStorage.getItem("list"));
    listValue.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(listValue));
    if (props.item.sorting) {
      handleLocalStorage();
    }
    props.setTodoItems(listValue);

    if (localStorage.getItem("todo") == null) {
      const completedItem = [];
      completedItem.push(item);
      localStorage.setItem("todo", JSON.stringify(completedItem));
      handleLocalStorage();
    } else {
      const completedItem = JSON.parse(localStorage.getItem("todo"));
      completedItem.push(item);
      localStorage.setItem("todo", JSON.stringify(completedItem));
      handleLocalStorage();
    }
  }

  function deleteItem(e) {
    let listValue = deleteLocalStorageItem(e, "list");
    if (props.item.sorting) {
      handleLocalStorage();
    }
    props.setTodoItems(listValue);
  }

  const handleMove = (id, direction) => {
    let newItems = moveItems(id, direction, props.item.items);
    props.setTodoItems(newItems);
    localStorage.setItem("list", JSON.stringify(newItems));
  };

  return (
    <div>
      <h2>Todo</h2>
      <ul>
        {props.item.items.map((todo, index) => (
          <div className="todo-item-container" key={`${todo.id}-${todo.name}`}>
            <img
              src={image}
              alt="Unchecked checkbox"
              data-key={index}
              onClick={(e) => completeItem(e, todo)}
              style={{ marginRight: "10px" }}
            />
            <li className="todo-item">{todo.name}</li>
            <div className="arrows">
              <a onClick={() => handleMove(todo.id, UP)}>&#x25B2;</a>
              <a onClick={() => handleMove(todo.id, DOWN)}>&#x25BC;</a>
            </div>
            <button data-key={index} onClick={(e) => deleteItem(e, todo)}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ color: "#c22a22", float: "right" }}
              />
            </button>
          </div>
        ))}
      </ul>
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
  getSpecificItem,
  setCompletedItems,
  setTodoItems,
})(TodoList);
