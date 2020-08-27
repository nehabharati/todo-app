import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addItem,
  getSpecificItem,
  setCompletedItems,
  setTodoItems,
  toggleMove,
  toggleSort,
} from "../actions/itemActions";
import { v4 as uuid } from "uuid";
import { handleLocalStorage } from "../utils/handleLocalStorage";
import { deleteLocalStorageItem } from "../utils/deleteLocalStorageItem";
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
    const position = props.item.items.findIndex((i) => i.id === id);
    if (position < 0) {
      throw new Error("Given item not found.");
    } else if (
      (direction === UP && position === 0) ||
      (direction === DOWN && position === props.item.items.length - 1)
    ) {
      return; // cannot move outside of array
    }
    const item = props.item.items[position]; // save item for later
    const newItems = props.item.items.filter((i) => i.id !== id); // remove item from array
    newItems.splice(position + direction, 0, item);
    props.setTodoItems(newItems);
    localStorage.setItem("list", JSON.stringify(newItems));
    props.toggleSort(false);
    props.toggleMove(true);
  };

  return (
    <div>
      {props.item.items.length === 0 && (
        <h2 className="empty-container">No items here!</h2>
      )}
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
  toggleMove,
  toggleSort,
})(TodoList);
