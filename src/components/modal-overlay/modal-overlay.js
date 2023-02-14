import React from 'react';
import ModalOverlayStyle from './modal-overlay.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


export default function ModalOverlay (){
    return(
        <section className={ModalOverlayStyle.overlay}>
           <Modal>
           <p>034536</p>
            <p>идентификатор заказа</p>
            <img src="../images/done.png"></img>
            <p>Ваш заказ начали готовить</p>
            <p>Дождитесь готовности на орбитальной станции</p>
        
           </Modal>

        </section>
    )
}