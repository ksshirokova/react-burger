import FeedOrders from "../components/feed-orders/feed-orders";
import styles from "./feed.module.css";
import { feedInitAction, feedCloseAction } from "../services/actions/feed";
import { useDispatch, useSelector } from "../utils";
import { useEffect } from "react";

export default function FeedPage() {
  const { orders } = useSelector((state) => state.feed);
  const { data } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(feedInitAction("wss://norma.nomoreparties.space/orders/all"));

    return () => {
      dispatch(feedCloseAction());
    };
  }, [dispatch]);

  if (!data) {
    return (
      <h2 className="text text_type_main-large mt-15 pt-15">Загрузка...</h2>
    );
  } else {
    return !data ? (
      <p className="text text_type_main-large mt-10">Загрузка...</p>
    ) : (
      <>
        <h1
          className={`${styles.header} text text_type_main-large  pt-15 pb-5`}
        >
          Лента заказов
        </h1>
        <main className={styles.main}>
          <div className={styles.FeedOrders}>
            {orders.map((order) => (
              <FeedOrders order={order} />
            ))}
          </div>

          <section className={styles.FeedNumbersContainer}>
            <div className={styles.OrdersContainer}>
              <div className={styles.DoneOrders}>
                <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                <ul className={styles.OrdersList}>
                  {orders
                    .filter((order) => order.status === "done")
                    .slice(0, 10)
                    .map(
                      (order) =>
                        order.status === "done" && (
                          <li
                            className={`${styles.DoneList} text text_type_digits-default text_color_success mb-2`}
                            key={order._id}
                          >
                            {order.number}
                          </li>
                        )
                    )}
                </ul>
              </div>
              <div className={styles.ProcessOrders}>
                <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                <ul className={styles.OrdersList}>
                  {orders
                    .filter((order) => order.status === "pending")
                    .slice(0, 10)
                    .map(
                      (order) =>
                        order.status === "pending" && (
                          <li
                            className={`${styles.ProcessList} text text_type_digits-default text_color_success mb-2`}
                            key={order._id}
                          >
                            {order.number}
                          </li>
                        )
                    )}
                </ul>
              </div>
            </div>
            <p className="text text_type_main-medium mt-15">
              Выполнено за все время
            </p>
            <p className="text text_type_digits-large">{data.total}</p>
            <p className="text text_type_main-medium mt-15">
              Выполнено за сегодня
            </p>
            <p className="text text_type_digits-large">{data.totalToday}</p>
          </section>
        </main>
      </>
    );
  }
}
