import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredient-modal";
import { orderModalReducer } from "./order-modal";
import { constructorReducer } from "./constructors-ingredients";
import { routingReducer } from "./routing";
import { feedReducer } from "./feed";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientInfo: ingredientModalReducer,
  orderInfo: orderModalReducer,
  feed: feedReducer,
  constructorStore: constructorReducer,
  routeStore: routingReducer,
});
