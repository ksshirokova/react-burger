import {
    GET_MODAL_INGREDIENTS,
    DELITE_MODAL_INGREDIENTS,
    GET_MODAL_ORDER,
    DELITE_MODAL_ORDER,
} from "../constants";
import { mainElement, orderItems } from "../constants/test-data";

import { initialState } from "./ingredient-modal";
import { ingredientModalReducer } from "./ingredient-modal";

describe('ingredient-modal reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientModalReducer(undefined, {})).toEqual(
            {
                item: undefined,
                ingIsOpened: false,
                orderItem: undefined,
            }
        )
    })
})

it('should handle GET_MODAL_INGREDIENTS', () => {
    expect(
        ingredientModalReducer(initialState, {
            type: GET_MODAL_INGREDIENTS,
            item: mainElement

        })
    ).toEqual({
        ...initialState,
        item: mainElement

    });
});

it('should handle GET_MODAL_ORDER', () => {
    expect(
        ingredientModalReducer(initialState, {
            type: GET_MODAL_ORDER,
            item: orderItems

        })
    ).toEqual({
        ...initialState,
        orderItem: orderItems

    });
});

it('should handle DELITE_MODAL_ORDER', () => {
    expect(
        ingredientModalReducer(initialState, {
            type: DELITE_MODAL_ORDER,

        })
    ).toEqual({
        ...initialState,
        orderItem: undefined

    });
});

it('should handle DELITE_MODAL_INGREDIENTS', () => {
    expect(
        ingredientModalReducer(initialState, {
            type: DELITE_MODAL_INGREDIENTS,

        })
    ).toEqual({
        ...initialState,
        item: undefined

    });
});




      


    