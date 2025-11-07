import React from "react";
import styles from "./CardIngredient.module.css";
import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

function CardIngredient({ ingredient }) {
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
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

  const count = () => {
    if (ingredient.type === "main" || ingredient.type === "sauce") {
      return ingredients.filter((el) => el._id === ingredient._id).length;
    } else if (ingredient.type === "bun" && ingredient._id === bun?._id) {
      return 2;
    }
  };

  return (
    !isDrag && (
      <article className={styles.cardWrapper} ref={dragRef}>
        {count() > 0 && <Counter count={count()} />}
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={styles.countWrapper}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type={"primary"} />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </article>
    )
  );
}

export default CardIngredient;
