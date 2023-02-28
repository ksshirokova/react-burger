import { DRAG_CONSTRUCTOR_ELEMENT, DROP_CONSTRUCTOR_ELEMENT, DELITE_ELEMENT } from '../actions/constructors-ingredients'

const initialState = {
    uuid: '',
    draggedElement: {},
    draggedElements: []
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case DROP_CONSTRUCTOR_ELEMENT: {
            return {
                ...state,
                // draggedElements: state.draggedElement.type === 'bun' ? [...state.draggedElements.filter((item) => item.type !== 'bun', state.draggedElement)] :
                //     [state.draggedElement],

                draggedElements: [...state.draggedElements, state.draggedElement],
                //для булок может подойти draggedElements: [state.draggedElement],
                // draggedElements: [state.draggedElements.map((element)=> {
                //     if(element.type === 'bun') {return element}
                //     else {return  state.draggedElement}
                // })], //надо в массив записать элемент, который захватили
                // data: [[state.data].filter(element => element.id !== state.draggedElement.id)],
                draggedElement: {}
            }
        }
        case DRAG_CONSTRUCTOR_ELEMENT: {
            return { ...state, draggedElement: action.item }
        }
        // case DELITE_ELEMENT: {
        //     return {...state,
        //         draggedElements: [...draggedElements.slice[0, action.payload], ...draggedElements.slice[action.payload +1]]
        //     }
        // }

        default: {
            return state;
        }
    }
}
// draggedElements: {state.draggedElement.type === 'bun' ? {...state.draggedElements.filter((item)=>item.type !== 'bun', state.draggedElement)} :
//  {[...state.draggedElements, state.draggedElement]}
