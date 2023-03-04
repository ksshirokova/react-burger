export const DRAG_CONSTRUCTOR_ELEMENT = 'DRAG_CONSTRUCTOR_ELEMENT'
export const DROP_CONSTRUCTOR_ELEMENT = 'DROP_CONSTRUCTOR_ELEMENT'
export const DELITE_ELEMENT = 'DELITE_ELEMENT'
export const CALCULATE_COST = 'CALCULATE_COST'
export const SEND_ORDER_DATA_REQUEST = 'SEND_ORDER_DATA_REQUEST'
export const SEND_ORDER_DATA_SUCCESS = 'SEND_ORDER_DATA_SUCCESS'
export const SEND_ORDER_DATA_FAILED = 'SEND_ORDER_DATA_FAILED'
export const DRAG_MOVED_CONSTRUCTOR_ELEMENT = 'DRAG_MOVED_CONSTRUCTOR_ELEMENT'
export const DROP_MOVED_ELEMENT ='DROP_MOVED_ELEMENT'

export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT'
// import { sendOrdersData } from '../../utils/api';


export const addDraggedElement = (item) => {
    return {
        type: DRAG_CONSTRUCTOR_ELEMENT,
        item
    }
}

export const addDraggedConstructorElement = (item) => {
    return {
        type: DRAG_MOVED_CONSTRUCTOR_ELEMENT,
        item
    }
}

// export const dropElement = () => {
//     return {
//         type: DROP_CONSTRUCTOR_ELEMENT,
        
        
//     }
// }

// export const dropMovedIngredient = (fromIndex, toIndex) => {
//     return {
//         type: DROP_MOVED_ELEMENT,
//         fromIndex, toIndex
//     }
// }