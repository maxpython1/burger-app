import React from "react";
import styles from './App.module.css'
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
	return (
		<div className={styles.appWrapper}>
			<AppHeader/>
			<main className={styles.main}>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</main>
		</div>
	);
}

export default App;
