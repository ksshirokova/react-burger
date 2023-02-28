export const DRAG_CONSTRUCTOR_ELEMENT = 'DRAG_CONSTRUCTOR_ELEMENT'
export const DROP_CONSTRUCTOR_ELEMENT = 'DROP_CONSTRUCTOR_ELEMENT'
export const DELITE_ELEMENT = 'DELITE_ELEMENT'

export const addDraggedElement = (item)=>{
    return {
        type: DRAG_CONSTRUCTOR_ELEMENT,
        item
    }
}