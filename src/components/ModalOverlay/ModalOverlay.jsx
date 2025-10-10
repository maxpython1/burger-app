import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

function ModalOverlay({closeOverlay}) {
	React.useEffect(() => {
		let onEsc = (e) => e.key === "Escape" && closeOverlay();
		document.addEventListener("keydown", onEsc);
		return () => (
			document.removeEventListener("keydown", onEsc)
		);
	}, [closeOverlay])
	
	const modal = document.getElementById("react-modals");
	
	return ReactDOM.createPortal(
		(<div className={styles.modalOverlay} onClick={closeOverlay}>
		</div>), modal);
}

ModalOverlay.propTypes = {
	closeOverlay: PropTypes.func
};

export default ModalOverlay;
