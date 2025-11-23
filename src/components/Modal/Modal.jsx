import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

function Modal({ children, title = "", onCloseModal }) {
  const onEsc = React.useCallback(
    (e) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  return (
    <ModalOverlay onCloseModal={onCloseModal}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>
          <p className="text text_type_main-large">{title}</p>
          <CloseIcon
            type={"primary"}
            onClick={onCloseModal}
            className={styles.close}
          />
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired
};

export default Modal;
