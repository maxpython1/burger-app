import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal({children, title = "", closeModal}) {
	const modal = document.getElementById("react-modals");
	
	return ReactDOM.createPortal(
		(<div className={styles.wrapper}>
			<div className={styles.title}>
				<p className="text text_type_main-large">{title}</p>
				<CloseIcon type={"primary"} onClick={closeModal} className={styles.close}/>
			</div>
			{children}
		</div>), modal);
}

Modal.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	closeModal: PropTypes.func
};

export default Modal;
