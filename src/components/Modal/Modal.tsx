import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  title?: string;
  onCloseModal: () => void;
};

function Modal({ children, title = "", onCloseModal }: ModalProps) {
  const onEsc = React.useCallback(
    (e: KeyboardEvent) => {
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

export default Modal;
