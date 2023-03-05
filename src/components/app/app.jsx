import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_ING_MODAL,
  DELITE_MODAL_INGREDIENTS,
} from "../../services/actions/ingredient-modal";
import { CLOSE_ORDER_MODAL } from "../../services/actions/order-modal";

function App() {
  const dispatch = useDispatch();
  const orderIsOpened = useSelector((state) => state.orderInfo.isOpened);
  const modalIngredients = useSelector((state) => state.ingredientInfo.item);
  const burgerIngredients = useSelector(
    (state) => state.constructorStore.draggedFilling
  );
  const burgerIngredient = burgerIngredients.map((item) => item._id);
  const orderItems = useSelector((state) => state.orderInfo.orderItems);
  const orderItem = orderItems.map((item) => item.action.order.number);
  const orderNumber = orderItem[0];
  const ingredientsIsOpened = useSelector(
    (state) => state.ingredientInfo.isOpened
  );

  const closeOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  const closeIngredientModal = () => {
    dispatch({ type: CLOSE_ING_MODAL });
    dispatch({ type: DELITE_MODAL_INGREDIENTS });
  };

  return (
    <>
      <AppHeader />

      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>

      {orderIsOpened && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}

      {ingredientsIsOpened && (
        <Modal onClose={closeIngredientModal} title="Детали ингредиента">
          <IngredientDetails ingredients={modalIngredients} />
        </Modal>
      )}
    </>
  );
}

export default App;
