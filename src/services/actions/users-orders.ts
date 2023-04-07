
import { ORDERS_CLOSE, ORDERS_INIT, ORDERS_MESSAGE, ORDERS_ERROR } from "../constants";
import { TAppDispatch } from "../../utils/hooks-types";

export const ordersWsActions = {
    init: ORDERS_INIT,
    message: ORDERS_MESSAGE,
    close: ORDERS_CLOSE,
    error: ORDERS_ERROR,
    closed: ORDERS_CLOSE
};

export type TOrdersInitAction = {
    readonly type: typeof ORDERS_INIT;
    readonly payload: string | URL;
}



export type TOrdersErrorAction = {
    readonly type: typeof ORDERS_ERROR;
    readonly payload: Event;
}



export type TOrdersCloseAction = {
    readonly type: typeof ORDERS_CLOSE;
    readonly error?: any;
    readonly payload?: any;
}

export type TOrdersMessageAction = {
    readonly type: typeof ORDERS_MESSAGE;
    readonly payload: string;
}

export type TOrdersActions =
    | TOrdersInitAction
    | TOrdersMessageAction
    | TOrdersErrorAction
    | TOrdersCloseAction



export const ordersInitAction = (url: string | URL) => (dispatch: TAppDispatch) => {
    dispatch({ type: ORDERS_INIT, payload: url })
}



export const ordersCloseAction = () => (dispatch: TAppDispatch) => {
    dispatch({
        type: ORDERS_CLOSE
    })

}