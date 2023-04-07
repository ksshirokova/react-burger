
import { TOrdersActions } from "../actions/users-orders";
import { TOrder } from "../../utils/types";
import { ORDERS_INIT, ORDERS_ERROR, ORDERS_CLOSE, ORDERS_MESSAGE } from "../constants";

export type TOrdersState = {
    // wsConnected: boolean,

    success: boolean,
    orders: TOrder[],
    // total: number | null,
    isOpen: boolean,
    error: Event | null,
    data: any,
    info: any
    
    // totalToday: number | null


};

export const initialState: TOrdersState  = {
    // wsConnected: false,

    success: false,
    orders: [],
    isOpen: false,
    // total: null,
    // totalToday: null
    error: null,
    data: null,
    info: null
    

};

export const orderReducer = (state = initialState, action: TOrdersActions): TOrdersState => {
    switch (action.type) {
        case ORDERS_INIT: {
            return {
                ...state,
                isOpen: true,
                

            };
        }
        case ORDERS_ERROR: {
            return {
                ...state,
                isOpen: false,
                error: action.payload

            };
        }
        case ORDERS_MESSAGE: {
            return {
                ...state,
                isOpen: true,
                info: action.payload,
                
                data: action.payload
                

            };
        }
        case ORDERS_CLOSE: {
            return {
                ...state,
                isOpen: false,
                error: action.payload

            };
        }
            
            
            
        
        default: {
            return state;
          }
        
    }
}
    