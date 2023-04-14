import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { useMemo } from "react";
import { BurgerConstructorElement } from "../burger-constructor-element/burger-constructor-element";
import { CHECK_DROPED_ELEMENT, DELITE_ELEMENT, OPEN_ORDER_MODAL } from "../../services/constants";
import { sendOrder } from "../../services/actions/order-modal";
import { dropElement } from "../../services/actions/constructors-ingredients";
import { checkAuth, getUser } from "../../services/actions/routing";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch
 } from "../../utils";
import { TItem } from "../../utils/types";
import { getCookie } from "../../utils/utils";


export default function BurgerConstructor() {
  const dispatch = useDispatch();
  
  
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.routeStore);

  const { draggedFilling, draggedBuns } = useSelector(
    (state) => state.constructorStore
  );
  const  draggedElements = [...draggedFilling, ...draggedBuns]

  const openOrderModal = () => {
    dispatch(checkAuth());
    // dispatch(getUser(getCookie('token')))
    isAuth ? dispatch(sendOrder(draggedElements)) : navigate("/login");
    isAuth && dispatch({ type: OPEN_ORDER_MODAL});
  };

  //при клике мы сначала должны проверить авторизацию
  const handleDrop = ( item: TItem) => {
    setTimeout(() => {
      // e.preventDefault();
      dispatch(dropElement(item));

      dispatch({ type: CHECK_DROPED_ELEMENT });
    }, 0);
  };

  const handleDragOver = (event: React.MouseEvent<HTMLElement>) => {
    //обработчик при наведении
    event.preventDefault();
  };

  const onDelite = (index: number) => {
    dispatch({ type: DELITE_ELEMENT, payload: index });
  };

  const fillingPrice = draggedFilling.map((item) => {
    return item.price;
  });

  const bunPrice = draggedBuns.map((item) => {
    return item.price;
  });
  const initialValue = 0;

  let fillingsPrice = fillingPrice.reduce((acc: number, i: number) => acc + i, initialValue);

  const totalPriceCounter = useMemo(() => {
    let totalPrice = 0;
    if (!bunPrice[0]) {
      totalPrice = fillingsPrice;
    } else {
      totalPrice = fillingsPrice + bunPrice[0] + bunPrice[0];
    }
    return totalPrice;
  }, [bunPrice, fillingsPrice]);

  return (
    <>
      <section>
        <section
          className={style.section}
          onDragOver={handleDragOver}
          onDrop={(item: any) => handleDrop(item)}
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
                  toClose={onDelite}
                />
              ))}

            <div>
              {draggedFilling &&
                draggedFilling.map((item, index) => (
                  <BurgerConstructorElement
                    item={item}
                    key={item.uuid}
                    typeOfText={item.name}
                    index={index}
                    isLocked={false}
                    id={item._id}
                    className={"mb-4 ml-2"}
                    toClose={onDelite}
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
                  toClose={onDelite}
                />
              ))}
          </ul>
        </section>
        <section className={`${style.total} mt-10`}>
          <p className="text text_type_digits-medium">{totalPriceCounter}</p>
          <div className={style.icon}>
            <CurrencyIcon type="primary" />
          </div>
          {draggedFilling.length > 0 && draggedBuns.length > 0 ? (
            <Button
              htmlType="button"
              type="primary"
              size="large"
              disabled={false}
              onClick={openOrderModal}
            >
              Оформить заказ
            </Button>
          ) : (
            <Button
              htmlType="button"
              type="primary"
              size="large"
              disabled={true}
              onClick={openOrderModal}
            >
              Оформить заказ
            </Button>
          )}
        </section>
      </section>
    </>
  );
}
