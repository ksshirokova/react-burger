import {
  GET_MODAL_INGREDIENTS,
  CLOSE_ING_MODAL,
  OPEN_ING_MODAL,
  DELITE_MODAL_INGREDIENTS,
} from "../constants";
import { TItem, TItemUndefined } from "../../utils/types";
import { TIngModalActions } from "../actions/ingredient-modal";

type TIngModalState = {
  item: TItem | TItemUndefined | undefined,
  ingIsOpened: boolean,
}

const initialState: TIngModalState = {
  item: undefined,
  ingIsOpened: false,
};

export const ingredientModalReducer = (state = initialState, action: TIngModalActions): TIngModalState => {
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
        item: undefined,
      };
    }
    case OPEN_ING_MODAL: {
      return {
        ...state,
        ingIsOpened: true,
      };
    }
    case CLOSE_ING_MODAL: {
      return {
        ...state,
        ingIsOpened: false,
      };
    }
    default: {
      return state;
    }
  }
};


