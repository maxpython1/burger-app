import React from "react";
import PropTypes from "prop-types";
import styles from "./CardIngredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function CardIngredient({img, count, name, price}) {
	
	return (
		<article className={styles.cardWrapper}>
			{count > 0 && <Counter count={count}/>}
			<img src={img} alt={name}/>
			<div className={styles.countWrapper}>
				<p className="text text_type_digits-default">{price}</p>
				<CurrencyIcon type={"primary"}/>
			</div>
			<p className="text text_type_main-default">{name}</p>
		</article>
	);
}

CardIngredient.propTypes = {
	img: PropTypes.string,
	count: PropTypes.number,
	name: PropTypes.string,
	price: PropTypes.number
};

export default CardIngredient;
