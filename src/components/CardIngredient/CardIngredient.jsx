import React from "react";
import styles from './CardIngredient.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

class CardIngredient extends React.Component {
	
	render() {
		const { img, count, name } = this.props;
		
		return (
			<div className={styles.cardWrapper}>
				<Counter count={1}/>
				<img src={img} alt={"Картинка ингредиента"}/>
				<div className={styles.countWrapper}>
					<p className="text text_type_digits-default">{count}</p>
					<CurrencyIcon type={"primary"}/>
				</div>
				<p className="text text_type_main-default">{name}</p>
			</div>
		);
	}
}

export default CardIngredient;
