import { TItem, TOrder } from "../../utils/types";
import {
  GET_MODAL_INGREDIENTS,
  GET_MODAL_ORDER,
  DELITE_MODAL_ORDER,
  CLOSE_ORDER_MODAL,
  DELITE_MODAL_INGREDIENTS,
} from "../constants";

export interface IGetModalIngredients {
  readonly type: typeof GET_MODAL_INGREDIENTS;
  readonly item: TItem;
}
export interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}



export interface IDeliteModalIng {
  readonly type: typeof DELITE_MODAL_INGREDIENTS;
  readonly item: {};
}

export interface IGetOrderModal {
  readonly type: typeof GET_MODAL_ORDER;
  readonly item: TOrder;
}
export interface IDeliteModalOrder {
  readonly type: typeof DELITE_MODAL_ORDER;
  readonly orderItem: undefined;
}

export type TIngModalActions =
  | IGetModalIngredients
  | IGetOrderModal
  | IDeliteModalIng
  | ICloseOrderModal
  | IDeliteModalOrder;

export const addModalIngredients = (item: TItem): IGetModalIngredients => {
  return {
    type: GET_MODAL_INGREDIENTS,
    item,
  };
};

export const addModalOrder = (item: TOrder): IGetOrderModal => {
  return {
    type: GET_MODAL_ORDER,
    item,
  };
};

export const deliteModalOrder = (orderItem: undefined): IDeliteModalOrder => {
  return {
    type: DELITE_MODAL_ORDER,
    orderItem,
  };
};
