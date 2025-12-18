import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../hooks/redux";
import { TIngredient } from "../../utils/types";
import styles from "./CardIngredient.module.css";

type CardIngredientProps = {
  ingredient: TIngredient;
};

function CardIngredient({ ingredient }: CardIngredientProps) {
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const [{ isDrag }, dragRef] = useDrag(
    {
      type: ingredient.type === "bun" ? "bun" : "ingredient",
      item: { ...ingredient },
      collect: (monitor) => ({
        isDrag: monitor.isDragging()
      })
    },
    []
  );

  const getCount = (): number => {
    if (ingredient.type === "main" || ingredient.type === "sauce") {
      return ingredients.filter((el: TIngredient) => el._id === ingredient._id)
        .length;
    } else if (ingredient.type === "bun" && ingredient._id === bun?._id) {
      return 2;
    }
    return 0;
  };

  const count = getCount();

  if (isDrag) {
    return null;
  }

  return (
    <article className={styles.cardWrapper} ref={dragRef}>
      {count > 0 && <Counter count={count} />}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.countWrapper}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </article>
  );
}

export default CardIngredient;
