import ProfileNav from "../components/profile-nav/profile-nav";
import styles from './orders-history.module.css'

import { ordersInitAction, ordersCloseAction } from "../services/actions/users-orders";
import { feedInitAction, feedCloseAction } from "../services/actions/feed";

import { getCookie } from "../utils/utils";
import { useEffect } from "react";
import { useDispatch } from "../utils";

export default function OrdersHistoryPage() {
const dispatch = useDispatch();

    useEffect(() => {
        dispatch(feedInitAction(`wss://norma.nomoreparties.space/orders?token=${(getCookie('token'))?.slice(7, -1)}`));

        

    }, [dispatch]);

    return (
        <main className={styles.main}>
            <ProfileNav />
        </main>

    )
}