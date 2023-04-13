import { TOrderModalActions } from "../actions/order-modal";
import {
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    RESET_ORDER_DATA,
    ADD_ORDER_FAILED,
} from "../constants";

import { initialState } from "./order-modal";
import { orderModalReducer } from "./order-modal";

describe('order-modal reducer', () => {
    it('should return the initial state', () => {
        expect(orderModalReducer(undefined, {})).toEqual(
            {
                orderItems: [],
                isOpened: false,
                loading: false,
                error: null,
            }
        )
    })
})

it('should handle OPEN_ORDER_MODAL', () => {
    expect(
        orderModalReducer(initialState, {
            type: OPEN_ORDER_MODAL,

        })
    ).toEqual({
        ...initialState,
        isOpened: true,
    });
});

it('should handle CLOSE_ORDER_MODAL', () => {
    expect(
        orderModalReducer(initialState, {
            type: CLOSE_ORDER_MODAL,

        })
    ).toEqual({
        ...initialState,
        isOpened: false,
    });
});

it('should handle ADD_ORDER_REQUEST', () => {
    expect(
        orderModalReducer(initialState, {
            type: ADD_ORDER_REQUEST,

        })
    ).toEqual({
        ...initialState,
        loading: true
    });

});

it('should handle ADD_ORDER_SUCCESS', () => {
    expect(
        orderModalReducer(initialState, {
            type: ADD_ORDER_SUCCESS,

        })
    ).toEqual({
        ...initialState,
       
        orderItems:  [{
            action:{type: "ADD_ORDER_SUCCESS"}
            }]
        
    });
});

it('should handle RESET_ORDER_DATA', () => {
    expect(
        orderModalReducer(initialState, {
            type: RESET_ORDER_DATA,

        })
    ).toEqual({
        ...initialState,
        loading: false,
        orderItems: [],
    });
});
    
it('should handle ADD_ORDER_FAILED', () => {
    expect(
        orderModalReducer(initialState, {
            type: ADD_ORDER_FAILED,
            payload: {error: 'error'}

        })
    ).toEqual({
        ...initialState,
        loading: false,
        error: 'error'
    });
});
    
    
