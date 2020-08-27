import {
  SET_ITEMS,
  ADD_ITEM,
  GET_SINGLE_ITEM,
  SET_COMPLETED_ITEMS,
  TOGGLE_SORT,
  REQUEST_SORT,
} from "../actions/types";

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
        sorting: true,
      };
    default:
      return state;
  }
}
