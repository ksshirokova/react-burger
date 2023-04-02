import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import LoginPage from "../../pages/login-page";
import ForgotPassword from "../../pages/forgot-password-1";
import ProtectedRoute from "../protected-route.js/protected-route";
import Error404 from "../404-error/404-error";
import { getIngredients } from "../../services/actions/ingredients";
import {
  CLOSE_ING_MODAL,
  DELITE_MODAL_INGREDIENTS,CLOSE_ORDER_MODAL
} from "../../services/constants";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProfilePage from "../../pages/profile-page";
import RegistrationPage from "../../pages/registration-page";
import ResetPassword from "../../pages/reset-password";
import { useEffect } from "react";
import { checkAuth } from "../../services/actions/routing";
import IngredientDetailsPage from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "../../utils";


function App() {
  const navigate = useNavigate();
  
  const location = useLocation();

  const { isOpened, orderItems } = useSelector(
    (state) => state.orderInfo
  );
  const { ingIsOpened, item } = useSelector(
    (state) => state.ingredientInfo
  ); //ингредиент модалки
  // const modalIngredients = useSelector((state) => state.ingredientInfo.item);
  const orderItem = orderItems.map((item: any) => item.action.order.number); //не уверена что такое orderItems
  const orderNumber = orderItem[0];

  const background = location.state && location.state.background;
  const elementId = location.state && location.state.elementId;

  const dispatch = useDispatch();
  const closeOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
    dispatch({ type: CLOSE_ING_MODAL });
    dispatch({ type: DELITE_MODAL_INGREDIENTS });
    
    
    navigate("/");
  };

  

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute anonymous={false} isUser={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous={false} isUser={true}>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute anonymous={false} isUser={true}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute anonymous={false} isUser={true}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute anonymous={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Error404 />} />
        <Route
          path={"/ingredients/:ingredientId"}
          element={<IngredientDetailsPage />}
        />
      </Routes>

      {background && ingIsOpened && (
        <Routes>
          <Route
            path={"/ingredients/" + elementId}
            element={
              <Modal onClose={closeOrderModal} title="Детали ингредиента">
                <IngredientDetailsPage ingredients={item} />
              </Modal>
            }
          />
        </Routes>
      )}

      {isOpened && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default App;
