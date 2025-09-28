import React from "react";
import PropTypes from "prop-types";
import styles from './CardIngredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class CardIngredient extends React.Component {
	
	render() {
		const {img, count, name, price} = this.props;
		
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
}

CardIngredient.propTypes = {
	img: PropTypes.string,
	count: PropTypes.number,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired
}

export default CardIngredient;
