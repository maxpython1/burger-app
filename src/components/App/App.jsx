import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients";
import {
  clearIngredient,
  setIngredient
} from "../../services/actions/currentIngredient";
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [modal, setModal] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState();

  function openModalIngredient(ingredient) {
    dispatch(setIngredient(ingredient));
    setTypeModal("ingredient");
    setModal(true);
  }

  function openModalOrder() {
    setTypeModal("order");
    setModal(true);
  }

  function onCloseModal() {
    dispatch(clearIngredient());
    setModal(false);
  }

  return (
    <div className={styles.appWrapper}>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <BurgerIngredients openModal={openModalIngredient} />
                <BurgerConstructor openModal={openModalOrder} />
              </>
            }
          />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Registration />} />
          <Route path={"/forgot-password"} element={<ForgotPassword />} />
          <Route path={"/reset-password"} element={<ResetPassword />} />
        </Routes>
        {modal && typeModal === "ingredient" && (
          <Modal title={"Детали ингредиента"} onCloseModal={onCloseModal}>
            <IngredientDetails />
          </Modal>
        )}
        {modal && typeModal === "order" && (
          <Modal onCloseModal={onCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
