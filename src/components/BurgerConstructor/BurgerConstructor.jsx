import React from "react";
import styles from "./BurgerConstructor.module.css"
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.json"

class BurgerConstructor extends React.Component {
	
	render() {
		return (
			<div className={styles.wrapper}>
				<div className={styles.ingredients}>
					{data.map((elem, id) => {
						return (
							<ConstructorElement key={id} text={elem.name} thumbnail={elem.image} price={200}/>
						)
					})}
				</div>
				<div className={styles.totalPrice}>
					<div className={styles.price}>
						<p className="text text_type_digits-medium">610</p>
						<CurrencyIcon type={"primary"}/>
					</div>
					<Button htmlType="button" type="primary" size="medium">
						Оформить заказ
					</Button>
				</div>
			</div>
		);
	}
}

export default BurgerConstructor;
