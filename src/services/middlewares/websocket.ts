import { Middleware } from "redux"


import { feedWsActions } from "../actions/feed";



export type TWSActions={
  init: string;
  error: string;
  message: string;
  close: string;
  closed: string
  

    

}

export const WebsocketMiddleware = (WSAction: TWSActions):Middleware =>(store)=>{

    let socket: WebSocket | null = null;
    const { init, error, message, close }  = feedWsActions

    return (next) => (action) => {
      const { dispatch } = store;
  
      if (action.type === init) {
        console.log("Socked connected");
        socket = new WebSocket(action.payload);
      }
  
      if (socket) {
        socket.onerror = event => {
          dispatch({
            type: error,
            payload: event.type
          });
        };
        socket.onmessage = (event) => {
          // const parsed = JSON.parse(event.data);
          dispatch({
            type: message,
            payload: JSON.parse(event.data)
          });
        };
  
        if (action.type === close) {
          console.log("Socked closed");
          socket.close();
        }
      }
  
      return next(action);
    };

}