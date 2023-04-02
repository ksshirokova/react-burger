import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_INGREDIENTS_COUNT,

} from "../constants";
import { TIngredientsActions } from "../actions/ingredients";

import { TItem } from "../../utils/types";
type TIngredientsState ={
  data: TItem[],
  sauce:  TItem[]
  main:  TItem[]
  bun:  TItem[]
  count: number | null,
  loading: boolean,
  error: boolean | null,
}

const initialState: TIngredientsState = {
  data: [],
  sauce: [],
  main: [],
  bun: [],
  count: null,
  loading: false,
  error: null,
};
export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        sauce: action.payload.sauce,
        main: action.payload.main,
        bun: action.payload.bun,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, error: action.payload.error, loading: false };
    }
    case CHANGE_INGREDIENTS_COUNT: {
      return { ...state, count: action.count };
    }

    default: {
      return state;
    }
  }
};
