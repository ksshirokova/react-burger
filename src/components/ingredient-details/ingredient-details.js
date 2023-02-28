import React from 'react'
import style from './ingredients-details.module.css';
import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types'

export default function IngredientDetails({ ingredients }) {
    return (
        <section className={style.section}>
            <img src={ingredients.image_large} />
            <p className="text text_type_main-medium mt-4 mb-8">{ingredients.name}</p>
            
            <ul className={style.ul}>
            <li className={style.list}>
                <p className="text text_type_main-default text_color_inactive mb-2 mr-5">Ккалории, ккал</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.calories}</p>
            </li>
            <li className={style.list}>
                <p className="text text_type_main-default text_color_inactive mb-2 mr-5">Белки, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.fat}</p>
            </li>
            <li className={style.list}>
                <p className="text text_type_main-default text_color_inactive mb-2 mr-5">Жиры. г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.proteins}</p>
            </li>
            <li className={style.list}>
                <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.carbohydrates}</p>
            </li>
            </ul>

        </section>
    )
}

IngredientDetails.propType = {
    ingredients: PropType.arrayOf(IngredientPropTypes).isRequired
}