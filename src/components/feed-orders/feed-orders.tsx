import { useLocation } from 'react-router-dom'
import { TOrder } from '../../utils/types'
import styles from './feed-orders.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from '../../utils'
import { useMemo } from 'react';
import { addModalOrder } from '../../services/actions/ingredient-modal'
import { TItem } from '../../utils/types'
import { useParams } from 'react-router-dom'

export default function FeedOrders({ order }: { order: TOrder }) {
    const { _id, ingredients, name, number, updatedAt, status } = order
    const location = useLocation()
    const { data } = useSelector((state) => state.ingredients) //массив всех ингредиентов
    const dispatch = useDispatch()
    const onOpen = (el: TOrder) => {
        dispatch(addModalOrder(el));
        // openIngredientModal();
    };
    const { ingredientId } = useParams();


    const selectedArr = data.filter((item) => { 
        return item._id === ingredientId;
    });
    const chosedIngredient = selectedArr[0]; //элемнт, чей айди схож с прописанным

    // const newIngredient = newIngArray.filter(element=>element === _id)
    // console.log(dataId) //массив айди ингредиентоов

    const orderIngredients = useMemo(() => data.filter(el => {
        for (let i = 0; i <= ingredients.length; i++) {
            if (ingredients[i] && (ingredients[i] === el._id)) {
                return el
            }
        }
    }), [data]);

    // const { ingredientId } = useParams();
    // const { data } = useSelector(
    //   (state) => state.ingredients
    // );



   

    
    const ingPrice = orderIngredients.map((item) => item.type === "bun" ? item.price * 2 : item.price)


    const initialValue = 0;

    let totalPrice = ingPrice.reduce((acc: number, i: any) => acc + i, initialValue);




    const orderStatus = status === 'done' ? 'готов' : 'готовится'
    // to={"/ingredients/" + item._id}
    //           state={{ background: location, elementId: item._id }}

    return (
        <ul className={`${styles.element} p-6 mb-4`}>
            <Link to={'/feed/' + _id} state={{ background: location, elementId: _id }} className={styles.link} >
                <li className={styles.mainLink} key={_id} onClick={() => onOpen(order)}>


                    <div className={`${styles.flex} mt-4`}>
                        <p className="text text_type_digits-default">#{number}</p>
                        <FormattedDate className={` ${styles.date} text text_type_main-default text_color_inactive`} date={new Date(updatedAt)} />
                    </div>

                    <h2 className="text text_type_main-medium mt-6 mb-2">{name}</h2>
                    <p className={`${styles.status} text text_type_main-default mt-2 mb-7`}>{orderStatus}</p>
                    <div className={styles.flex}>
                        {orderIngredients.map((element) =>
                            <img className={styles.img} src={element.image_mobile} alt={element.name}
                                key={element._id}></img>)}
                        <div className={`${styles.price} mt-1 mb-1`}>
                            <p className="text text_type_digits-default mr-2">
                                {totalPrice}
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>

                </li>
            </Link>
        </ul>
    )
}