import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
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
		const request = fetch(URL).then((response) => {
			if (response.ok) {
				return response.json()
			} else {
				return Promise.reject(`Ошибка ${response.status}`)
			}
		}).then((result) => setData(result.data))
			.catch((error) => console.error(`Ошибка запроса ${error}`))
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
	
	const onCloseModal = () => setModal(false);
	
	return (
		<div className={styles.appWrapper}>
			<AppHeader/>
			<main className={styles.main}>
				<BurgerIngredients data={data} openModal={openModalIngredient}/>
				<BurgerConstructor data={data} openModal={openModalOrder}/>
				{modal && typeModal === "ingredient" && (<>
					<Modal title={"Детали ингредиента"} onCloseModal={onCloseModal}>
						<IngredientDetails data={selectedIngredient}/>
					</Modal>
				</>)}
				{modal && typeModal === "order" && (<>
					<Modal onCloseModal={onCloseModal}>
						<OrderDetails/>
					</Modal>
				</>)}
			</main>
		</div>
	);
}

export default App;
