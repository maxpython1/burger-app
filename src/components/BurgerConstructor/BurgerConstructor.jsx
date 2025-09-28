import React from "react";
import styles from "./BurgerConstructor.module.css"
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.json"
import icon from "../../images/vector.svg"

class BurgerConstructor extends React.Component {
	render() {
		let bun = data.find((elem) => elem.type === "bun");
		return (
			<div className={styles.wrapper}>
				<div className={styles.bun}>
					{bun && <ConstructorElement text={`${bun.name} (верх)`} type={"top"} isLocked={true} thumbnail={bun.image}
					                            price={bun.price}/>}
				</div>
				<ul className={styles.ingredients}>
					{data.filter((arr) => arr.type !== "bun").map((elem, id) => {
						return (
							<li key={id} className={styles.cardIngredient}>
								<img src={icon} alt={"Иконка перетаскивания"}/>
								<ConstructorElement text={elem.name}
								                    thumbnail={elem.image}
								                    price={elem.price}/>
							</li>
						)
					})}
				</ul>
				<div className={styles.bun}>
					{bun && <ConstructorElement text={`${bun.name} (низ)`} type={"bottom"} isLocked={true} thumbnail={bun.image}
					                            price={bun.price}/>}
				</div>
				<div className={styles.totalPrice}>
					<div className={styles.price}>
						<p className="text text_type_digits-medium">610</p>
						<CurrencyIcon type={"primary"}/>
					</div>
					<Button htmlType="button" type="primary" size="large">
						Оформить заказ
					</Button>
				</div>
			</div>
		);
	}
}

export default BurgerConstructor;
