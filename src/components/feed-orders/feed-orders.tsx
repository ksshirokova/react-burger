import { useLocation } from 'react-router-dom'
import { TItem, TOrder } from '../../utils/types'
import styles from './feed-orders.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from '../../utils'
import { addModalOrder } from '../../services/actions/ingredient-modal'


export default function FeedOrders({ order }: { order: TOrder }) {
    const { _id, ingredients, name, number, updatedAt, status } = order
    const location = useLocation()
    const { data } = useSelector((state) => state.ingredients) //массив всех ингредиентов
    const dispatch = useDispatch()
    const onOpen = (el: TOrder) => {
        dispatch(addModalOrder(el));
      
    };








    let orderIngredients: TItem[] = []

    if (ingredients.length) {
        ingredients.forEach((ingredient: string) => {
            data.forEach((element: TItem) => {
                if (element._id === ingredient) {

                    orderIngredients = [...orderIngredients, element]
                }
            })
        })
    }




    const ingPrice = orderIngredients.map((item: TItem) => item.type === "bun" ? item.price * 2 : item.price)


    const initialValue = 0;

    let totalPrice = ingPrice.reduce((acc: number, i: number) => acc + i, initialValue);




    const orderStatus = status === 'done' ? 'готов' : 'готовится'

    return (
        <div className={`${styles.element} p-6 mb-4`}>
            <Link to={'/feed/' + _id} state={{ background: location, elementId: _id }} className={styles.link} >
                <div className={styles.mainLink} onClick={() => onOpen(order)}>


                    <div className={`${styles.flex} mt-4`}>
                        <p className="text text_type_digits-default">#{number}</p>
                        <FormattedDate className={` ${styles.date} text text_type_main-default text_color_inactive`} date={new Date(updatedAt)} />
                    </div>

                    <h2 className="text text_type_main-medium mt-6 mb-2">{name}</h2>
                    <p className={`${styles.status} text text_type_main-default mt-2 mb-7`}>{orderStatus}</p>
                    <div className={styles.flex}>
                        {orderIngredients.length < 6 && orderIngredients.map((element: TItem) =>

                            <img className={styles.img} src={element.image_mobile} alt={element.name}
                            ></img>)}
                        {orderIngredients.length >= 6 && orderIngredients.slice(0, 6).map((element: TItem) =>

                            <img className={styles.hiddenImg} src={element.image_mobile} alt={element.name}
                            ></img>


                        )
                        

                        }
                        {orderIngredients.length >= 6 && 
                        <>
                        <div className={styles.overlay}></div>
                        <p className={` text text_type_digits-default ${styles.overlayText}`}>+{orderIngredients.length - 5}</p>
                        </>
                        }

                        <div className={`${styles.price} mt-1 mb-1`}>
                            <p className="text text_type_digits-default mr-2">
                                {totalPrice}
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    )
}