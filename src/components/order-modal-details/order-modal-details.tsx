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
import { TItem, TOrder } from "../../utils/types";
import { WS_BASE_URL } from "../../services/constants";
import { useMemo } from "react";


export default function OrderModalDetails({isPage}:{isPage?: boolean}) {
  
  const { data } = useSelector((state) => state.ingredients); //массив всех ингредиентов
 
  const { orderId } = useParams();
  const { orders } = useSelector((state) => state.feed);
  const dispatch = useDispatch();



  const usersOrder: TOrder | undefined = orders.find((elem) => {
    return elem._id === orderId;
  })

  
  useEffect(() => {

    dispatch(feedInitAction(`${WS_BASE_URL}/all`));

    return () => {
      dispatch(feedCloseAction());
    };
  }, [dispatch]);
  const groupIngredients = useMemo(() => usersOrder && usersOrder.ingredients.reduce((index: { [x: string]: any; }, el: string | number) => {
    index[el] = (index[el] || 0) + 1;
    return index;
}, {}), [usersOrder])

  const orderIngredients = data.filter((item) => {
    return groupIngredients && groupIngredients[item._id];
})

  

  console.log(usersOrder)

  const initialValue = 0;

  return (

    !usersOrder ?
      <p className={`${styles.loader} text text_type_main-large mt-10 `}>
        Загрузка...
      </p>
      :
      <div className={`${styles.element}`}>

      {isPage && (
        <p
          className={`${styles.number} text text_type_digits-default`}
        >{`#${usersOrder.number}`}</p>
      )}
        <h2 className="text text_type_main-medium mt-6 mb-2 mt-10">
          {usersOrder.name}
        </h2>

        <p
          className={`${styles.status} text text_type_main-default mt-2 mb-7 `}
        >
          {usersOrder.status === "done" ? "выполнен" : "готовится"}
        </p>


        <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
        <div className={styles.composition}>
          <ul className={styles.ul}>
            {orderIngredients && orderIngredients.map((element: TItem) => (
              <li className={`${styles.orderElement} mb-4`} key={element._id}>
                <img
                  className={styles.img}
                  src={element.image_mobile}
                  alt={element.name}
                  
                ></img>
                <p className={`${styles.text} text text_type_main-small`}>
                  {element.name}
                </p>
                <div className={styles.price}>
                {groupIngredients &&
                  <p className="text text_type_digits-default mr-2">
                  {`${element.type === "bun" ? "2" : groupIngredients[element._id]} x ${element.price}`}
                  </p>}

                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}

            
          </ul>
          <div className={styles.basement}>
            {usersOrder && (
              <FormattedDate
                className={` ${styles.date} text text_type_main-default text_color_inactive `}
                date={new Date(`${usersOrder.createdAt}`)}
              />
            )}

            <div className={styles.price}>
              {usersOrder && (
                <p className="text text_type_digits-default mr-2">
                  {`${data
                    .filter((el) => {
                      for (let i = 0; i <= usersOrder.ingredients.length; i++) {
                        if (
                          usersOrder.ingredients[i] &&
                          usersOrder.ingredients[i] === el._id
                        ) {
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
