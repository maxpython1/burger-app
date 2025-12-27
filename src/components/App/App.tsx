import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import Feed from "../../pages/Feed/Feed";
import FeedOrder from "../../pages/FeedOrder/FeedOrder";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import ProfileOrders from "../../pages/ProfileOrders/ProfileOrders";
import Registration from "../../pages/Registration/Registration";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import { getUserThunk } from "../../services/slices/authSlice";
import { fetchIngredientsThunk } from "../../services/slices/ingredientsSlice";
import { getCookie } from "../../utils/cookies";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from "./App.module.css";
import { ProtectedRouteElement } from "./ProtectedRouteElement/ProtectedRouteElement";

function FeedOrderModal() {
  const { number } = useParams();
  const navigate = useNavigate();

  return (
    <Modal onCloseModal={() => navigate(-1)} title={`#${number}`}>
      <FeedOrder />
    </Modal>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(getUserThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredientsThunk());
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
            path={"/profile/orders"}
            element={
              <ProtectedRouteElement forAuthorized={true}>
                <ProfileOrders />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={"/profile/orders/:number"}
            element={
              <ProtectedRouteElement forAuthorized={true}>
                <FeedOrder />
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
          <Route path={"/feed"} element={<Feed />} />
          <Route path={"/feed/:number"} element={<FeedOrder />} />
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
            <Route
              path="/profile/orders/:number"
              element={
                <ProtectedRouteElement forAuthorized={true}>
                  <FeedOrderModal />
                </ProtectedRouteElement>
              }
            />
            <Route path="/feed/:number" element={<FeedOrderModal />} />
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
