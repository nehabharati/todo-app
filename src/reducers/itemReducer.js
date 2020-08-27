import {
  SET_ITEMS,
  ADD_ITEM,
  GET_SINGLE_ITEM,
  SET_COMPLETED_ITEMS,
  TOGGLE_SORT,
  REQUEST_SORT,
  SET_MOVING,
} from "../actions/types";

const initialState = {
  items: [],
  completedItems: [],
  specificItem: {},
  requestSort: "",
  sorting: false,
  moving: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case SET_COMPLETED_ITEMS:
      return {
        ...state,
        completedItems: action.payload,
      };

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
    case GET_SINGLE_ITEM:
      return Object.assign({}, state, {
        specificItem: action.payload,
      });
    case TOGGLE_SORT:
      return {
        ...state,
        sorting: action.payload,
      };
    case SET_MOVING:
      return {
        ...state,
        moving: action.payload,
      };
    default:
      return state;
  }
}
