import { TItem } from '../../utils/types';
import { GET_MODAL_INGREDIENTS, CLOSE_ING_MODAL, OPEN_ING_MODAL, DELITE_MODAL_INGREDIENTS } from '../constants'

export interface IGetModalIngredients {
    readonly type: typeof GET_MODAL_INGREDIENTS;
    readonly item: TItem;

}

export interface ICloseIngModal {
    readonly type: typeof CLOSE_ING_MODAL;
    readonly ingIsOpened: boolean;

}

export interface IOpenIngModal {
    readonly type: typeof OPEN_ING_MODAL;
    readonly ingIsOpened: boolean;

}

export interface IDeliteModalIng {
    readonly type: typeof DELITE_MODAL_INGREDIENTS;
    readonly item: {};

}

export const addModalIngredients = (item: TItem) => {
    return {
        type: GET_MODAL_INGREDIENTS,
        item
    }
}

export type TIngModalActions =
| IGetModalIngredients
| ICloseIngModal
| IOpenIngModal
| IDeliteModalIng


export const deliteModalIngredients = (item: TItem): IDeliteModalIng => {
    return {
        type: DELITE_MODAL_INGREDIENTS,
        item,
    }
}