
export const GET_MODAL_INGREDIENTS = 'GET_MODAL_INGREDIENTS';
export const CLOSE_ING_MODAL = 'CLOSE_ING_MODAL';
export const OPEN_ING_MODAL = 'OPEN_ING_MODAL';
export const DELITE_MODAL_INGREDIENTS = 'DELITE_MODAL_INGREDIENTS'


//генератор экшена
export const addModalIngredients = (item)=>{
    return {
        type: GET_MODAL_INGREDIENTS,
        item
    }
}

export const deliteModalIngredients = (item)=>{
    return {
        type: DELITE_MODAL_INGREDIENTS,
        item,
    }
}