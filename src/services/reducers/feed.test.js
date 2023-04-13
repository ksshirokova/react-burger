
import {
    FEED_INIT,
    FEED_ERROR,
    FEED_CLOSE,
    FEED_CLOSED,
    FEED_MESSAGE,
} from "../constants";
import { initialState } from "./feed";
import { feedReducer } from "./feed";
import { feedOrders } from "../constants/test-data";


describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {})).toEqual(
            {
                success: false,
                orders: [],
                isOpen: false,
                error: null,
                data: null,
            }
        )
    })
})

it('should handle FEED_INIT', () => {
    expect(
        feedReducer(initialState, {
            type: FEED_INIT,

        })
    ).toEqual({
        ...initialState,
        isOpen: true

    });
});

it('should handle FEED_ERROR', () => {
    expect(
        feedReducer(initialState, {
            type: FEED_ERROR,
            payload: 'error'
        })
    ).toEqual({
        ...initialState,
        isOpen: false,
        error: 'error'

    });
});

it('should handle FEED_MESSAGE', () => {
    expect(
        feedReducer(initialState, {
            type: FEED_MESSAGE,
            payload: feedOrders

        })
    ).toEqual({
        ...initialState,
        isOpen: true,
        orders: feedOrders.orders,
        data: feedOrders,

    });
});

it('should handle FEED_CLOSE', () => {
    expect(
        feedReducer(initialState, {
            type: FEED_CLOSE,

        })
    ).toEqual({
        ...initialState,
        isOpen: false,


    });
});

it('should handle FEED_CLOSED', () => {
    expect(
        feedReducer(initialState, {
            type: FEED_CLOSED,

        })
    ).toEqual({
        ...initialState,
        isOpen: false,


    });
});









