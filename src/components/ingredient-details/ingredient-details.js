import React from 'react'
import IngredientsDetailsStyle from './ingredients-details.module.css'

// export default function IngredientDetails({ ingredients }) {
//     return (
//         <section className={IngredientsDetailsStyle.section}>
//             <img src={ingredients.image}></img>
//             <p className={IngredientsDetailsStyle.text}>{ingredients.name}</p>
//             <p>{ingredients._id}</p>

//         </section>
//     )
// }

export default function IngredientDetails({ ingredients }) {
    return (
        <section className={IngredientsDetailsStyle.section}>
            <img src={ingredients.image_large}></img>
            <p className="text text_type_main-medium mt-4 mb-8">{ingredients.name}</p>
            
            <ul className={IngredientsDetailsStyle.ul}>
            <li className={IngredientsDetailsStyle.list}>
                <p className="text text_type_main-default text_color_inactive mb-2 mr-5">Ккалории, ккал</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.calories}</p>
            </li>
            <li className={IngredientsDetailsStyle.list}>
                <p className="text text_type_main-default text_color_inactive mb-2 mr-5">Белки, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.fat}</p>
            </li>
            <li className={IngredientsDetailsStyle.list}>
                <p className="text text_type_main-default text_color_inactive mb-2 mr-5">Жиры. г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.proteins}</p>
            </li>
            <li className={IngredientsDetailsStyle.list}>
                <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredients.carbohydrates}</p>
            </li>
            </ul>

        </section>
    )
}