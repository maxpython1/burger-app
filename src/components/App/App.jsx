import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import Registration from "../../pages/Registration/Registration";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import { getUser } from "../../services/actions/auth";
import { fetchIngredients } from "../../services/actions/ingredients";
import { getCookie } from "../../utils/cookies";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from "./App.module.css";
import { ProtectedRouteElement } from "./ProtectedRouteElement/ProtectedRouteElement";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [isModalOrderOpen, setIsModalOrderOpen] = React.useState(false);

  function openOrderModal() {
    setIsModalOrderOpen(true);
  }

  function closeOrderModal() {
    setIsModalOrderOpen(false);
  }

  function closeIngredientModal() {
    navigate(-1);
  }

  return (
    <div className={styles.appWrapper}>
      <AppHeader />
      <main className={styles.main}>
        <Routes location={background || location}>
          <Route
            path={"/"}
            element={
              <>
                <BurgerIngredients />
                <BurgerConstructor openModal={openOrderModal} />
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
              <ProtectedRouteElement forAuthorized={false}>
                <Registration />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={"/forgot-password"}
            element={
              <ProtectedRouteElement forAuthorized={false}>
                <ForgotPassword />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={"/reset-password"}
            element={
              <ProtectedRouteElement forAuthorized={false}>
                <ResetPassword />
              </ProtectedRouteElement>
            }
          />
          <Route path={"/ingredients/:id"} element={<IngredientDetails />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  onCloseModal={closeIngredientModal}
                  title={"Детали ингредиента"}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
        {isModalOrderOpen && (
          <Modal onCloseModal={closeOrderModal}>
            <OrderDetails />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
