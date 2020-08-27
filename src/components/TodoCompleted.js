import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSpecificItem, setCompletedItems } from "../actions/itemActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { handleLocalStorage } from "../utils/handleLocalStorage";
import { deleteTodoLocalStorageItem } from "../utils/deleteLocalStorageItem";
import { v4 as uuid } from "uuid";
import CheckedCheckbox from "../images/checked.svg";

function TodoList(props) {
  const [completedList] = useState([
    {
      id: uuid(),
      name: "Buy desk",
    },
  ]);
  const [image, setImage] = useState(CheckedCheckbox);

  const UP = -1;
  const DOWN = 1;

  // Set the state to latest data from local storage or default data if empty
  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("todo"));

    if (JSON.parse(localStorage.getItem("todo"))) {
      props.setCompletedItems(item);
    } else {
      localStorage.setItem("todo", JSON.stringify(completedList));
    }
  }, []);

  function completeItem(e, item) {
    if (props.item.completedItems.length !== 0) {
      const sortedCompletedItems = props.item.completedItems;
      localStorage.setItem("todo", JSON.stringify(sortedCompletedItems));
    }

    // Deletes item from "todo" local storage key and updates state
    let index = e.target.getAttribute("data-key");
    let listValue = JSON.parse(localStorage.getItem("todo"));
    listValue.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(listValue));

    //Sorts the local storage if sorting has been enabled
    if (props.item.sorting) {
      handleLocalStorage();
    }
    props.setCompletedItems(listValue);
    props.getSpecificItem(item);

    // Updatse the "list" local storage key with new item
    if (localStorage.getItem("list") == null) {
      const completedItem = [];
      completedItem.push(item);
      localStorage.setItem("list", JSON.stringify(completedItem));
      handleLocalStorage();
    } else {
      const completedItem = JSON.parse(localStorage.getItem("list"));
      completedItem.push(item);
      localStorage.setItem("list", JSON.stringify(completedItem));
      handleLocalStorage();
    }
  }

  // Provision to delete any todo item
  function deleteItem(e, item) {
    let listValue = deleteTodoLocalStorageItem(e, item);
    if (props.item.sorting) {
      handleLocalStorage();
    }
    props.setCompletedItems(listValue);
  }

  const handleMove = (id, direction) => {
    const position = props.item.completedItems.findIndex((i) => i.id === id);
    if (position < 0) {
      throw new Error("Given item not found.");
    } else if (
      (direction === UP && position === 0) ||
      (direction === DOWN && position === props.item.completedItems.length - 1)
    ) {
      return; // cannot move outside of array
    }
    const item = props.item.completedItems[position]; // save item for later
    const newItems = props.item.completedItems.filter((i) => i.id !== id); // remove item from array
    newItems.splice(position + direction, 0, item);
    props.setCompletedItems(newItems);
    localStorage.setItem("todo", JSON.stringify(newItems));
  };

  return (
    <div>
      <h2>Completed</h2>
      <ul>
        {props.item.completedItems.map((todo, index) => (
          <div className="todo-item-container" key={`${todo.id}-${todo.name}`}>
            <img
              src={image}
              alt="Checked checkbox"
              data-key={index}
              onClick={(e) => completeItem(e, todo)}
              style={{ marginRight: "10px" }}
            />
            <li
              className="todo-item"
              style={{ textDecoration: "line-through" }}
            >
              {todo.name}
            </li>
            <div className="arrows">
              <a onClick={() => handleMove(todo.id, UP)}>&#x25B2;</a>
              <a onClick={() => handleMove(todo.id, DOWN)}>&#x25BC;</a>
            </div>
            <button
              type="button"
              data-key={index}
              onClick={(e) => deleteItem(e, todo)}
            >
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
  getSpecificItem,
  setCompletedItems,
})(TodoList);
