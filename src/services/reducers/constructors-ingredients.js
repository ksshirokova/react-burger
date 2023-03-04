import { DRAG_CONSTRUCTOR_ELEMENT, DROP_CONSTRUCTOR_ELEMENT, DELITE_ELEMENT } from '../actions/constructors-ingredients'
import { SEND_ORDER_DATA_REQUEST, SEND_ORDER_DATA_SUCCESS, DRAG_MOVED_CONSTRUCTOR_ELEMENT, SEND_ORDER_DATA_FAILED, MOVE_CONSTRUCTOR_ELEMENT, DROP_MOVED_ELEMENT } from '../actions/constructors-ingredients'

const initialState = {

    movedElement: {},
    draggedElement: {},
    draggedFilling: [],
    draggedBuns: [],


}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case DROP_CONSTRUCTOR_ELEMENT: {
            if (state.draggedElement) {
                return {
                    ...state,
                    draggedBuns:
                        state.draggedElement.type === "bun"
                            ? [state.draggedElement]
                            : [...state.draggedBuns],
                    draggedFilling:
                        state.draggedElement.type !== "bun"
                            ? [...state.draggedFilling, state.draggedElement]
                            : [...state.draggedFilling],

                    draggedElement: {}
                }
            }
            else {
                return 
            }
        }




        case DROP_MOVED_ELEMENT: {
            const fromIndex = action.payload.fromIndex
            const toIndex = action.payload.toIndex

            const ingredients = [...state.draggedFilling]
            ingredients.splice(fromIndex, 0,
                ingredients.splice(toIndex, 1)[0])
            return {
                ...state,
                draggedFilling: ingredients
            }
        }
        // после захвата элемента в конструторе му удаляем его из списка и вставляем когда отпускаем, но уже на другой индекс
        // если индекс драгд елемента равен индесксу 
        // должен вернуть массив из элементов в выбранном поорядке



        case DRAG_CONSTRUCTOR_ELEMENT: {
            return { ...state, draggedElement: action.item }
        }

        case DRAG_MOVED_CONSTRUCTOR_ELEMENT: {
            return {
                ...state, movedElement: action.item //хочу добавить ключ объекту
                // draggedFilling: [...state.draggedFilling.slice(0, action.item), ...state.draggedFilling.slice(action.item + 1)]  
            }
        }
        case DELITE_ELEMENT: {
            return {
                ...state,
                draggedFilling: [...state.draggedFilling.slice(0, action.payload), ...state.draggedFilling.slice(action.payload + 1)]
                // draggedElements: [...state.draggedElements.splice( action.payload )]
            }
        }
        case SEND_ORDER_DATA_REQUEST: {
            return { ...state, loading: true }
        }

        case SEND_ORDER_DATA_SUCCESS: {
            return { ...state, loading: false, ingredients: state.draggedFilling.id }
        }
        case SEND_ORDER_DATA_FAILED: {

        }

        default: {
            return state;
        }
    }
}
// draggedElements: {state.draggedElement.type === 'bun' ? {...state.draggedElements.filter((item)=>item.type !== 'bun', state.draggedElement)} :
//  {[...state.draggedElements, state.draggedElement]}
