import { AppDispatch } from "../../utils";
import { getIngredientsApi } from "../../utils/api";
import { TItem } from "../../utils/types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_INGREDIENTS_COUNT,
} from "../constants";

export interface IGetIngRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
  readonly loading: boolean;
}

export interface IGetIngSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: {
    sauce: TItem[];
    bun: TItem[];
    main: TItem[];
    data: TItem[];
  };
}

export interface IGetIngFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IChangeIngCount {
  readonly type: typeof CHANGE_INGREDIENTS_COUNT;
  readonly count: number;
}

export type TIngredientsActions =
  | IGetIngRequest
  | IGetIngSuccess
  | IGetIngFailed
  | IChangeIngCount;

export const getIngredients = () => (dispatch: AppDispatch) => {
  //функция запроса ингредиентов, которая должна вернуть объект экшена
  dispatch({ type: GET_INGREDIENTS_REQUEST, loading: true });

  getIngredientsApi()
    .then((res: any) => {
      const apiIngredients = res.data;
      const sauce = apiIngredients.filter(
        (item: TItem) => item.type === "sauce"
      );
      const bun = apiIngredients.filter((item: TItem) => item.type === "bun");
      const main = apiIngredients.filter((item: TItem) => item.type === "main");

      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        loading: false,
        payload: { data: res.data, sauce: sauce, bun: bun, main: main },
      });
    })
    .catch((err) => {
      dispatch({ type: GET_INGREDIENTS_FAILED, error: err, loading: false });
    });
};

export const changeCount = (count: number): IChangeIngCount => {
  return {
    type: CHANGE_INGREDIENTS_COUNT,
    count,
  };
};
