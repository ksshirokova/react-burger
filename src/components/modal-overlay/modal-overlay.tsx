import style from "./modal-overlay.module.css";


export default function ModalOverlay({ toClose } : {toClose: () => void}) {
  return <section className={style.overlay} onClick={toClose}></section>;
}


