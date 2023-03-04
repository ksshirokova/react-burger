
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



import "./App.css";
import AppHeader from "./components/app-header/app-header.js";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

import Modal from "./components/modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";
import OrderDetails from "./components/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "./services/actions/ingredients";
import {
  addModalIngredients,
  OPEN_ING_MODAL,
  CLOSE_ING_MODAL,
  DELITE_MODAL_INGREDIENTS,
} from "./services/actions/ingredient-modal";
import {
  CLOSE_ORDER_MODAL,
  OPEN_ORDER_MODAL,
} from "./services/actions/order-modal";

import { DROP_CONSTRUCTOR_ELEMENT } from "./services/actions/constructors-ingredients";
import { addDraggedElement } from "./services/actions/constructors-ingredients";
import { DELITE_ELEMENT } from "./services/actions/constructors-ingredients";
import { ADD_ORDER_SUCCESS,  ADD_ORDER_REQUEST, ADD_ORDER_FAILED} from "./services/actions/order-modal";
import { sendOrdersData } from "./utils/api";
import { addDraggedConstructorElement } from "./services/actions/constructors-ingredients";
import { dropElement } from "./services/actions/constructors-ingredients";


function App() {
  // const [useSelector1, useDispatch1] = React.useState()

  const dispatch = useDispatch();
  const orderIsOpened = useSelector((state) => state.orderInfo.isOpened);
  const modalIngredients = useSelector((state) => state.ingredientInfo.item);
  const burgerIngredients = useSelector((state) => state.constructorStore.draggedFilling)
  const burgerIngredient = burgerIngredients.map((item) => item._id)
  const orderItems = useSelector((state) => state.orderInfo.orderItems)
  const orderItem = orderItems.map((item) => item.action.order.number)
  const orderNumber = orderItem[0]


  const onDelite = (index) => {
    dispatch({ type: DELITE_ELEMENT, payload: index })
  }


  const ingredientsIsOpened = useSelector(
    (state) => state.ingredientInfo.isOpened
  );
  const handleDragOver = (event) => { //обработчик при наведении
    event.preventDefault()

  }
  const handleDrop = (e) => { //обработчик когда отпустили
    e.preventDefault();
    dispatch({type:  DROP_CONSTRUCTOR_ELEMENT})
    

  }
  const handleDrag = (event, item) => { //обработчик когда зажали
    event.preventDefault();
    dispatch(addDraggedElement(item))
  }

  const handleConstructorDrag = (event, item) => { //обработчик когда зажали
    event.preventDefault();
    dispatch(addDraggedConstructorElement(item)) //должно сработать один раз, а срабатывает много пока держим
    // dispatch({type: DELITE_ELEMENT})
    //
  }

  const closeOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  const closeIngredientModal = () => {
    dispatch({ type: CLOSE_ING_MODAL });
    dispatch({ type: DELITE_MODAL_INGREDIENTS });
  };

  const openOrderModal = () => {
    dispatch({ type: OPEN_ORDER_MODAL });
    dispatch({type: ADD_ORDER_REQUEST})

    sendOrdersData(burgerIngredient)
      .then((res) => {
        dispatch({

          type: ADD_ORDER_SUCCESS,
          ...res

        })
      })
      .catch((err)=>{
        dispatch({type: ADD_ORDER_FAILED, payload: { error: err }})
      })

  };






  return (
    <>
      <AppHeader />

      <main className="main">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients dragHandler={handleDrag}
          />
          <BurgerConstructor

            toOpen={openOrderModal} toDrop={handleDrop} onDragOverHandler={handleDragOver}  onDelite={onDelite} toDrag = {handleConstructorDrag}
          />
        </DndProvider>
      </main>

      {orderIsOpened && (
        <>
          <Modal onClose={closeOrderModal} >
            <OrderDetails number={orderNumber} />
          </Modal>
        </>
      )}

      {ingredientsIsOpened && (
        <>
          <Modal
            onClose={closeIngredientModal}
            title="Детали ингредиента"

          >
            <IngredientDetails ingredients={modalIngredients} />
          </Modal>
        </>
      )}

    </>
  );
}

export default App;
