import {
  FEED_INIT,
  FEED_SUCCESS,
  FEED_ERROR,
  FEED_CLOSED,
  FEED_CLOSE,
  FEED_MESSAGE,
} from "../constants";
import { TAppDispatch } from "../../utils/hooks-types";

export type TFeedWsState = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
};

export const feedWsActions = {
  init: FEED_INIT,
  message: FEED_MESSAGE,
  close: FEED_CLOSE,
  closed: FEED_CLOSED,
  error: FEED_ERROR,
};

export type TFeedInitAction = {
  readonly type: typeof FEED_INIT;
  readonly payload: string | URL;
};

export type TFeedSuccessAction = {
  readonly type: typeof FEED_SUCCESS;
  readonly payload: Event;
};

export type TFeedErrorAction = {
  readonly type: typeof FEED_ERROR;
  readonly payload: Event;
};

export type TFeedClosedAction = {
  readonly type: typeof FEED_CLOSED;
};

export type TFeedCloseAction = {
  readonly type: typeof FEED_CLOSE;
};

export type TFeedMessageAction = {
  readonly type: typeof FEED_MESSAGE;
  readonly payload: any;
};

export type TFeedActions =
  | TFeedInitAction
  | TFeedSuccessAction
  | TFeedErrorAction
  | TFeedClosedAction
  | TFeedCloseAction
  | TFeedMessageAction;

export const feedInitAction =
  (url: string | URL) => (dispatch: TAppDispatch) => {
    dispatch({ type: FEED_INIT, payload: url });
  };

export const feedCloseAction = () => (dispatch: TAppDispatch) => {
  dispatch({
    type: FEED_CLOSE,
  });
};
