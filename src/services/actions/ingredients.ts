
import { AppDispatch, AppThunk } from "../../utils";
import { getIngredientsApi } from "../../utils/api";
import { TItem } from "../../utils/types";
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, CHANGE_INGREDIENTS_COUNT } from '../constants'

export interface IGetIngRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
  readonly loading: boolean;
}

export interface IGetIngSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly loading: boolean;
  readonly data: TItem[];
  readonly sauce: TItem[];
  readonly main: TItem[];
  readonly bun: TItem[];
  readonly payload: any;
}

export interface IGetIngFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly loading: boolean;
  readonly payload: any;
  readonly error: boolean
}

export interface IChangeIngCount {
  readonly type: typeof CHANGE_INGREDIENTS_COUNT;
  readonly loading?: boolean;
  readonly count: number;
  readonly payload?: any;
}

export type TIngredientsActions =
| IGetIngRequest
| IGetIngSuccess
| IGetIngFailed
| IChangeIngCount

export const getIngredients = () => (dispatch: AppDispatch) => {
  //функция запроса ингредиентов, которая должна вернуть объект экшена
  dispatch({ type: GET_INGREDIENTS_REQUEST });

  getIngredientsApi()
    .then((res: any) => {
      const apiIngredients = res.data;
      const sauce = apiIngredients.filter((item: TItem) => item.type === "sauce");
      const bun = apiIngredients.filter((item: TItem) => item.type === "bun");
      const main = apiIngredients.filter((item: TItem) => item.type === "main");

      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: { data: res.data, sauce: sauce, bun: bun, main: main },
      });
    })
    .catch((err) => {
      dispatch({ type: GET_INGREDIENTS_FAILED, payload: { error: err } });
    });
};

export const changeCount = (count: number): IChangeIngCount => {
  return {
    type: CHANGE_INGREDIENTS_COUNT,
    count,
  };
};
