import { combineReducers } from "redux"

import { ingredientsReducer } from "./ingredients"
import { ingredientModalReducer } from "./ingredient-modal";
import { orderModalReducer } from "./order-modal";
import { constructorReducer } from "./constructors-ingredients";


export const rootReducer =  combineReducers({
    ingredients: ingredientsReducer,
    ingredientInfo: ingredientModalReducer,
    orderInfo: orderModalReducer,
    constructor: constructorReducer
    
    
    
});
 
// const rootState = {  //главный стейт всего приложения
//     filter: {
//         bun: [],
//         main: [],
//         sause: []
//     },

//     ingredients: {
//         data: [],
//         loading: false,
//         error: null,
//     }
// }
//import rootReducer from 'services/reducers'
//if default i can use any name 