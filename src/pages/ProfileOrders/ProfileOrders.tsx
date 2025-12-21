import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logoutThunk } from "../../services/slices/authSlice";
import {
  wsConnect,
  wsDisconnect
} from "../../services/slices/profileFeedSlice";
import { getCookie } from "../../utils/cookies";
import { TIngredient } from "../../utils/types";
import styles from "./ProfileOrders.module.css";

function ProfileOrders() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const orders = useAppSelector((store) => store.profileFeed.orders);

  const ingredients = useAppSelector((store) => store.ingredients.ingredients);

  const ingredientMap = new Map(ingredients.map((el) => [el._id, el]));

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      return;
    }

    const accessToken = token.startsWith("Bearer ")
      ? token.replace("Bearer ", "")
      : token;

    dispatch(
      wsConnect(`wss://norma.education-services.ru/orders?token=${accessToken}`)
    );

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <NavLink
            end
            to={"/profile"}
            className={({ isActive }) =>
              isActive
                ? "text text_type_main-large"
                : "text text_type_main-large text_color_inactive"
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={"/profile/orders"}
            className={({ isActive }) =>
              isActive
                ? "text text_type_main-large"
                : "text text_type_main-large text_color_inactive"
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={"/"}
            onClick={() => {
              dispatch(logoutThunk());
            }}
            className="text text_type_main-large text_color_inactive"
          >
            Выход
          </NavLink>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.info}`}
          >
            В этом разделе вы можете изменить
            <br />
            свои персональные данные
          </p>
        </nav>
        <div className={styles.orders}>
          {orders.map((el, id) => {
            const orderIngredients = el.ingredients
              .map((el) => ingredientMap.get(el))
              .filter((el): el is TIngredient => Boolean(el));
            const images = orderIngredients.map((el) => el.image_mobile);

            const price = orderIngredients.reduce(
              (acc, el) => acc + el.price,
              0
            );

            return (
              <Link
                key={id}
                to={`/profile/orders/${el.number}`}
                state={{ background: location }}
              >
                <OrderCard
                  number={el.number}
                  name={el.name}
                  createdAt={el.createdAt}
                  images={images}
                  price={price}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileOrders;
