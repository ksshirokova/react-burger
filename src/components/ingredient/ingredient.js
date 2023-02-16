import React from 'react';
import IngredientStyle from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types'

export default function Ingredients({ ingredients, name, onOpen }) {


    return (
        <>
            <h2 className='text text_type_main-medium mb-6 mt-10'>{name}</h2>
            <ul className={IngredientStyle.ul}>
                {/* пытаюсь обратиться так : data.props.ingredients - выдает undefined */}
                {ingredients &&

                    ingredients.map((item) =>


                        <li key={item._id} className={`${IngredientStyle.list} ml-4 mb-8`} onClick={() => onOpen(item)} >
                            
                            <img src={item.image}></img>
                            {/* <div>
                            <Counter count={1} size="default" extraClass="m-1" />
                            </div> */}
                            
                            <div className={`${IngredientStyle.price} mt-1 mb-1`}>
                                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className={`${IngredientStyle.name} text text_type_main-default`}>{item.name}</p>

                        </li>

                    )}
            </ul>
        </>
    )
}

Ingredients.propType = {
    ingredients: PropType.arrayOf(IngredientPropTypes).isRequired
}