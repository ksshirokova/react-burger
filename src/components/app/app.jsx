import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import LoginPage from "../../pages/login-page";
import ForgotPassword from "../../pages/forgot-password-1";
import ProtectedRoute from "../protected-route.js/protected-route";
import Error404 from "../404-error/404-error";
import { getIngredients } from "../../services/actions/ingredients";



import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_ING_MODAL,
  DELITE_MODAL_INGREDIENTS,
} from "../../services/actions/ingredient-modal";
import { CLOSE_ORDER_MODAL } from "../../services/actions/order-modal";
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import ProfilePage from "../../pages/profile-page";
import RegistrationPage from "../../pages/registration-page";
import ResetPassword from "../../pages/reset-password";
import { useEffect } from "react";
import { getUser, checkAuth } from "../../services/actions/routing";
import { getCookie } from "../../utils/utils";


function App() {

  const orderIsOpened = useSelector((state) => state.orderInfo.isOpened);
  const ingredientIsOpened = useSelector((state) => state.ingredientInfo.isOpened);
  const modalIngredients = useSelector((state) => state.ingredientInfo.item);
  const burgerIngredients = useSelector(
    (state) => state.constructorStore.draggedFilling
  );
  
  

  const orderItems = useSelector((state) => state.orderInfo.orderItems);
  const orderItem = orderItems.map((item) => item.action.order.number);
  const orderNumber = orderItem[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const background = location.state && location.state.background //location фоновой страницы
  const elementId = location.state && location.state.elementId;
  
  
  

  

// если введенный айди равен айди элемента из массива то мы возвращаем этот элемент
  const ingredientsIsOpened = useSelector(
    (state) => state.ingredientInfo.isOpened
  );
  const isItem = !!useSelector(
    (state) => state.ingredientInfo.item
  );

  const closeOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
    dispatch({ type: CLOSE_ING_MODAL });
    dispatch({ type: DELITE_MODAL_INGREDIENTS });
    navigate('/')
  };

  

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth())
    
    
  }, [])
 
    
  

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={
         
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
          
        } />
        <Route path='/login' element={<ProtectedRoute anonymous={false} user={true}><LoginPage /></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute anonymous={false} user={true}><RegistrationPage /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ProtectedRoute anonymous={false} user={true}><ForgotPassword /></ProtectedRoute>} />
        <Route path='/reset-password' element={<ProtectedRoute anonymous={false} user={true}><ResetPassword /> </ProtectedRoute>} />
        <Route path='/profile' element={
          <ProtectedRoute anonymous={false} >
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/*" element={<Error404 />} />
        <Route path={'/ingredients/:ingredientId'} element={<IngredientDetails title="Детали ингредиента" /> } />


      </Routes >
      
      
        {background && ingredientIsOpened && <Routes>
          <Route path={"/ingredients/" + elementId} element = {
          <Modal onClose={closeOrderModal} title="Детали ингредиента">
          <IngredientDetails ingredients={modalIngredients}  />
        </Modal>}
        />
          </Routes>}
      
      {orderIsOpened && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}

    </>
  );
}

export default App;
