import { sendOrdersData } from "../../utils/api";
import { OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL, ADD_ORDER_SUCCESS, ADD_ORDER_REQUEST, ADD_ORDER_FAILED, RESET_ORDER_DATA } from '../constants'
import { TItem, TItemUndefined } from "../../utils/types";
import { AppDispatch } from "../../utils";

export interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL;
}

export interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;

}

export interface IAddOrderSuccess {
  readonly type: typeof ADD_ORDER_SUCCESS;

}

export interface IAddOrderRequest {
  readonly type: typeof ADD_ORDER_REQUEST;
  
}

export interface IAddOrderFailed {
  readonly type: typeof ADD_ORDER_FAILED;
  readonly payload: { error: string }
 
}

export interface IResetOrderData {
  readonly type: typeof RESET_ORDER_DATA;

}

export type TOrderModalActions =
  | IOpenOrderModal
  | ICloseOrderModal
  | IAddOrderSuccess
  | IAddOrderRequest
  | IAddOrderFailed
  | IResetOrderData



export const sendOrder = (data: TItem[] | TItemUndefined[])=> (dispatch: AppDispatch) => {
  dispatch({ type: ADD_ORDER_REQUEST });

  sendOrdersData(data)
    .then((res: any) => {
      dispatch({
        type: ADD_ORDER_SUCCESS,

        ...res,
      });
    })
    .then((res: any) => {
      dispatch({ type: RESET_ORDER_DATA, ...res })

    }
    )


    .catch((err) => {
      dispatch({ type: ADD_ORDER_FAILED,  payload: { error: err } });
    });
};
