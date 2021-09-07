import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

function Modal({ modalClose, modalImage }) {
  useEffect(() => {
    window.addEventListener("keydown", handleCloseModal);
    return () => window.removeEventListener("keydown", handleCloseModal);
  });

  const handleCloseModal = (e) => {
    if (e.key === "Escape" || e.target === e.currentTarget) {
      modalClose();
      console.log(e.key);
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleCloseModal}>
      <div className={s.Modal}>
        <img className={s.modalImage} src={modalImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

export default Modal;
