import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-modal-details.module.css'
import { useDispatch, useSelector } from "../../utils";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { feedInitAction, feedCloseAction } from "../../services/actions/feed";

export default function OrderModalDetails() {
    const { orderItem } = useSelector(state => state.ingredientInfo)
    const date = orderItem?.updatedAt;
    const { data } = useSelector((state) => state.ingredients) //массив всех ингредиентов
    const ingredients = orderItem?.ingredients;
    const { ingredientId } = useParams();
    const { orders } = useSelector(state => state.feed)
    const dispatch = useDispatch()
    useEffect(() => {




        dispatch(feedInitAction('wss://norma.nomoreparties.space/orders/all'));

        // return () => {
        //     dispatch(feedCloseAction());
        // }    ;



    }, [dispatch]);


    const selectedArr = orders.filter((item) => {
        return item._id === ingredientId;
    });

    const chosedOrder = selectedArr[0];
    console.log(chosedOrder)


    // const ordersIngredients = chosedOrder.ingredients


    //заказ, чей айди схож с прописанным
    //ингредиенты в заказе
    // console.log(ordersIngredients)

    //   src={
    //     ingredients ? ingredients.image_large : chosedIngredient.image_large
    //   }

    // const orderIngredients = useMemo(() => data.filter(el => {
    //     for (let i = 0; i <= ingredients.length; i++) {
    //         if (ingredients[i] && (ingredients[i] === el._id)) {
    //             return el
    //         }
    //     }
    // }), [data])

    // const orderIngredients = useMemo(() =>


    //     !orderItem ? (

    //         data.filter(el => {
    //             for (let i = 0; i <= chosedOrder.ingredients.length; i++) {
    //                 if (chosedOrder.ingredients[i] && (chosedOrder.ingredients[i] === el._id)) {
    //                     return el
    //                 }
    //             }
    //         })
    //     ) : (
    //     )
    //     // : (
    //     //     data.filter(el => {
    //     //         for (let i = 0; i <= chosedOrder.ingredients.length; i++) {
    //     //             if (chosedOrder.ingredients[i] && (chosedOrder.ingredients[i] === el._id)) {
    //     //                 return el
    //     //             }
    //     //         }
    //     //     })
    //     // )

    //     , [data])


    //здесь мы сравниваем айди котрые есть в заказе с айди элементов масива и переводим йди заказа в элементы
    //у каждого заказа есть свой айди


    // return data.length === 0 ? (
    //   <p className={`${style.loader} text text_type_main-large mt-10 `}>
    //     Загрузка...
    //   </p>
    // ) : (
    //   <section className={ingredients ? style.section : style.single}>
    //     <img
    //       src={
    //         ingredients ? ingredients.image_large : chosedIngredient.image_large
    //       }

    // const ingPrice = chosedOrder.ingredients.map((item: any) => item.type === "bun" ? item.price * 2 : item.price)


    const initialValue = 0;

    // let totalPrice = ingPrice.reduce((acc: number, i: any) => acc + i, initialValue);

    // if (!chosedOrder) {
    //     return (<h2 className="text text_type_main-large mt-15 pt-15">Загрузка...</h2>)
    // } else



    return (

        !chosedOrder && !orderItem ? (
            <p className={`${styles.loader} text text_type_main-large mt-10 `}>
                Загрузка...
            </p>
        ) :
            <div className={`${styles.element}`}>


                {chosedOrder && <p className={`${styles.number} text text_type_digits-default`}>{`#${chosedOrder.number}`}</p>}
                {chosedOrder && <h2 className="text text_type_main-medium mt-6 mb-2 mt-10">{chosedOrder.name}</h2>}
                {orderItem && <h2 className="text text_type_main-medium mt-6 mb-2">{orderItem.name}</h2>}

                {chosedOrder && <p className={`${styles.status} text text_type_main-default mt-2 mb-7 `}>{chosedOrder.status === 'done' ? 'выполнен' : 'готовится'}</p>}
                {orderItem && <p className={`${styles.status} text text_type_main-default mt-2 mb-7`}>{orderItem.status === 'done' ? 'выполнен' : 'готовится'}</p>}
                <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
                <div className={styles.composition}>

                    <ul className={styles.ul}>
                        {orderItem &&
                            data.filter(el => {
                                for (let i = 0; i <= ingredients.length; i++) {
                                    if (ingredients[i] && (ingredients[i] === el._id)) {
                                        return el
                                    }
                                }
                            }).map((element) =>
                                <li className={`${styles.orderElement} mb-4`}>
                                    <img className={styles.img} src={element.image_mobile} alt={element.name}
                                        key={element._id}></img>
                                    <p className={`${styles.text} text text_type_main-small`}>{element.name}</p>
                                    <div className={styles.price}>

                                        <p className='text text_type_digits-default mr-2'>
                                            {element.type === 'bun' ? `${'2 x'}  ${element.price}` : `${'1 x'}  ${element.price}`}
                                        </p>

                                        <CurrencyIcon type="primary" />
                                    </div>
                                </li>
                            )}

                        {chosedOrder &&
                            data.filter(el => {
                                for (let i = 0; i <= chosedOrder.ingredients.length; i++) {
                                    if (chosedOrder.ingredients[i] && (chosedOrder.ingredients[i] === el._id)) {
                                        return el
                                    }
                                }
                            }).map((element) =>
                                <li className={`${styles.orderElement} mb-4`}>
                                    <img className={styles.img} src={element.image_mobile} alt={element.name}
                                        key={element._id}></img>
                                    <p className={`${styles.text} text text_type_main-small`}>{element.name}</p>
                                    <div className={styles.price}>

                                        <p className='text text_type_digits-default mr-2'>
                                            {element.type === 'bun' ? `${'2 x'}  ${element.price}` : `${'1 x'}  ${element.price}`}
                                        </p>

                                        <CurrencyIcon type="primary" />
                                    </div>
                                </li>
                            )}

                    </ul>
                    <div className={styles.basement}>
                        {chosedOrder && <FormattedDate className={` ${styles.date} text text_type_main-default text_color_inactive `} date={new Date(`${chosedOrder.createdAt}`
                        )} />}
                        {orderItem && <FormattedDate className={` ${styles.date} text text_type_main-default text_color_inactive `} date={new Date(`${orderItem.createdAt}`
                        )} />}
                        <div className={styles.price}>
                            {chosedOrder &&
                                <p className='text text_type_digits-default mr-2'>

                                    {`${data.filter(el => {
                                        for (let i = 0; i <= chosedOrder.ingredients.length; i++) {
                                            if (chosedOrder.ingredients[i] && (chosedOrder.ingredients[i] === el._id)) {
                                                return el
                                            }
                                        }
                                    }).map(el => el.type === "bun" ? el.price * 2 : el.price).reduce((acc: number, i: any) => acc + i, initialValue)}`}
                                </p>}

                            {orderItem &&
                                <p className='text text_type_digits-default mr-2'>

                                    {`${data.filter(el => {
                                        for (let i = 0; i <= ingredients.length; i++) {
                                            if (ingredients[i] && (ingredients[i] === el._id)) {
                                                return el
                                            }
                                        }
                                    }).map(el => el.type === "bun" ? el.price * 2 : el.price).reduce((acc: number, i: any) => acc + i, initialValue)}`}
                                </p>}



                            <CurrencyIcon type="primary" />
                        </div>
                    </div>






                </div>

            </div>

    )


}