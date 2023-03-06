import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from 'redux-thunk';

// const logMiddleWare = (store) => (next) => (action) => {
//   console.log("dispatching", action);
//   let result = next(action);
//   console.log("next state", store.getState());
//   return result;
// };
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
