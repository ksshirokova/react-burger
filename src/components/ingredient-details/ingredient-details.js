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
            <img src={ingredients.image}></img>
            <p >{ingredients.name}</p>
            <p>{ingredients.name}</p>
            <ul>
            <li>
                <p>Ккалории, ккал</p>
                <p>{ingredients.calories}</p>
            </li>
            <li>
                <p>Белки, г</p>
                <p>{ingredients.fat}</p>
            </li>
            <li>
                <p>Жиры. г</p>
                <p>{ingredients.proteins}</p>
            </li>
            <li>
                <p>Углеводы, г</p>
                <p>{ingredients.carbohydrates}</p>
            </li>
            </ul>

        </section>
    )
}