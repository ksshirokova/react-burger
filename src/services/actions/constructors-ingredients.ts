import { v4 as uuid1 } from "uuid";
import { DRAG_CONSTRUCTOR_ELEMENT, DROP_CONSTRUCTOR_ELEMENT, DELITE_ELEMENT, DROP_MOVED_ELEMENT, CHECK_DROPED_ELEMENT, CLEAN_CONSTRUCTOR } from "../constants";
import { TItem, TItemUndefined } from "../../utils/types";

export interface IDragConstructorElement {
  readonly type: typeof DRAG_CONSTRUCTOR_ELEMENT;
  readonly draggedElement?: TItem;
  readonly item: TItem;
}

export interface IDropConstructorElement {
  readonly type: typeof DROP_CONSTRUCTOR_ELEMENT;
  readonly draggedBuns?: TItem[];
  readonly draggedFilling?: TItem[] | TItemUndefined;
  readonly draggedElement?: TItem ;
  readonly item: TItem;
}

export interface IDeliteElement {
  readonly type: typeof DELITE_ELEMENT;
}

export interface IDropMovedElement {
  readonly type: typeof DROP_MOVED_ELEMENT;
  readonly payload: any;

}

export interface ICheckDropedElement {
  readonly type: typeof CHECK_DROPED_ELEMENT;
}

export interface ICleanConstructor {
  readonly type: typeof CLEAN_CONSTRUCTOR;
  readonly draggedFilling: [];
  readonly draggedBuns: [];
  readonly loading: boolean;
}

export type TConstructorActions =
| IDragConstructorElement
| IDropConstructorElement
| IDeliteElement
| IDropMovedElement
| ICheckDropedElement
| ICleanConstructor


export const addDraggedElement = (item: TItem): IDragConstructorElement => {
  return {
    type: DRAG_CONSTRUCTOR_ELEMENT,

    item: { ...item, uuid: uuid1() },
  };
};

export const dropElement = (item: TItem): IDropConstructorElement => {
  return {
    type: DROP_CONSTRUCTOR_ELEMENT,
    item,
  };
};
