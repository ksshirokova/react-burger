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

  DELITE_MODAL_INGREDIENTS, CLOSE_ORDER_MODAL
} from "../../services/constants";
import OrdersHistoryPage from "../../pages/orders-history-page";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProfilePage from "../../pages/profile-page";
import RegistrationPage from "../../pages/registration-page";
import ResetPassword from "../../pages/reset-password";
import { useEffect } from "react";
import { checkAuth } from "../../services/actions/routing";
import IngredientDetailsPage from "../ingredient-details/ingredient-details";
import FeedPage from "../../pages/feed-page";
import { useSelector, useDispatch } from "../../utils";
import OrderModalDetails from "../order-modal-details/order-modal-details";
import { deliteModalOrder } from "../../services/actions/ingredient-modal";
import { getCookie } from "../../utils/utils";
import OrderModalUsersDetails from "../order-modal-users-details/order-modal-users-details";


function App() {
  const navigate = useNavigate();

  const location = useLocation();

  const { isOpened, orderItems } = useSelector(
    (state) => state.orderInfo
  );


  const orderElement = orderItems.map((item: any) => item.action.order.number);
  const orderNumber = orderElement[0];

  const background = location.state && location.state.background;
  const { orderItem } = useSelector(state => state.ingredientInfo)

  const dispatch = useDispatch();
  const closeOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL, isOpened: false });

  };

  const closeIngModal = () => {
    dispatch({ type: DELITE_MODAL_INGREDIENTS, item: {} })
    navigate("/");
  };

  const closeFeedModal = (item?: any) => {

    dispatch(deliteModalOrder(item));
    navigate(-1);
  };


  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth());
    console.log('страница отрендерилась')
  }, [dispatch]);


  console.log(getCookie('token'))
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
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute anonymous={false}>
              <OrdersHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Error404 />} />

        <Route
          path={"/ingredients/:ingredientId"}
          element={

            <IngredientDetailsPage />}
        />
        <Route
          path={"/feed"}
          element={

            <FeedPage />
          }

        />

        <Route
          path={"/feed/:orderId"}
          element={

            <OrderModalDetails isPage={true} />

          }
        />

        <Route
          path={"/profile/orders/:usersOrderId"}
          element={
            
              <OrderModalUsersDetails isPage={true} />
           

          }
        />

      </Routes>

      {background && (
        <Routes>
          <Route
            path={"/ingredients/:ingredientId"}
            element={
              <Modal onClose={closeIngModal} title="Детали ингредиента" classname={"text text_type_main-large"}>
                <IngredientDetailsPage />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path={"/feed/:orderId"}
            element={
              <Modal onClose={closeFeedModal} title={orderItem && `#${orderItem.number}`} classname={"text text_type_digits-default"}>
                <OrderModalDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path={"/profile/orders/:usersOrderId"}
            element={
              <Modal onClose={closeFeedModal} title={orderItem && `#${orderItem.number}`} classname={"text text_type_digits-default"}>
                <OrderModalUsersDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {isOpened && (
        <Modal onClose={closeOrderModal} classname={"text text_type_main-large"}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default App;
