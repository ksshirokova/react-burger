

import  doneIcon  from '../../images/graphics.svg'
import PropTypes from 'prop-types'; 
import style from './order-details.module.css';
import { useSelector } from 'react-redux'; 
import {Circles} from 'react-loader-spinner'

export default function OrderDetails({number}) {
    const isLoading = useSelector(state=>state.orderInfo.loading) 

    return (
        <section className={style.section}>
            <p className="text text_type_digits-large mt-9 mb-8">{number}</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            {isLoading ? <div className={style.loader}><Circles color='#fff' /></div> : <img src={doneIcon} alt='иконка успешной загрузки заказа'/>}
            
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
        </section>

    )
}

OrderDetails.propTypes = {
    number: PropTypes.number
}