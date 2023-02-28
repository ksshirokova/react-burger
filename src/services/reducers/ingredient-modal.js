import {
  GET_MODAL_INGREDIENTS,
  CLOSE_ING_MODAL,
  OPEN_ING_MODAL,
  DELITE_MODAL_INGREDIENTS,
} from "../actions/ingredient-modal";

const initialState = {
  item: {},
  isOpened: false,
};

export const ingredientModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODAL_INGREDIENTS: {
      return {
        ...state,
        item: action.item,
      };
    }
    case DELITE_MODAL_INGREDIENTS: {
      return {
        ...state,
        item: {},
      };
    }
    case OPEN_ING_MODAL: {
      return {
        ...state,
        isOpened: true,
      };
    }
    case CLOSE_ING_MODAL: {
      return {
        ...state,
        isOpened: false,
      };
    }
    default: {
      return state;
    }
  }
};


