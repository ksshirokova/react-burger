import ProfileNav from "../components/profile-nav/profile-nav";
import styles from "./orders-history.module.css";

import { feedInitAction, feedCloseAction } from "../services/actions/feed";

import { getCookie } from "../utils/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../utils";
import FeedOrders from "../components/feed-orders/feed-orders";
import { checkAuth } from "../services/actions/routing";


export default function OrdersHistoryPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.feed);

  useEffect(() => {
    
    getCookie("token")?.slice(0, 7) === "Bearer "
      ? dispatch(
          feedInitAction(
            `wss://norma.nomoreparties.space/orders?token=${
              getCookie("token")?.split("Bearer ")[1]
            }`
          )
        )
      : dispatch(
          feedInitAction(
            `wss://norma.nomoreparties.space/orders?token=${getCookie("token")}`
          )
        );

    return () => {
      dispatch(feedCloseAction());
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <ProfileNav />
      </div>

      <div className={styles.orders}>
        {!orders &&  <p className={`text text_type_main-large mt-10 `}>
            Загрузка...
        </p> }
        {orders && orders.map((order) => <FeedOrders order={order} key={order._id} path={'/profile/orders/'}/>)}
      </div>
    </main>
  );
}
