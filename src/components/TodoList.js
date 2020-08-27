import React, { useState, Component, useEffect } from "react";
import { connect } from "react-redux";
import {
  addItem,
  getSpecificItem,
  setCompletedItems,
  setTodoItems,
} from "../actions/itemActions";
import { v4 as uuid } from "uuid";
import { handleLocalStorage } from "../utils/handleLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoList(props) {
  const [todoList, setTodoList] = useState([
    {
      id: uuid(),
      name: "Buy groceries",
    },
  ]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("list"));
    if (JSON.parse(localStorage.getItem("list"))) {
      props.setTodoItems(list);
    }

    // else {
    console.log("hi");
    props.setCompletedItems(list);
    // }
    // setTodoList(list);
  }, []);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("list"));
    props.setTodoItems(list);
  }, [props.item.specificItem, localStorage.list]);

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
    setTodoList(listValue);

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

  console.log(todoList, props.item.items);
  return (
    <div>
      <h2>Todo</h2>

      <ul>
        {props.item.items.map((todo, index) => (
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
        {
          // props.item.items ?
          // props.item.items.map((todo, index) => (
          //   <div
          //     className="todo-item-container"
          //     key={`${todo.id}-${todo.name}`}
          //   >
          //     <input
          //       type="checkbox"
          //       data-key={index}
          //       onClick={(e) => completeItem(e, todo)}
          //     />
          //     <span className="active-item">
          //       <li className="todo-item">{todo.name}</li>
          //       <FontAwesomeIcon
          //         icon={faTrashAlt}
          //         style={{
          //           color: "#8b98a7",
          //           display: "flex",
          //           justifySelf: "flex-end",
          //         }}
          //       />
          //     </span>
          //   </div>
          // ))
          //   :
          // todoList.map((todo, index) => (
          //   <div
          //     className="todo-item-container"
          //     key={`${todo.id}-${todo.name}`}
          //   >
          //     <input
          //       type="checkbox"
          //       data-key={index}
          //       onClick={(e) => completeItem(e, todo)}
          //     />
          //     <li className="todo-item">{todo.name}</li>
          //   </div>
          // ))
        }
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
