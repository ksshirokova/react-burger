import {OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL} from '../actions/order-modal'

const initialState = {
    isOpened: false, 
    orderNumber: null,
    
    

}

export const orderModalReducer = (state=initialState, action)=>{
  switch(action.type){
    case OPEN_ORDER_MODAL:{
        return {
            ...state, isOpened: true
        }
    }
    case CLOSE_ORDER_MODAL:{
        return {
            ...state, isOpened: false
        }
    }
    default: {
        return state
    }
  }
}