import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-modal-details.module.css";
import { useDispatch, useSelector } from "../../utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { feedInitAction, feedCloseAction } from "../../services/actions/feed";
import { v4 as uuid1 } from "uuid";
import { TItem } from "../../utils/types";

export default function OrderModalDetails() {
  const { orderItem } = useSelector((state) => state.ingredientInfo);
  const { data } = useSelector((state) => state.ingredients); //массив всех ингредиентов
  const ingredients: string[] | undefined = orderItem?.ingredients;
  const { ingredientId } = useParams();
  const { orders } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(feedInitAction("wss://norma.nomoreparties.space/orders/all"));

    return () => {
      dispatch(feedCloseAction());
    };
  }, [dispatch]);

  let selectedIngredient: TItem[] = [];

  const selectedArr = orders.filter((item) => {
    return item._id === ingredientId;
  });

  const chosedOrder = selectedArr[0];

  if (chosedOrder) {
    chosedOrder.ingredients.forEach((ingredient: string) => {
      data.forEach((element: TItem) => {
        if (element._id === ingredient) {
          selectedIngredient = [...selectedIngredient, element];
        }
      });
    });
  }

  let orderIngredients: TItem[] = [];

  if (ingredients && ingredients.length) {
    ingredients.forEach((ingredient: string) => {
      data.forEach((element: TItem) => {
        if (element._id === ingredient) {
          orderIngredients = [...orderIngredients, element];
        }
      });
    });
  }

  const initialValue = 0;

  return !chosedOrder && !orderItem ? (
    <p className={`${styles.loader} text text_type_main-large mt-10 `}>
      Загрузка...
    </p>
  ) : (
    <div className={`${styles.element}`}>
      {chosedOrder && (
        <p
          className={`${styles.number} text text_type_digits-default`}
        >{`#${chosedOrder.number}`}</p>
      )}
      {chosedOrder && (
        <h2 className="text text_type_main-medium mt-6 mb-2 mt-10">
          {chosedOrder.name}
        </h2>
      )}
      {orderItem && (
        <h2 className="text text_type_main-medium mt-6 mb-2">
          {orderItem.name}
        </h2>
      )}

      {chosedOrder && (
        <p
          className={`${styles.status} text text_type_main-default mt-2 mb-7 `}
        >
          {chosedOrder.status === "done" ? "выполнен" : "готовится"}
        </p>
      )}
      {orderItem && (
        <p className={`${styles.status} text text_type_main-default mt-2 mb-7`}>
          {orderItem.status === "done" ? "выполнен" : "готовится"}
        </p>
      )}
      <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
      <div className={styles.composition}>
        <ul className={styles.ul}>
          {orderIngredients.map((element: TItem) => (
            <li className={`${styles.orderElement} mb-4`} key={uuid1()}>
              <img
                className={styles.img}
                src={element.image_mobile}
                alt={element.name}
                key={element._id}
              ></img>
              <p className={`${styles.text} text text_type_main-small`}>
                {element.name}
              </p>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">
                  {element.type === "bun"
                    ? `${"2 x"}  ${element.price}`
                    : `${"1 x"}  ${element.price}`}
                </p>

                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}

          {selectedIngredient.map((element: TItem) => (
            <li className={`${styles.orderElement} mb-4`} key={element._id}>
              <img
                className={styles.img}
                src={element.image_mobile}
                alt={element.name}
                key={element._id}
              ></img>
              <p className={`${styles.text} text text_type_main-small`}>
                {element.name}
              </p>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">
                  {element.type === "bun"
                    ? `${"2 x"}  ${element.price}`
                    : `${"1 x"}  ${element.price}`}
                </p>

                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.basement}>
          {chosedOrder && (
            <FormattedDate
              className={` ${styles.date} text text_type_main-default text_color_inactive `}
              date={new Date(`${chosedOrder.createdAt}`)}
            />
          )}
          {orderItem && (
            <FormattedDate
              className={` ${styles.date} text text_type_main-default text_color_inactive `}
              date={new Date(`${orderItem.createdAt}`)}
            />
          )}
          <div className={styles.price}>
            {chosedOrder && (
              <p className="text text_type_digits-default mr-2">
                {`${data
                  .filter((el) => {
                    for (let i = 0; i <= chosedOrder.ingredients.length; i++) {
                      if (
                        chosedOrder.ingredients[i] &&
                        chosedOrder.ingredients[i] === el._id
                      ) {
                        return el;
                      }
                    }
                  })
                  .map((el) => (el.type === "bun" ? el.price * 2 : el.price))
                  .reduce((acc: number, i: number) => acc + i, initialValue)}`}
              </p>
            )}

            {orderItem && ingredients && (
              <p className="text text_type_digits-default mr-2">
                {`${data
                  .filter((el) => {
                    for (let i = 0; i <= ingredients.length; i++) {
                      if (ingredients[i] && ingredients[i] === el._id) {
                        return el;
                      }
                    }
                  })
                  .map((el) => (el.type === "bun" ? el.price * 2 : el.price))
                  .reduce((acc: number, i: number) => acc + i, initialValue)}`}
              </p>
            )}

            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
