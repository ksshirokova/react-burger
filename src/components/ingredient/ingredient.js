import React from 'react';
import IngredientStyle from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Ingredients(data) {
   
    return (
        <>
            <h2 className='text text_type_main-medium mb-6'>{data.name}</h2>
            <ul className={IngredientStyle.ul}>
                {/* пытаюсь обратиться так : data.props.ingredients - выдает undefined */}
                {data.ingredients &&

                    data.ingredients.map((item) =>


                        <li key={item._id} className={`${IngredientStyle.list} ml-4 mb-8`}>

                            <img src={item.image}></img>
                            <div className={`${IngredientStyle.price} mt-1 mb-1`}>
                                <p className='text text_type_digits-default'>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className={`${IngredientStyle.name} text text_type_main-default`}>{item.name}</p>

                        </li>

                    )}
            </ul>
        </>
    )
}