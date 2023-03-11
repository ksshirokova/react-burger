import {
  DRAG_CONSTRUCTOR_ELEMENT,
  DROP_CONSTRUCTOR_ELEMENT,
  DELITE_ELEMENT,
  CHECK_DROPED_ELEMENT,
} from "../actions/constructors-ingredients";
import {
  SEND_ORDER_DATA_REQUEST,
  SEND_ORDER_DATA_SUCCESS,
  SEND_ORDER_DATA_FAILED,
  DROP_MOVED_ELEMENT,
} from "../actions/constructors-ingredients";

const initialState = {
  draggedElement: {},
  draggedBuns: [],
  draggedFilling: [],
};

export const constructorReducer = (state = initialState, action) => {
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
            ? [...state.draggedFilling, state.draggedElement ]
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
    case SEND_ORDER_DATA_REQUEST: {
      return { ...state, loading: true };
    }

    case SEND_ORDER_DATA_SUCCESS: {
      return { ...state, loading: false, ingredients: state.draggedFilling.id };
    }
    case SEND_ORDER_DATA_FAILED: {
      return { ...state, error: action.payload.error, loading: false };
    }

    default: {
      return state;
    }
  }
};
