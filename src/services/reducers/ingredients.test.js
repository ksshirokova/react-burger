import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    CHANGE_INGREDIENTS_COUNT,

} from "../constants";
import { initialState } from "./ingredients";
import { ingredientsReducer } from "./ingredients";
import { bunElement, ingredients, mainElement, sauceElement } from "../constants/test-data";

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(
            {
                data: [],
                sauce: [],
                main: [],
                bun: [],
                count: null,
                loading: false,
                error: null,
            }
        )
    })
})


it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
        ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_REQUEST
        })
    ).toEqual({
        ...initialState,
        data: [],
        sauce: [],
        main: [],
        bun: [],
        count: null,
        loading: true,
        error: null,
        

    });
});

it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
        ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            payload: {
                data: ingredients,
                sauce: sauceElement,
                main: mainElement,
                bun: bunElement
            }

        })
    ).toEqual({

        ...initialState,
        loading: false,
        data: ingredients,
        sauce: sauceElement,
        main: mainElement,
        bun: bunElement,
        count: null,
        error: null


    });
});

it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
        ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_FAILED,
            payload: ingredients

        })
    ).toEqual({
        data: [],
        sauce: [],
        main: [],
        bun: [],
        count: null,
        loading: false,
        error: null,

    });
});

it('should handle CHANGE_INGREDIENTS_COUNT', () => {
    expect(
        ingredientsReducer(initialState, {
            type: CHANGE_INGREDIENTS_COUNT,
count: 123

        })
    ).toEqual({
        ...initialState,
        data: [],
        sauce: [],
        main: [],
        bun: [],
        
        loading: false,
        error: null,
        count: 123
        
    });
});



