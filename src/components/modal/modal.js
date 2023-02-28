import { IngredientPropTypes } from '../../utils/types';
import PropType from 'prop-types'
import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
const modals = document.getElementById("modals");


export default function Modal(ingredient) {
  React.useEffect(() => {
    const handleEsc = (event) => {
      event.key === "Escape" && ingredient.onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [ingredient.onClose]);

  return ReactDOM.createPortal(
    <>
      <section className={`${style.container} pt-15 pb-15 pr-10 pl-10`}>
        <div className={style.div}>
          <h3 className="text text_type_main-large">{ingredient.title}</h3>

          <div className={style.closeIcon} onClick={ingredient.onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {ingredient.children}
      </section>

      <ModalOverlay toClose={ingredient.onClose} />
    </>,
    modals
  );
}

Modal.propType = {
    ingredients: PropType.arrayOf(IngredientPropTypes).isRequired
}