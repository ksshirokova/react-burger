import {
    FormattedDate,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-modat-users-details.module.css";
import { useDispatch, useSelector } from "../../utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { feedInitAction, feedCloseAction } from "../../services/actions/feed";
import { v4 as uuid1 } from "uuid";
import { TItem } from "../../utils/types";
import { getCookie } from "../../utils/utils";

export default function OrderModalUsersDetails({isPage}:{isPage?:boolean}) {
    
    const { data } = useSelector((state) => state.ingredients); //массив всех ингредиентов
    
    const { usersOrderId } = useParams();
    const { orders } = useSelector((state) => state.feed);
    const dispatch = useDispatch();



    const usersOrder: any = orders.find((elem) => {
        return elem._id === usersOrderId;
    })
    useEffect(() => {
        
            
        getCookie("token")?.slice(0, 7) === "Bearer "
            ? dispatch(
                feedInitAction(
                    `wss://norma.nomoreparties.space/orders?token=${getCookie("token")?.split("Bearer ")[1]
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
    }, [dispatch]);

    let orderIngredients: TItem[] = [];

    if (usersOrder) {
        usersOrder.ingredients.forEach((ingredient: string) => {
            data.forEach((element: TItem) => {
                if (element._id === ingredient) {
                    orderIngredients = [...orderIngredients, element];
                }
            });
        });
    }

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
                            <li className={`${styles.orderElement} mb-4`} key={uuid1()}>
                                <img
                                    className={styles.img}
                                    src={element.image_mobile}
                                    alt={element.name}
                                    key={uuid1()}
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
