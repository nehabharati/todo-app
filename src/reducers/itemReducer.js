import {
  SET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM,
  GET_SINGLE_ITEM,
  SET_COMPLETED_ITEMS,
  TOGGLE_SORT,
  REQUEST_SORT,
  SET_ID,
} from "../actions/types";
import { v4 as uuid } from "uuid";

const initialState = {
  items: [],
  completedItems: [],
  specificItem: {},
  requestSort: "",
  sorting: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case SET_COMPLETED_ITEMS:
      console.log(action.payload);
      return {
        ...state,
        completedItems: action.payload,
      };
    // case DELETE_ITEM:
    //   return {
    //     ...state,
    //     items: state.items.filter((item) => item._id !== action.payload),
    //   };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case REQUEST_SORT:
      return {
        ...state,
        requestSort: action.payload,
      };
    // case SET_ID:
    //   return {
    //     ...state,
    //     id: action.payload,
    //   };
    // case UPDATE_ITEM:
    //   return Object.assign({}, state, {
    //     specificItem: action.payload,
    //   });
    case GET_SINGLE_ITEM:
      return Object.assign({}, state, {
        specificItem: action.payload,
      });
    // case TOGGLE_SORT:
    //   return state.items.map((todo) =>
    //     todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
    //   );
    case TOGGLE_SORT:
      return {
        ...state,
        sorting: true,
      };
    default:
      return state;
  }
}
