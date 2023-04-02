import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredient-modal";
import { orderModalReducer } from "./order-modal";
import { constructorReducer } from "./constructors-ingredients";
import { routingReducer } from "./routing";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientInfo: ingredientModalReducer,
  orderInfo: orderModalReducer,
  constructorStore: constructorReducer,
  routeStore: routingReducer
});
