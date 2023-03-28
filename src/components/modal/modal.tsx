import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";


const modals = document.getElementById("modals") as HTMLElement;

export default function Modal({onClose, title, children} : {onClose: ()=> void, title: string, children: JSX.Element}) 
{
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      event.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  

  


    return ReactDOM.createPortal(



      <>
        <section className={`${style.container} pt-15 pb-15 pr-10 pl-10`}>
          <div className={style.div}>
            <h3 className="text text_type_main-large">{title}</h3>

            <div className={style.closeIcon} onClick={onClose}>
              <CloseIcon type="primary" />
            </div>
          </div>
          {children}
        </section>

        <ModalOverlay toClose={onClose} />
      </>,

      modals
    )
  
}


