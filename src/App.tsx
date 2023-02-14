import React from 'react';
import { createModuleResolutionCache } from 'typescript';
import './App.css';
import AppHeader from './components/app-header/app-header.js';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

import ModalOverlay from './components/modal-overlay/modal-overlay';
const API_URL = 'https://norma.nomoreparties.space/api';
function App() {
  
  const [state, setState] = React.useState({ ingredients: null });
  

  React.useEffect(() => {
    fetch(`${API_URL}/ingredients`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
      // .then(res => console.log(res))
      .then(res => setState({
        ...state,
        ingredients: res.data
      }))
      
      .catch(err => console.error(err))
  })
  
  return (
    <>
      <AppHeader />
      <main className='main'>
      <BurgerIngredients props = {state} />
      <BurgerConstructor props = {state}/>
      </main>
      {/* <ModalOverlay /> */}
    </>
    
  );
}


export default App;
