import {
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  RESET_ORDER_DATA,
  ADD_ORDER_FAILED,
} from "../actions/order-modal";

const initialState = {
  orderItems: [],
  isOpened: false,
  loading: false,
};

export const orderModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOpened: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOpened: false,
      };
    }
    case ADD_ORDER_REQUEST: {
      return { ...state, loading: true };
    }
    case ADD_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        orderItems: [{ action }],
      };
    }
    case RESET_ORDER_DATA: {
      return {
        ...state,
      };
    }
    case ADD_ORDER_FAILED: {
      return { ...state, error: action.payload.error, loading: false };
    }

    default: {
      return state;
    }
  }
};
