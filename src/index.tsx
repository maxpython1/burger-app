import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<AppHeader/>
			<div style={{display: "flex", justifyContent: "center", gap: "40px"}}>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</div>
		</div>
	</React.StrictMode>
);
