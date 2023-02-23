import React, { useState, useEffect } from 'react';
import { createModuleResolutionCache } from 'typescript';
import './App.css';
import AppHeader from './components/app-header/app-header.js';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import ModalOverlay from './components/modal-overlay/modal-overlay';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import OrderDetails from './components/order-details/order-details';
const API_URL = 'https://norma.nomoreparties.space/api';



function App() {
  const [ingredients, setIngredient] = useState(null)
  const [buns, setBuns] = useState(null)
  const [main, setMain] = useState(null)
  const [sauce, setSauce] = useState(null)

  const [orderModal, setOrderModal] = useState(false); //проверяет открыто или закрыто окно заказа
  const [IngredientModal, setIngredientModal] = useState(false); //проверяет открыто или закрыто окно ингредиентов
  const [modalIngredients, setModalIngredients] = useState(null)

  const handleClick = (item) => {
    setModalIngredients(item)
    openIngredientModal()
  }


  const closeOrderModal = () => {
    setOrderModal(false)
  }

  const closeIngredientModal = () => {
    setIngredientModal(false)
  }

  const openOrderModal = () => {
    setOrderModal(true)
  }

  const openIngredientModal = () => {
    setIngredientModal(true)
  }


  useEffect(() => {
    fetch(`${API_URL}/ingredients`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .then(res => {
        const ingredientsFromApi = res.data
        setBuns(ingredientsFromApi.filter(item => item.type === 'bun'))
        setMain(ingredientsFromApi.filter(item => item.type === 'main'))
        setSauce(ingredientsFromApi.filter(item => item.type === 'sauce'))
        setIngredient(ingredientsFromApi)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <AppHeader />
      <main className='main'>
        <BurgerIngredients ingredients={ingredients} buns={buns} main={main} sauce={sauce} toOpen={handleClick} />
        <BurgerConstructor main={main} buns={buns} sauce={sauce} toOpen={openOrderModal} />
      </main>
      
      {orderModal &&
        <>

          <Modal onClose={closeOrderModal} ingredients={ingredients}>
            <OrderDetails />
          </Modal>
        </>
      }

      {IngredientModal &&
        <>

          <Modal onClose={closeIngredientModal} title='Детали ингредиента' ingredient={ingredients}>
            <IngredientDetails ingredients={modalIngredients} />
          </Modal>
        </>
      }







    </>

  );
}


export default App;
