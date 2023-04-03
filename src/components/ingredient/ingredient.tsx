import style from "./ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { TIngredientsProps, TItem, TItemUndefined } from "../../utils/types";
import { useSelector } from "../../utils";

export const Ingredients: FC<TIngredientsProps> = ({
  ingredients,
  name,
  onOpen,
  onDragHandler,
  elRef,
  currentId,
}) => {
  const location = useLocation();

  const { draggedBuns, draggedFilling } = useSelector(
    (state) => state.constructorStore
  );

  const ingredientCount = useMemo(() => {
    let counter: any = {};

    draggedFilling.forEach((element: TItem | TItemUndefined) => {
      if (!counter[element._id]) {
        counter[element._id] = 0;
      }
      counter[element._id]++;
    });

    draggedBuns.forEach((element) => {
      if (!counter[element._id]) {
        counter[element._id] = 0;
      }
      counter[element._id]++;
    });

    return counter;
  }, [draggedFilling, draggedBuns]);

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
            <Link
              to={"/ingredients/" + item._id}
              state={{ background: location, elementId: item._id }}
              className={style.list}
            >
              <li
                key={item._id}
                className={`${style.list} ml-4 mb-8`}
                onClick={() => onOpen(item)}
                draggable
                onDrag={(e) => onDragHandler(e, item)}
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
            </Link>
          ))}
      </ul>
    </>
  );
};
