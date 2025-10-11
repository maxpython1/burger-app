import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

function ModalOverlay({children, onCloseModal}) {
	const modal = document.getElementById("react-modals");
	
	return ReactDOM.createPortal(
		(<div className={styles.modalOverlay} onClick={onCloseModal}>
			{children}
		</div>), modal);
}

ModalOverlay.propTypes = {
	onCloseModal: PropTypes.func.isRequired
};

export default ModalOverlay;
