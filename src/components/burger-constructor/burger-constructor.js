import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import {
  DROP_CONSTRUCTOR_ELEMENT,
  CHECK_DROPED_ELEMENT,
} from "../../services/actions/constructors-ingredients";
import {
  OPEN_ORDER_MODAL,
  ADD_ORDER_REQUEST,
} from "../../services/actions/order-modal";
import { sendOrder } from "../../services/actions/order-modal";
import { DELITE_ELEMENT } from "../../services/actions/constructors-ingredients";
import { dropElement } from "../../services/actions/constructors-ingredients";
import { v4 as uuid1 } from "uuid";

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const draggedFilling = useSelector(
    (state) => state.constructorStore.draggedFilling
  );
  const draggedBuns = useSelector(
    (state) => state.constructorStore.draggedBuns
  );
  
  const burgerIngredients = useSelector(
    (state) => state.constructorStore.draggedFilling
  );

  const draggedElement = useSelector(
    (state) => state.constructorStore.draggedElement
  );
  const burgerIngredient = burgerIngredients.map((item) => item._id);

  const openOrderModal = () => {
    dispatch({ type: OPEN_ORDER_MODAL });
    dispatch(sendOrder(burgerIngredient));
  };
  const handleDrop = (e, item) => {
    setTimeout(() => {
      e.preventDefault();
      dispatch(dropElement(item));
      
      dispatch({ type: CHECK_DROPED_ELEMENT });
    }, 0);

  };
  
  

  const handleDragOver = (event) => {
    //обработчик при наведении
    event.preventDefault();
  };

  const onDelite = (index) => {
    dispatch({ type: DELITE_ELEMENT, payload: index });
  };

  const fillingPrice = draggedFilling.map((item) => {
    return item.price;
  });

  const bunPrice = draggedBuns.map((item) => {
    return item.price;
  });
  const initialValue = 0;

  let fillingsPrice = fillingPrice.reduce((acc, i) => acc + i, initialValue);
  

  const totalPriceCounter = useMemo(() => {
    let totalPrice = 0;
    if (!bunPrice[0]) {
      totalPrice = fillingsPrice;
    } else {
      totalPrice = fillingsPrice + bunPrice[0] + bunPrice[0];
    }
    return totalPrice;
  }, [draggedFilling]);

  return (
    <>
      <section>
        <section
          className={style.section}
          onDragOver={handleDragOver}
          onDrop={(e)=>handleDrop(e)}
        >
          <ul className={style.ul}>
            {draggedBuns &&
              draggedBuns.map((item) => (
                <BurgerConstructorElement
                  item={item}
                  typeOfText={`${item.name} (верх)`}
                  index={0}
                  type={"top"}
                  isLocked={true}
                  className={"mb-4 ml-8"}
                  key={`${item.uuid} (верх)`}
                />
              ))}

            <div>
              {draggedFilling &&
                draggedFilling.map((item, index) => (
                  <BurgerConstructorElement
                    item={item}
                    index={index}
                    isLocked={false}
                    id={item._id}
                    className={"mb-4 ml-2"}
                    toClose={onDelite}
                    typeOfText={item.name}
                    key={item.uuid}
                  />
                ))}
            </div>

            {draggedBuns &&
              draggedBuns.map((item) => (
                <BurgerConstructorElement
                  item={item}
                  key={`${item.uuid} (низ)`}
                  typeOfText={`${item.name} (низ)`}
                  index={0}
                  type={"bottom"}
                  isLocked={true}
                  className={"mb-4 ml-8"}
                />
              ))}
          </ul>
        </section>
        <section className={`${style.total} mt-10`}>
          <p className="text text_type_digits-medium">{totalPriceCounter}</p>
          <div className={style.icon}>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openOrderModal}
          >
            Оформить заказ
          </Button>
        </section>
      </section>
    </>
  );
}

