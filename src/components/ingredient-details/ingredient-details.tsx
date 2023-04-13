import style from "./ingredients-details.module.css";
import { useParams } from "react-router-dom";


import { useSelector } from "../../utils";


export default function IngredientDetailsPage() {
  const { ingredientId } = useParams();
  
  const { data } = useSelector((state) => state.ingredients);
  const ingredients = data.find(el => {
    return el._id === ingredientId;
  })
  


  return (
    data.length === 0 ?
        <p className={`${style.loader} text text_type_main-large mt-10 `}>
            Загрузка...
        </p> :
    <section className={ingredients && style.section}>
      <img
        src={
          ingredients && ingredients.image_large 
        }
        alt={ingredients && ingredients.name }
      />

      <p className="text text_type_main-medium mt-4 mb-8">
        {ingredients && ingredients.name }
      </p>

      <ul className={style.ul}>
        <li className={style.list}>
          <p className="text text_type_main-default text_color_inactive mb-2 mr-5">
            Ккалории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredients && ingredients.calories}
          </p>
        </li>
        <li className={style.list}>
          <p className="text text_type_main-default text_color_inactive mb-2 mr-5">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredients && ingredients.fat }
          </p>
        </li>
        <li className={style.list}>
          <p className="text text_type_main-default text_color_inactive mb-2 mr-5">
            Жиры. г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredients && ingredients.proteins}
          </p>
        </li>
        <li className={style.list}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredients
              && ingredients.carbohydrates
             }
          </p>
        </li>
      </ul>
    </section>
  );
}
