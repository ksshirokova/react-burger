import style from "./ingredients-details.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function IngredientDetailsPage({ingredients}) {

    const { ingredientId } = useParams();
    //сюда попадает все, что напишет пользователь
    console.log(ingredientId);
    const dispatch = useDispatch;
    const initialIngredients = useSelector(state => state.ingredients.data)
    console.log(initialIngredients)


    
    const selectedArr = initialIngredients.filter(item => {
        return item._id === ingredientId
    })
    console.log(selectedArr)

    const chosedIngredient = selectedArr[0]
    console.log(ingredients)


   

    return (
       initialIngredients.length === 0 ?
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



IngredientDetailsPage.propTypes = {
    ingredients: PropTypes.object,
};
