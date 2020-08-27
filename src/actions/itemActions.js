import {
  SET_ITEMS,
  ADD_ITEM,
  GET_SINGLE_ITEM,
  SET_COMPLETED_ITEMS,
  TOGGLE_SORT,
  REQUEST_SORT,
  SET_ID,
} from "./types";

export const setTodoItems = (items) => {
  return {
    type: SET_ITEMS,
    payload: items,
  };
};

export const setCompletedItems = (items) => {
  console.log(items);
  return {
    type: SET_COMPLETED_ITEMS,
    payload: items,
  };
};

export const setRequestSort = (item) => {
  return {
    type: REQUEST_SORT,
    payload: item,
  };
};

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

// export const deleteItem = (id) => {
//   return {
//     type: DELETE_ITEM,
//     payload: id,
//   };
// };

export const getSpecificItem = (item) => {
  return {
    type: GET_SINGLE_ITEM,
    payload: item,
  };
};

// export const toggleSort = (clicked) => ({
//   type: TOGGLE_SORT,
//   payload: clicked,
// });

// export const updateItem = (id, data) => {
//   return {
//     type: UPDATE_ITEM,
//     payload: data,
//   };
// };

export const toggleSort = () => {
  return {
    type: TOGGLE_SORT,
  };
};
