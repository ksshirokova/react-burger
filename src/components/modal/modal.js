import React from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalStyle from './modal.module.css';
import OrderDetails from '../order-details/order-details';

export default function Modal(props) {
    return (
        <section className={`${ModalStyle.container} pt-15 pb-15 pr-10 pl-10`}>
                <h3>Детали ингредиента</h3>
                <CloseIcon type="primary" />
                <div>{props.children}</div>
                
             

        </section>
    )
}