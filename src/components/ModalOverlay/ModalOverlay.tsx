import React from "react";
import ReactDOM from "react-dom";
import styles from "./ModalOverlay.module.css";

type ModalOverlayProps = {
  children: React.ReactNode;
  onCloseModal: () => void;
};

function ModalOverlay({ children, onCloseModal }: ModalOverlayProps) {
  const modal = document.getElementById("react-modals");

  if (!modal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onCloseModal}>
      {children}
    </div>,
    modal
  );
}

export default ModalOverlay;
