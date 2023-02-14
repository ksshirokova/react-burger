import React from 'react';
import OrderStyle from './order-details.module.css'

export default function OrderDetails() {
    return (
        <section className={OrderStyle.container}>
            <p>034536</p>
            <p>идентификатор заказа</p>
            <img src="../images/done.png"></img>
            <p>Ваш заказ начали готовить</p>
            <p>Дождитесь готовности на орбитальной станции</p>
        </section>

    )
}