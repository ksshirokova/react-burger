import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ toClose }) {
  return <section className={style.overlay} onClick={toClose}></section>;
}

ModalOverlay.propTypes = {
  toClose: PropTypes.func.isRequired,
};
