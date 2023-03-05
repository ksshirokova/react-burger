import React from "react";

import style from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "../ingredient/ingredient";
import { getIngredients } from "../../services/actions/ingredients";
import { addModalIngredients } from "../../services/actions/ingredient-modal";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ING_MODAL } from "../../services/actions/ingredient-modal";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { addDraggedElement } from "../../services/actions/constructors-ingredients";

export default function BurgerIngredients({ dragHandler }) {
  const { bun, main, sauce } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const openIngredientModal = () => {
    dispatch({ type: OPEN_ING_MODAL });
  };

  const handleClick = (item) => {
    dispatch(addModalIngredients(item));
    openIngredientModal();
  };

  const handleDrag = (event, item, uuid) => {
    //обработчик когда зажали
    event.preventDefault();
    dispatch(addDraggedElement(item, uuid));
  };

  const [current, setCurrent] = React.useState("one");

  const { ref: bunRef, inView: inViewBuns } = useInView();
  const { ref: sauceRef, inView: inViewSauces } = useInView();
  const { ref: mainRef, inView: inViewMain } = useInView();

  function tabSwitch(viewBuns, viewSauce, viewMain) {
    if (viewBuns) {
      return setCurrent("one");
    }
    if (viewSauce) {
      return setCurrent("two");
    }
    if (viewMain) {
      return setCurrent("three");
    }
  }

  useEffect(() => {
    tabSwitch(inViewBuns, inViewSauces, inViewMain);
  }, [inViewBuns, inViewSauces, inViewMain]);

  const moveToElement = (current) => {
    const element = document.getElementById(`${current}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className={style.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav className={style.nav}>
        <ul className={style.ul}>
          <li>
            <Tab
              value="one"
              active={current === "one"}
              onClick={() => {
                moveToElement("one");
              }}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value="two"
              active={current === "two"}
              onClick={() => {
                moveToElement("two");
              }}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value="three"
              active={current === "three"}
              onClick={() => {
                moveToElement("three");
              }}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>

      <section className={style.container} id="container">
        <Ingredients
          elRef={bunRef}
          name="Булки"
          currentId={"one"}
          ingredients={bun}
          onOpen={handleClick}
          onDragHandler={handleDrag}
        />
        <Ingredients
          elRef={sauceRef}
          name="Соусы"
          currentId={"two"}
          ingredients={sauce}
          onOpen={handleClick}
          onDragHandler={handleDrag}
        />
        <Ingredients
          elRef={mainRef}
          name="Начинки"
          currentId={"three"}
          ingredients={main}
          onOpen={handleClick}
          onDragHandler={handleDrag}
        />
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  dragHandler: PropTypes.func,
};
