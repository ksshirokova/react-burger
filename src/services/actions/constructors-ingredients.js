
import { v4 as uuid1 } from "uuid";
export const DRAG_CONSTRUCTOR_ELEMENT = "DRAG_CONSTRUCTOR_ELEMENT";
export const DROP_CONSTRUCTOR_ELEMENT = "DROP_CONSTRUCTOR_ELEMENT";
export const DELITE_ELEMENT = "DELITE_ELEMENT";
export const CALCULATE_COST = "CALCULATE_COST";
export const SEND_ORDER_DATA_REQUEST = "SEND_ORDER_DATA_REQUEST";
export const SEND_ORDER_DATA_SUCCESS = "SEND_ORDER_DATA_SUCCESS";
export const SEND_ORDER_DATA_FAILED = "SEND_ORDER_DATA_FAILED";
export const DROP_MOVED_ELEMENT = "DROP_MOVED_ELEMENT";
export const CHECK_DROPED_ELEMENT = "CHECK_DROPED_ELEMENT";
export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR'


export const addDraggedElement = (item) => {
  return {
    
    type: DRAG_CONSTRUCTOR_ELEMENT,
    
  
    item: {...item, uuid: uuid1()}
    
    
    
  };
};

export const dropElement =(item)=>{
  return {
    
    type: DROP_CONSTRUCTOR_ELEMENT,
    item
   
    
    
    

  }
}