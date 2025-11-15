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
import { getCookie } from "../../utils/cookies";
import { getUser } from "../../services/actions/auth";
import { ProtectedRouteElement } from "./ProtectedRouteElement/ProtectedRouteElement";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

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
          <Route
            path={"/profile"}
            element={
              <ProtectedRouteElement forAuthorized={true}>
                <Profile />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={"/login"}
            element={
              <ProtectedRouteElement forAuthorized={false}>
                <Login />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={"/register"}
            element={
              <ProtectedRouteElement>
                <Registration forAuthorized={false} />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={"/forgot-password"}
            element={
              <ProtectedRouteElement>
                <ForgotPassword forAuthorized={false} />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={"/reset-password"}
            element={
              <ProtectedRouteElement>
                <ResetPassword forAuthorized={false} />
              </ProtectedRouteElement>
            }
          />
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
