import React from 'react';

import burgerIngredientsStyle from './burger-ingredients.module.css'
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredient/ingredient';



export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('Булки');

    return (
        <section className={burgerIngredientsStyle.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <section className={`${burgerIngredientsStyle.container} mt-10`}>
                
                <Ingredients name = "Булки" data = {props}/>
                <Ingredients name = "Соусы"/>
                <Ingredients name = "Начинки"/>

                
            </section>
        </section>

    )
}





