import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import icon from "../../images/vector.svg";

function BurgerConstructor({data, openModal}) {
	let bun = React.useMemo( () => data.find((elem) => elem.type === "bun"), [data]);
	let ingredients = React.useMemo(() => data.filter((arr) => arr.type !== "bun"), [data]);
	
	return (
		<div className={styles.wrapper}>
			<div className={styles.bun}>
				{bun && <ConstructorElement text={`${bun.name} (верх)`} type={"top"} isLocked={true} thumbnail={bun.image}
				                            price={bun.price}/>}
			</div>
			<ul className={styles.ingredients}>
				{ingredients.map((elem, id) => {
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
				<Button htmlType="button" type="primary" size="large" onClick={openModal}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
}

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			type: PropTypes.string,
			proteins: PropTypes.number,
			fat: PropTypes.number,
			carbohydrates: PropTypes.number,
			calories: PropTypes.number,
			price: PropTypes.number,
			image: PropTypes.string,
			image_mobile: PropTypes.string,
			image_large: PropTypes.string,
			__v: PropTypes.number
		})
	),
	openModal: PropTypes.func
};

export default BurgerConstructor;
