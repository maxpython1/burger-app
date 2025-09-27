import styles from './BurgerIngredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import CardIngredient from "../CardIngredient/CardIngredient";
import data from "../../utils/data.json"

class BurgerIngredients extends React.Component {
	state = {
		current: "Булки"
	};
	
	setCurrent = (value) => {
		this.setState({current: value})
	};
	
	render() {
		return (
			<div className={styles.wrapper}>
				<p className={`text text_type_main-large ${styles.title}`}>Соберите бургер</p>
				<div className={styles.tab}>
					<Tab value="Булки" active={this.state.current === 'Булки'} onClick={this.setCurrent}>
						Булки
					</Tab>
					<Tab value="Соусы" active={this.state.current === 'Соусы'} onClick={this.setCurrent}>
						Соусы
					</Tab>
					<Tab value="Начинки" active={this.state.current === 'Начинки'} onClick={this.setCurrent}>
						Начинки
					</Tab>
				</div>
				<div className={styles.scrollArea}>
					<p className={`text text_type_main-medium ${styles.ingredient}`}>Булки</p>
					<div className={styles.grid}>
						{data.filter((arr) => arr.type === "bun").map((elem, id) => {
							return (
								<CardIngredient key={id} count={20} img={elem.image} name={elem.name}/>
							)
						})}
					</div>
					<p className={`text text_type_main-medium ${styles.ingredient}`}>Соусы</p>
					<div className={styles.grid}>
						{data.filter((arr) => arr.type === "sauce").map((elem, id) => {
							return (
								<CardIngredient key={id} count={20} img={elem.image} name={elem.name}/>
							)
						})}
					</div>
					<p className={`text text_type_main-medium ${styles.ingredient}`}>Начинки</p>
					<div className={styles.grid}>
						{data.filter((arr) => arr.type === "main").map((elem, id) => {
							return (
								<CardIngredient key={id} count={20} img={elem.image} name={elem.name}/>
							)
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default BurgerIngredients;
