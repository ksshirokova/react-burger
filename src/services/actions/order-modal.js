import { useDispatch } from "react-redux";
import { sendOrdersData } from "../../utils/api";

export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const CLEAN_ORDER = "CLEAN_ORDER";
export const ADD_ORDER_REQUEST = "ADD_ORDER_REQUEST";
export const ADD_ORDER_FAILED = "ADD_ORDER_FAILED";
export const RESET_ORDER_DATA = "RESET_ORDER_DATA";

export const sendOrder = (data) =>(dispatch)=> {
  dispatch({ type: ADD_ORDER_REQUEST });
  
  sendOrdersData(data)
    .then((res) => {
      dispatch({
        type: ADD_ORDER_SUCCESS,
        ...res,
      });
    })
    .then((res) => dispatch({ type: RESET_ORDER_DATA, ...res }))

    .catch((err) => {
      dispatch({ type: ADD_ORDER_FAILED, payload: { error: err } });
    });
};
