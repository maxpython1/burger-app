import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { TIngredient } from "../../utils/types";
import styles from "./FeedOrder.module.css";

function FeedOrder() {
  const { number } = useParams();
  const orderNumber = Number(number);

  const ingredients = useAppSelector((store) => store.ingredients.ingredients);
  const ingredientMap = new Map(ingredients.map((el) => [el._id, el]));

  const order = useAppSelector((store) =>
    store.feed.orders.find((el) => el.number === orderNumber)
  );

  if (!order) {
    return null;
  }

  let bunShow = false;

  const orderIngredients = order.ingredients
    .map((el) => ingredientMap.get(el))
    .filter((el): el is TIngredient => Boolean(el));

  return (
    <div className={styles.wrapper}>
      <p className={`text text_type_main-medium ${styles.orderName}`}>
        {order?.name}
      </p>
      <p
        className={`text text_type_main-default text_color_success ${styles.statusOrder}`}
      >
        Выполнен
      </p>
      <p
        className={`text text_type_main-medium ${styles.compositionOrderTitle}`}
      >
        Состав:
      </p>
      <div
        className={`text text_type_main-medium ${styles.compositionOrderWrapper}`}
      >
        {order.ingredients.map((el, id) => {
          const ingredient = ingredientMap.get(el);
          if (!ingredient) {
            return null;
          }
          if (ingredient.type === "bun") {
            if (bunShow) {
              return null;
            }
            bunShow = true;
          }
          const q = {
            qty: ingredient.type === "bun" ? 2 : 1,
            price:
              ingredient.type === "bun"
                ? ingredient.price * 2
                : ingredient.price
          };
          return (
            <div className={styles.ingredientsWrapper} key={id}>
              <div className={styles.ingredient}>
                <img src={ingredient.image_mobile} alt={ingredient.name} />
                <p className={`text text_type_main-default`}>
                  {ingredient.name}
                </p>
              </div>
              <div className={styles.priceWrapper}>
                <p className={styles.price}>{`${q.qty} x ${q.price}`}</p>
                <CurrencyIcon type={"primary"} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.resultWrapper}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
        <div className={styles.totalPriceWrapper}>
          <p className="text text_type_main-medium">
            {orderIngredients.reduce((acc, el) => acc + el?.price, 0)}
          </p>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
}

export default FeedOrder;
