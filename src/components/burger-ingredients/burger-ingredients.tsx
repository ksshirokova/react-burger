import React from "react";

import style from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredients } from "../ingredient/ingredient";

import { addModalIngredients } from "../../services/actions/ingredient-modal";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ING_MODAL } from "../../services/actions/ingredient-modal";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TIngredientsState, TItem } from "../../utils/types";
import { TRootState } from "../../services/store";
import { addDraggedElement } from "../../services/actions/constructors-ingredients";



export default function BurgerIngredients() {
  const { bun, main, sauce } = useSelector<TRootState, TIngredientsState>(state => state.ingredients);
  const dispatch = useDispatch();
  

  
  const openIngredientModal = () => {
    
    dispatch({ type: OPEN_ING_MODAL });
  
  
  };

  const handleClick = (item: TItem) => {
    
      dispatch(addModalIngredients(item));
      openIngredientModal();
    
    
  };

  const handleDrag = (event: KeyboardEvent, item: TItem) => {
    
    event.preventDefault();
    dispatch(addDraggedElement(item));
  };

  const [current, setCurrent] = React.useState("one");

  const { ref: bunRef, inView: inViewBuns } = useInView();
  const { ref: sauceRef, inView: inViewSauces } = useInView();
  const { ref: mainRef, inView: inViewMain } = useInView();

  function tabSwitch(viewBuns:boolean, viewSauce:boolean, viewMain:boolean) {
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

  const moveToElement = (current: string) => {
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


