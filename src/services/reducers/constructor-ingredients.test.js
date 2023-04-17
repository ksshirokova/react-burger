import {
    DRAG_CONSTRUCTOR_ELEMENT,
    DROP_CONSTRUCTOR_ELEMENT,
    DELITE_ELEMENT,
    CHECK_DROPED_ELEMENT,
    DROP_MOVED_ELEMENT,
    CLEAN_CONSTRUCTOR,
} from "../constants";
import { constructorReducer } from "./constructors-ingredients";
import { initialState } from "./constructors-ingredients";
import { mainElement, sauceElement } from "../constants/test-data";



describe('constructor-ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(
            {
                draggedElement: {},
                draggedBuns: [],
                draggedFilling: [],
            }
        )
    })
})


it('should handle DROP_CONSTRUCTOR_ELEMENT', () => {
    expect(
        constructorReducer(initialState, {
            type: DROP_CONSTRUCTOR_ELEMENT,

        })
    ).toEqual({
        ...initialState,
        draggedElement: {},
        draggedBuns: [],
        draggedFilling: [{}],

    });
});

it('should handle CHECK_DROPED_ELEMENT', () => {
    expect(
        constructorReducer(initialState, {
            type: CHECK_DROPED_ELEMENT,
        })
    ).toEqual({
        ...initialState


    });
});


it("should handle DROP_MOVED_ELEMENT", () => {
    expect(constructorReducer({ ...initialState, draggedFilling: [mainElement, sauceElement] }, {
        type: DROP_MOVED_ELEMENT,
        payload: { fromIndex: 0, toIndex: 1 }

    }))
        .toEqual({ ...initialState, draggedFilling: [sauceElement, mainElement] });
});


it('should handle DRAG_CONSTRUCTOR_ELEMENT', () => {
    expect(
        constructorReducer(initialState, {
            type: DRAG_CONSTRUCTOR_ELEMENT,
            item: mainElement
        })
    ).toEqual({
        ...initialState,

        draggedElement: mainElement,



    });
});

it('should handle DELITE_ELEMENT', () => {
    expect(
        constructorReducer(initialState, {

            type: DELITE_ELEMENT,

        }))
        .toEqual({
            ...initialState,

            draggedFilling: [],



        });
});

it('should handle CLEAN_CONSTRUCTOR', () => {
    expect(
        constructorReducer(initialState, {
            type: CLEAN_CONSTRUCTOR
        })
    ).toEqual({
        ...initialState,




    });
});


