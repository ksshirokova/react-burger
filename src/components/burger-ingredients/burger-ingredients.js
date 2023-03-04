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
import { useInView } from 'react-intersection-observer'





export default function BurgerIngredients({ dragHandler }) {
    // const [current, setCurrent] = React.useState('Булки');
    const element = document.getElementById('container')
    const { bun, main, sauce } = useSelector((state) => state.ingredients);
    const dispatch = useDispatch();

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

    
    const [current, setCurrent] = React.useState('one')

    const { ref: bunRef, inView: inViewBuns } = useInView();
    const { ref: sauceRef, inView: inViewSauces } = useInView();
    const { ref: mainRef, inView: inViewMain } = useInView();

    function tabSwitch(viewBuns, viewSauce, viewMain) {
        if (viewBuns) {
            return setCurrent('one')
        } if (viewSauce) {
            return setCurrent('two')
        } if (viewMain) {
            return setCurrent('three')
        }
    }

    useEffect(() => {
        tabSwitch(inViewBuns, inViewSauces, inViewMain)
    }, [inViewBuns, inViewSauces, inViewMain])

    const moveToElement = (current) => {
        const element = document.getElementById(`${current}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (

        <section className={style.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <nav style={{ display: 'flex' }}>
                <ul className={style.ul}>
                    <li><Tab value="one" active={current === 'one'}  onClick={()=>{moveToElement('one')}}>
                        Булки
                    </Tab></li>
                    <li><Tab value="two" active={current === 'two'} onClick={()=>{moveToElement('two')}}>
                        Соусы
                    </Tab></li>
                    <li><Tab value="three" active={current === 'three'} onClick={()=>{moveToElement('three')}}>
                        Начинки
                    </Tab></li>
                </ul>
            </nav>

            <section className={style.container} id='container'>

                <Ingredients  elRef={bunRef} name="Булки" currentId = {'one'} ingredients={bun} onOpen={handleClick} onDragHandler={dragHandler} />
                <Ingredients  elRef={sauceRef} name="Соусы" currentId = {'two'} ingredients={sauce} onOpen={handleClick} onDragHandler={dragHandler} />
                <Ingredients elRef={mainRef}  name="Начинки"  currentId = {'three'} ingredients={main} onOpen={handleClick} onDragHandler={dragHandler} />


            </section>
        </section>


    )
}

BurgerIngredients.propType = {
    ingredients: PropType.arrayOf(IngredientPropTypes).isRequired
}



