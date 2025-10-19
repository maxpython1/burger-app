import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredient from "../CardIngredient/CardIngredient";

function BurgerIngredients({data, openModal}) {
	const [current, setCurrent] = React.useState("Булки");
	let buns = React.useMemo(() => data.filter((arr) => arr.type === "bun"), [data]);
	let sauces = React.useMemo(() => data.filter((arr) => arr.type === "sauce"), [data]);
	let main = React.useMemo(() => data.filter((arr) => arr.type === "main"), [data]);
	
	return (
		<div className={styles.wrapper}>
			<p className={`text text_type_main-large ${styles.title}`}>Соберите бургер</p>
			<div className={styles.tab}>
				<Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="Начинки" active={current === "Начинки"} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={styles.scrollArea}>
				<p className={`text text_type_main-medium ${styles.ingredientTitle}`}>Булки</p>
				<ul className={styles.grid}>
					{buns.map((elem, id) => {
						return (
							<li key={id} onClick={() => openModal(elem)} className={styles.ingredients}>
								<CardIngredient count={1} price={elem.price} img={elem.image} name={elem.name}/>
							</li>
						)
					})}
				</ul>
				<p className={`text text_type_main-medium ${styles.ingredientTitle}`}>Соусы</p>
				<ul className={styles.grid}>
					{sauces.map((elem, id) => {
						return (
							<li key={id} onClick={() => openModal(elem)} className={styles.ingredients}>
								<CardIngredient count={1} price={elem.price} img={elem.image} name={elem.name}/>
							</li>
						)
					})}
				</ul>
				<p className={`text text_type_main-medium ${styles.ingredientTitle}`}>Начинки</p>
				<ul className={styles.grid}>
					{main.map((elem, id) => {
						return (
							<li key={id} onClick={() => openModal(elem)} className={styles.ingredients}>
								<CardIngredient count={1} price={elem.price} img={elem.image} name={elem.name}/>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
}

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;
