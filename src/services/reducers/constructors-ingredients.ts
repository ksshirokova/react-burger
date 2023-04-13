import {
  DRAG_CONSTRUCTOR_ELEMENT,
  DROP_CONSTRUCTOR_ELEMENT,
  DELITE_ELEMENT,
  CHECK_DROPED_ELEMENT,
  DROP_MOVED_ELEMENT,
  CLEAN_CONSTRUCTOR,
} from "../constants";

import { TItem, TItemUndefined } from "../../utils/types";
import { TConstructorActions } from "../actions/constructors-ingredients";

type TConstructorState = {
  draggedElement: any;
  draggedBuns: TItem[] | TItemUndefined[];
  draggedFilling: TItem[] | TItemUndefined[];
};

const initialState: TConstructorState = {
  draggedElement: {},
  draggedBuns: [],
  draggedFilling: [],
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case DROP_CONSTRUCTOR_ELEMENT: {
      return {
        ...state,
        draggedBuns:
          state.draggedElement.type === "bun"
            ? [state.draggedElement]
            : [...state.draggedBuns],
        draggedFilling:
          state.draggedElement.type !== "bun"
            ? [...state.draggedFilling, state.draggedElement]
            : [...state.draggedFilling],

        draggedElement: {},
      };
    }
    case CHECK_DROPED_ELEMENT: {
      return {
        ...state,
        draggedFilling: state.draggedFilling.filter((el) => el.name),
      };
    }

    case DROP_MOVED_ELEMENT: {
      const fromIndex = action.payload.fromIndex;
      const toIndex = action.payload.toIndex;

      const ingredients = [...state.draggedFilling];
      ingredients.splice(fromIndex, 0, ingredients.splice(toIndex, 1)[0]);
      return {
        ...state,
        draggedFilling: ingredients,
      };
    }

    case DRAG_CONSTRUCTOR_ELEMENT: {
      return { ...state, draggedElement: action.item };
    }

    case DELITE_ELEMENT: {
      return {
        ...state,
        draggedFilling: [
          ...state.draggedFilling.slice(0, action.payload),
          ...state.draggedFilling.slice(action.payload + 1),
        ],
      };
    }

    case CLEAN_CONSTRUCTOR: {
      return { ...state, draggedBuns: [], draggedFilling: [] };
    }

    default: {
      return state;
    }
  }
};
