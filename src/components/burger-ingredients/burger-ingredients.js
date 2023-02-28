import React from 'react';

import style from './burger-ingredients.module.css'
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../ingredient/ingredient';
import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types';
import { getIngredients } from '../../services/actions/ingredients';
import { addModalIngredients } from '../../services/actions/ingredient-modal';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_ING_MODAL } from '../../services/actions/ingredient-modal';
import { useEffect } from 'react';
import { addDraggedElement } from '../../services/actions/ingredients';





export default function BurgerIngredients({dragHandler}) {
    const [current, setCurrent] = React.useState('Булки');
    const element = document.getElementById('container')
    const { bun, main, sauce } = useSelector((state) => state.ingredients);
    const dispatch = useDispatch();



    


    const handleDragOver = (event) => { //обработчик при наведении
        event.preventDefault()
    }
    
    //сделать массив из элементов в этом контейнере





    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const openIngredientModal = () => {
        dispatch({ type: OPEN_ING_MODAL });
    };

    const handleClick = (item) => {
        dispatch(addModalIngredients(item));
        openIngredientModal();
    };

    const scrollIntoBuns = () => {
        element.scrollTo(0, 0)
    }

    const scrollIntoSauces = () => {
        element.scrollTo(0, 300)
    }


    const scrollIntoMain = () => {
        element.scrollTo(0, 850)
    }

    return (

        <section className={style.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <nav style={{ display: 'flex' }}>
                <ul className={style.ul}>
                    <li onClick={scrollIntoBuns}><Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                        Булки
                    </Tab></li>
                    <li onClick={scrollIntoSauces}><Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                        Соусы
                    </Tab></li>
                    <li onClick={scrollIntoMain}><Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                        Начинки
                    </Tab></li>
                </ul>
            </nav>

            <section className={style.container} id='container'>

                <Ingredients name="Булки" ingredients={bun} onOpen={handleClick} onDragHandler={dragHandler} />
                <Ingredients name="Соусы" ingredients={sauce} onOpen={handleClick} onDragHandler={dragHandler} />
                <Ingredients name="Начинки" ingredients={main} onOpen={handleClick} onDragHandler={dragHandler} />


            </section>
        </section>


    )
}

BurgerIngredients.propType = {
    ingredients: PropType.arrayOf(IngredientPropTypes).isRequired
}



