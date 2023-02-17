import React from 'react';
import ModalOverlayStyle from './modal-overlay.module.css'


export default function ModalOverlay({ toClose, children}) {
   
    return (
        <>
            <section className={ModalOverlayStyle.overlay} onClick={toClose}>
                {children}
               
            </section>

            

        </>
    )
}