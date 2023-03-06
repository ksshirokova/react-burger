import style from "./ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { changeCount } from "../../services/actions/ingredients";
import { v4 as uuidv4 } from "uuid";

export default function Ingredients({
  ingredients,
  name,
  onOpen,
  onDragHandler,
  elRef,
  currentId,
}) {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(
    (state) => state.constructorStore.draggedFilling
  );
  const buns = useSelector((state) => state.constructorStore.draggedBuns);

  const ingredientCount = useMemo(() => {
    let counter = {};

    burgerIngredients.forEach((element) => {
      if (!counter[element._id]) {
        counter[element._id] = 0;
      }
      counter[element._id]++;
    });

    buns.forEach((element) => {
      if (!counter[element._id]) {
        counter[element._id] = 0;
      }
      counter[element._id]++;
    });

    
    return counter;
  }, [burgerIngredients]);

  return (
    <>
      <h2
        className="text text_type_main-medium mb-6 mt-10"
        ref={elRef}
        id={currentId}
      >
        {name}
      </h2>
      <ul className={style.ul}>
        {ingredients &&
          ingredients.map((item) => (
            <li
              key={item._id}
              className={`${style.list} ml-4 mb-8`}
              onClick={() => onOpen(item)}
              draggable
              onDrag={(e) => onDragHandler(e, item, uuidv4())}
            >
              <img src={item.image} alt={item.name} />
              {ingredientCount[item._id] && (
                <div className={style.counter}>
                  <Counter
                    size="default"
                    extraClass="m-1"
                    count={ingredientCount[item._id]}
                  />
                </div>
              )}
              <div className={`${style.price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-2">
                  {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>

              <p className={`${style.name} text text_type_main-default`}>
                {item.name}
              </p>
            </li>
          ))}
      </ul>
    </>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  elRef: PropTypes.func.isRequired,
  currentId: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  onDragHandler: PropTypes.func.isRequired,
};
