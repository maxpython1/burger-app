import {
  CurrencyIcon,
  FormattedDate
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderCard.module.css";

type TOrderCardProps = {
  number: number;
  name: string;
  createdAt: string;
  images: string[];
  price: number;
};

function OrderCard({
  number,
  name,
  createdAt,
  images,
  price
}: TOrderCardProps) {
  const visibleImagesIngredients = images.slice(0, 6);
  const otherImagesIngredients =
    images.length - visibleImagesIngredients.length;

  return (
    <article className={styles.cardWrapper}>
      <div className={styles.orderNumber}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium">{name}</p>
      <div className={styles.ingredients}>
        <div className={styles.imgWrapper}>
          {visibleImagesIngredients.map((el, idx) => {
            const isLast = idx === visibleImagesIngredients.length - 1;
            const showExtra = isLast && otherImagesIngredients > 0;
            return (
              <div key={idx} className={styles.imgIngredientWrapper}>
                <img
                  className={styles.imgIngredient}
                  src={el}
                  alt={"Картинка ингредиента" + name}
                />
                {showExtra && (
                  <span
                    className={`text text_type_main-default ${styles.otherImages}`}
                  >
                    {`+${otherImagesIngredients}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{price}</p>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
