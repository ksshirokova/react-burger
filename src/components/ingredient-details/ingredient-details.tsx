import style from "./ingredients-details.module.css";
import {useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TItem } from "../../utils/types";
import { TRootState } from "../../services/store";
import { TIngredientsState } from "../../utils/types";


export default function IngredientDetailsPage({ingredients}: {ingredients?: TItem}) {

    const { ingredientId } = useParams();
    const { data } = useSelector<TRootState, TIngredientsState>(state => state.ingredients)
    


    
    const selectedArr = data.filter(item => {
        return item._id === ingredientId
    })
    

    const chosedIngredient = selectedArr[0]
    


   

    return (
      data.length === 0 ?
        <p className={`${style.loader} text text_type_main-large mt-10 `}>
            Загрузка...
        </p>
        :
        <section className={ingredients ? style.section : style.single}>
           
            <img src={ingredients ? ingredients.image_large : chosedIngredient.image_large} alt={ingredients ?   ingredients.name : chosedIngredient.name} />
             <p className="text text_type_main-medium mt-4 mb-8">{ingredients ? ingredients.name : chosedIngredient.name}</p>
        
        <ul className={style.ul}>
          <li className={style.list}>
            <p className="text text_type_main-default text_color_inactive mb-2 mr-5">
              Ккалории, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredients ? ingredients.calories : chosedIngredient.calories}
            </p>
          </li>
          <li className={style.list}>
            <p className="text text_type_main-default text_color_inactive mb-2 mr-5">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredients ? ingredients.fat : chosedIngredient.fat}
            </p>
          </li>
          <li className={style.list}>
            <p className="text text_type_main-default text_color_inactive mb-2 mr-5">
              Жиры. г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredients ? ingredients.proteins : chosedIngredient.proteins}
            </p>
          </li>
          <li className={style.list}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredients ? ingredients.carbohydrates : chosedIngredient.carbohydrates}
            </p>
          </li>
        </ul>
        </section>

    );

}



