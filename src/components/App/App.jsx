import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
	const URL = "https://norma.nomoreparties.space/api/ingredients";
	const [data, setData] = React.useState([]);
	const [modal, setModal] = React.useState(false);
	const [typeModal, setTypeModal] = React.useState();
	const [selectedIngredient, setSelectedIngredient] = React.useState();
	
	React.useEffect(() => {
		(async () => {
			try {
				const request = await fetch(URL);
				const response = await request.json();
				setData(response.data);
			} catch (e) {
				console.log(e);
			}
		})()
	}, [])
	
	function openModalIngredient(ingredient) {
		setSelectedIngredient(ingredient);
		setTypeModal("ingredient");
		setModal(true);
	}
	
	function openModalOrder() {
		setTypeModal("order");
		setModal(true);
	}
	
	return (
		<div className={styles.appWrapper}>
			<AppHeader/>
			<main className={styles.main}>
				<BurgerIngredients data={data} openModal={openModalIngredient}/>
				<BurgerConstructor data={data} openModal={openModalOrder}/>
				{modal && typeModal === "ingredient" && (<>
					<Modal title={"Детали ингредиента"} closeModal={() => setModal(false)}>
						<IngredientDetails data={selectedIngredient}/>
					</Modal>
					<ModalOverlay closeOverlay={() => setModal(false)}/>
				</>)}
				{modal && typeModal === "order" && (<>
					<Modal closeModal={() => setModal(false)}>
						<OrderDetails/>
					</Modal>
					<ModalOverlay closeOverlay={() => setModal(false)}/>
				</>)}
			</main>
		</div>
	);
}

export default App;
