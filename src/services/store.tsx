import { applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux'
import { socketMiddleware } from "./middlewares/websocket";
import { composeWithDevTools } from "redux-devtools-extension";
import { feedWsActions } from "./actions/feed";


const logMiddleWare = (store: any) => (next: any) => (action: any) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logMiddleWare, socketMiddleware(feedWsActions))));



export default store;
