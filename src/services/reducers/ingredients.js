
import {
    GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, DRAG_DRAGGED_ELEMENT, DROP_DRAGGED_ELEMENT

} from '../actions/ingredients';

const initialState = {
    data: [],
    sauce: [],
    main: [],
    bun: [],
    loading: false,
    error: null,


}
export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return { ...state, loading: true }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, loading: false, data: action.payload.data, sauce: action.payload.sauce, main: action.payload.main, bun: action.payload.bun }
        }
        case GET_INGREDIENTS_FAILED: {
            return { ...state, error: action.payload.error, loading: false }
        }
        
        default: {
            return state;
        }
    }

}