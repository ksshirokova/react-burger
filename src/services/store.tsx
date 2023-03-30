import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from 'redux-thunk';

const logMiddleWare = (store: any) => (next: any) => (action: any) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};
const store = createStore(rootReducer, applyMiddleware(thunk, logMiddleWare));

export type TRootState = ReturnType<typeof rootReducer>
export type TAppDispatch = typeof store.dispatch

export default store;
