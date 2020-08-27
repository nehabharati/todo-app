import React, { useState, Component, useEffect } from "react";
import { connect } from "react-redux";
import { getSpecificItem, setCompletedItems } from "../actions/itemActions";
import useSortableData from "../hooks/useSortableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { handleLocalStorage } from "../utils/handleLocalStorage";
import { v4 as uuid } from "uuid";
function TodoList(props) {
  const [completedList, setCompletedList] = useState([
    {
      id: uuid(),
      name: "Buy desk",
    },
  ]);
  console.log(completedList, props.item.sorting, props.item.completedItems);

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("todo"));
    if (JSON.parse(localStorage.getItem("todo"))) {
      setCompletedList(item);
      props.setCompletedItems(item);
    }

    // else {
    console.log("heeeeei");
    props.setCompletedItems(completedList);
    // }
  }, []);

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("todo"));
    setCompletedList(item);
    props.setCompletedItems(item);
  }, [props.item.specificItem, localStorage.todo]);

  function completeItem(e, item) {
    if (props.item.completedItems.length !== 0) {
      const sortedCompletedItems = props.item.completedItems;
      console.log(sortedCompletedItems);

      localStorage.setItem("todo", JSON.stringify(sortedCompletedItems));
    }
    let index = e.target.getAttribute("data-key");
    let listValue = JSON.parse(localStorage.getItem("todo"));
    listValue.splice(index, 1);

    localStorage.setItem("todo", JSON.stringify(listValue));
    if (props.item.sorting) {
      handleLocalStorage();
    }
    setCompletedList(listValue);
    props.setCompletedItems(listValue);
    props.getSpecificItem(item);

    if (localStorage.getItem("list") == null) {
      console.log("hi");
      const completedItem = [];
      completedItem.push(item);
      localStorage.setItem("list", JSON.stringify(completedItem));
      handleLocalStorage();
    } else {
      console.log("bye", item);
      const completedItem = JSON.parse(localStorage.getItem("list"));
      completedItem.push(item);
      localStorage.setItem("list", JSON.stringify(completedItem));
      handleLocalStorage();
    }
  }

  return (
    <div>
      <h2>Completed</h2>

      <ul>
        {props.item.completedItems.map((todo, index) => (
          <div className="todo-item-container" key={`${todo.id}-${todo.name}`}>
            <input
              type="checkbox"
              data-key={index}
              onChange={(e) => completeItem(e, todo)}
              checked
            />
            <li className="todo-item">{todo.name}</li>
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
