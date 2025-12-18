import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { wsConnect, wsDisconnect } from "../../services/slices/feedSlice";
import { TIngredient } from "../../utils/types";
import styles from "./Feed.module.css";

function Feed() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const ingredients = useAppSelector((store) => store.ingredients.ingredients);
  const ingredientsMap = new Map(ingredients.map((el) => [el._id, el]));

  const { orders, total, totalToday } = useAppSelector((store) => store.feed);

  const doneNumbers = orders
    .filter((el) => el.status === "done")
    .slice(0, 5)
    .map((el) => el.number);

  const pendingNumbers = orders
    .filter((el) => el.status === "pending")
    .slice(0, 5)
    .map((el) => el.number);

  useEffect(() => {
    dispatch(wsConnect("wss://norma.education-services.ru/orders/all"));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <p className="text text_type_main-large">Лента заказов</p>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.orders}>
            {orders.map((el) => {
              const orderIngredients = el.ingredients
                .map((el) => ingredientsMap.get(el))
                .filter((el): el is TIngredient => el !== undefined);

              const images = orderIngredients.map((el) => el.image_mobile);

              const price = orderIngredients.reduce(
                (acc, el) => acc + el.price,
                0
              );

              return (
                <Link
                  key={el.number}
                  to={`/feed/${el.number}`}
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
        <div className={styles.right}>
          <div className={styles.infoWrapper}>
            <div className={styles.info}>
              <p className={`text text_type_main-medium`}>Готовы</p>
              <div className={`text_color_success ${styles.numbers}`}>
                {doneNumbers.map((el, id) => (
                  <p key={id} className={`text text_type_digits-default`}>
                    {el}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.info}>
              <p className={`text text_type_main-medium`}>В работе</p>
              <div className={styles.numbers}>
                {pendingNumbers.map((el, id) => (
                  <p key={id} className={`text text_type_digits-default`}>
                    {el}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.completedAll}>
            <p className={`text text_type_main-medium`}>
              Выполнено за все время:
            </p>
            <p className={`text text_type_digits-large`}>{total}</p>
          </div>
          <div className={styles.completedToday}>
            <p className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </p>
            <p className={`text text_type_digits-large`}>{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
