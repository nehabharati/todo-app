import {
  SET_ITEMS,
  ADD_ITEM,
  GET_SINGLE_ITEM,
  SET_COMPLETED_ITEMS,
  TOGGLE_SORT,
  REQUEST_SORT,
} from "./types";

export const setTodoItems = (items) => {
  return {
    type: SET_ITEMS,
    payload: items,
  };
};

export const setCompletedItems = (items) => {
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

export const getSpecificItem = (item) => {
  return {
    type: GET_SINGLE_ITEM,
    payload: item,
  };
};

export const toggleSort = () => {
  return {
    type: TOGGLE_SORT,
  };
};
