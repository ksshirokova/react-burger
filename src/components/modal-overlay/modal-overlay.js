import React from "react";
import style from "./modal-overlay.module.css";

export default function ModalOverlay({ toClose }) {
  return (
    <>
      <section className={style.overlay} onClick={toClose}></section>
    </>
  );
}
