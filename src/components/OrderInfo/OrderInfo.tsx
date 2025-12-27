import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient, TOrder } from "../../utils/types";
import styles from "./OrderInfo.module.css";

type TOrderInfo = {
  order: TOrder;
  ingredients: TIngredient[];
};

function OrderInfo({ order, ingredients }: TOrderInfo) {
  const ingredientMap = new Map(ingredients.map((el) => [el._id, el]));

  const counts: Record<string, number> = {};
  order.ingredients.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const orderIngredients = Object.entries(counts)
    .map(([id, qty]) => {
      const ingredient = ingredientMap.get(id);
      if (!ingredient) {
        return null;
      }

      const qtyToShow = ingredient.type === "bun" ? Math.max(qty, 2) : qty;

      return { ingredient, qty: qtyToShow };
    })
    .filter((el): el is { ingredient: TIngredient; qty: number } =>
      Boolean(el)
    );

  const totalPrice = orderIngredients.reduce(
    (acc, { ingredient, qty }) => acc + ingredient.price * qty,
    0
  );

  let statusText = "";
  switch (order.status) {
    case "created":
      statusText = "Создан";
      break;
    case "pending":
      statusText = "Готовится";
      break;
    case "done":
      statusText = "Выполнен";
      break;
  }

  return (
    <div className={styles.wrapper}>
      <p className={`text text_type_main-medium ${styles.orderName}`}>
        {order.name}
      </p>
      <p
        className={`text text_type_main-default text_color_success ${styles.statusOrder}`}
      >
        {statusText}
      </p>
      <p
        className={`text text_type_main-medium ${styles.compositionOrderTitle}`}
      >
        Состав:
      </p>
      <div
        className={`text text_type_main-medium ${styles.compositionOrderWrapper}`}
      >
        {orderIngredients.map(({ ingredient, qty }) => (
          <div className={styles.ingredientsWrapper} key={ingredient._id}>
            <div className={styles.ingredient}>
              <img src={ingredient.image_mobile} alt={ingredient.name} />
              <p className="text text_type_main-default">{ingredient.name}</p>
            </div>

            <div className={styles.priceWrapper}>
              <p className={styles.price}>{`${qty} x ${ingredient.price}`}</p>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.resultWrapper}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
        <div className={styles.totalPriceWrapper}>
          <p className="text text_type_main-medium">{totalPrice}</p>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
