import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modals = document.getElementById("modals");

export default function Modal(props) {
  React.useEffect(() => {
    const handleEsc = (event) => {
      event.key === "Escape" && props.onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [props.onClose]);

  return ReactDOM.createPortal(
    <>
      <section className={`${style.container} pt-15 pb-15 pr-10 pl-10`}>
        <div className={style.div}>
          <h3 className="text text_type_main-large">{props.title}</h3>

          <div className={style.closeIcon} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {props.children}
      </section>

      <ModalOverlay toClose={props.onClose} />
    </>,
    modals
  );
}

modals.PropTypes ={
  props: PropTypes.obj
}
