import { Middleware } from "redux";

import { feedWsActions } from "../actions/feed";

export type TWSActions = {
  init: string;
  error: string;
  message: string;
  close: string;
  closed: string;
};

export const socketMiddleware =
  (WSAction: TWSActions): Middleware =>
  (store) => {
    let socket: WebSocket | null = null;
    const { init, error, message, close } = feedWsActions;

    return (next) => (action) => {
      const { dispatch } = store;

      if (action.type === init) {
        socket = new WebSocket(action.payload);
        console.log("сокет соединение установлено");
      }

      if (socket) {
        socket.onerror = (event) => {
          dispatch({
            type: error,
            payload: event.type,
          });
          console.log("ошибка сокет соединения");
        };
        socket.onmessage = (event) => {
          dispatch({
            type: message,
            payload: JSON.parse(event.data),
          });
        };

        if (action.type === close) {
          socket.close();
          console.log("соедиение закрыто");
        }
      }

      return next(action);
    };
  };
