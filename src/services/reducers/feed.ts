
import { TFeedActions } from "../actions/feed";
import { TOrder } from "../../utils/types";
import { FEED_INIT, FEED_ERROR, FEED_CLOSE, FEED_CLOSED, FEED_MESSAGE } from "../constants";

export type TFeedState = {
    // wsConnected: boolean,

    success: boolean,
    orders: TOrder[],
    // total: number | null,
    isOpen: boolean,
    error: Event | null,
    data: any
    
    // totalToday: number | null


};

export const initialState: TFeedState  = {
    // wsConnected: false,

    success: false,
    orders: [],
    isOpen: false,
    // total: null,
    // totalToday: null
    error: null,
    data: null
    

};

export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
    switch (action.type) {
        case FEED_INIT: {
            return {
                ...state,
                isOpen: true,
                

            };
        }
        case FEED_ERROR: {
            return {
                ...state,
                isOpen: false,
                error: action.payload

            };
        }
        case FEED_MESSAGE: {
            return {
                ...state,
                isOpen: true,
                orders: action.payload.orders,
                data: action.payload
                

            };
        }
        case FEED_CLOSE: {
            return {
                ...state,
                isOpen: false

            };
        }
            case FEED_CLOSED: {
            return {
                ...state,
                isOpen: false

            };
            
            
        }
        default: {
            return state;
          }
        
    }
}
    