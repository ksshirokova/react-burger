import React from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';
import ModalStyle from './modal.module.css';
import OrderDetails from '../order-details/order-details';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modals = document.getElementById('modals')

export default function Modal(ingredient) {

    React.useEffect(() => {
        const handleEsc = (event) => {

            event.key === 'Escape' && ingredient.onClose()
        }

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc)
        };
    }, [ingredient.onClose])

    return ReactDOM.createPortal(
        <>
        <ModalOverlay toClose={ingredient.onClose}   />
        <section className={`${ModalStyle.container} pt-15 pb-15 pr-10 pl-10`}>

                    <div className={ModalStyle.div}>
                        <h3 className='text text_type_main-large'>{ingredient.title}</h3>

                        <div className={ModalStyle.closeIcon} onClick={ingredient.toClose}>
                            <CloseIcon type="primary" />
                        </div>

                    </div>

                    
                    {ingredient.children}
                </section>
        
        </>
        ,
        modals
    )
}
