import {
  GET_MODAL_INGREDIENTS,
  CLOSE_ING_MODAL,
  OPEN_ING_MODAL,
  DELITE_MODAL_INGREDIENTS,
} from "../actions/ingredient-modal";

const initialState = {
  item: {
    _id: '',
    name: '',
    price: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    type: '',
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    proteins: 0,
    __v: 0,
    uid: '',
    uuid: '',
    index: 0
  },
  ingIsOpened: false,
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


