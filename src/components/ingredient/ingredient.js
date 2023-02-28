import React from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types';


export default function Ingredients({ ingredients, name, onOpen, onDragHandler }) {


    return (
        <>
            <h2 className='text text_type_main-medium mb-6 mt-10'>{name}</h2>
            <ul className={style.ul}>
                {/* пытаюсь обратиться так : data.props.ingredients - выдает undefined */}
                {ingredients &&

                    ingredients.map((item) =>


                        <li key={item._id} className={`${style.list} ml-4 mb-8`} onClick={() => onOpen(item)} draggable onDrag={(e) => onDragHandler(e, item)}>
                            
                            <img src={item.image} />
                            <div className={style.counter}>
                            <Counter count={1} size="default" extraClass="m-1" />
                            </div>
                            
                            <div className={`${style.price} mt-1 mb-1`}>
                                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            
                            <p className={`${style.name} text text_type_main-default`}>{item.name}</p>

                        </li>

                    )}
            </ul>
        </>
    )
}

Ingredients.propType = {
    ingredients: PropType.arrayOf(IngredientPropTypes).isRequired
}