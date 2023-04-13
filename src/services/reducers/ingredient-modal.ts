import {
  GET_MODAL_INGREDIENTS,
  DELITE_MODAL_INGREDIENTS,
  GET_MODAL_ORDER,
  DELITE_MODAL_ORDER,
} from "../constants";
import {
  TItem,
  TItemUndefined,
  TOrder,
  TOrderUndefined,
} from "../../utils/types";
import { TIngModalActions } from "../actions/ingredient-modal";

type TIngModalState = {
  item: TItem | TItemUndefined | undefined;
  ingIsOpened: boolean;
  orderItem: TOrder | undefined | TOrderUndefined;
};

export const initialState: TIngModalState = {
  item: undefined,
  ingIsOpened: false,
  orderItem: undefined,
};

export const ingredientModalReducer = (
  state = initialState,
  action: TIngModalActions
): TIngModalState => {
  switch (action.type) {
    case GET_MODAL_INGREDIENTS: {
      return {
        ...state,
        item: action.item,
      };
    }
    case GET_MODAL_ORDER: {
      return {
        ...state,
        orderItem: action.item,
      };
    }
    case DELITE_MODAL_ORDER: {
      return {
        ...state,
        orderItem: undefined,
      };
    }
    case DELITE_MODAL_INGREDIENTS: {
      return {
        ...state,
        item: undefined,
      };
    }
    
    default: {
      return state;
    }
  }
};
