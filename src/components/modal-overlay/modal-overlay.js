import React from 'react';
import ModalOverlayStyle from './modal-overlay.module.css'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default function ModalOverlay({ toClose}) {
    // React.useEffect(()=>{
    //     const handleEsc = (event) => {
    //         event.key === 'Escape' && onClose()
    //     }
    //     document.addEventListener('keypress', handleEsc);

    //     return () =>{
    //         document.removeEventListener('keypress', handleEsc)
    //     }
    // }, [onClose()])
    return (
        <>
            <section className={ModalOverlayStyle.overlay} onClick={toClose}>
                
               
            </section>

            

        </>
    )
}