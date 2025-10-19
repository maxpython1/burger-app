import React from "react";
import styles from "./OrderDetails.module.css";
import icon from "../../images/done.svg";

function OrderDetails() {
	
	return (
		<div className={styles.wrapper}>
			<p className="text text_type_digits-large">034536</p>
			<p className={`text text_type_main-medium ${styles.orderCaption}`}>идентификатор заказа</p>
			<img src={icon} alt={"Иконка подтверждения заказа"}/>
			<p className={`text text_type_main-default ${styles.orderResult}`}>Ваш заказ начали готовить</p>
			<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
		</div>
	);
}

export default OrderDetails;
