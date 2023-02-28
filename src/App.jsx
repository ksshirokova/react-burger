import { useEffect } from "react";

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

function App() {
  // const [useSelector1, useDispatch1] = React.useState()

  const dispatch = useDispatch();
  const orderIsOpened = useSelector((state) => state.orderInfo.isOpened);
  const modalIngredients = useSelector((state) => state.ingredientInfo.item);
  
  
  const ingredientsIsOpened = useSelector(
    (state) => state.ingredientInfo.isOpened
  );
  const handleDragOver = (event) => { //обработчик при наведении
    event.preventDefault()

  }
  const handleDrop = () => { //обработчик когда отпустили
    dispatch({ type: DROP_CONSTRUCTOR_ELEMENT });
    
  }
  const handleDrag = (event, item) => { //обработчик когда зажали
    event.preventDefault();
    dispatch(addDraggedElement(item))
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
  };






  return (
    <>
      <AppHeader />
      <main className="main">
        <BurgerIngredients dragHandler={handleDrag}
        />
        <BurgerConstructor
          
          toOpen={openOrderModal} toDrop = {handleDrop} onDragOverHandler = {handleDragOver} dragHandler={handleDrag}
        />
      </main>

      {orderIsOpened && (
        <>
          <Modal onClose={closeOrderModal} >
            <OrderDetails />
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
