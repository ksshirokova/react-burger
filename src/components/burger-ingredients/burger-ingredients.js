import React from 'react';

import burgerIngredientsStyle from './burger-ingredients.module.css'
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredient/ingredient';



export default function BurgerIngredients({ buns, main, sauce, toOpen }) {
    const [current, setCurrent] = React.useState('Булки');

    return (

        <section className={burgerIngredientsStyle.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <nav style={{ display: 'flex' }}>
                <ul className={burgerIngredientsStyle.ul}>
                    <li><Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                        Булки
                    </Tab></li>
                    <li><Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                        Соусы
                    </Tab></li>
                    <li><Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                        Начинки
                    </Tab></li>
                </ul>
            </nav>

            <section className={`${burgerIngredientsStyle.container} `}>

                <Ingredients name="Булки" ingredients={buns} onOpen={toOpen} />
                <Ingredients name="Соусы" ingredients={sauce} onOpen={toOpen} />
                <Ingredients name="Начинки" ingredients={main} onOpen={toOpen} />


            </section>
        </section>


    )
}





