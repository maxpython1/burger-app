import React from "react";
import styles from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";

function IngredientDetails() {
  const data = useSelector((state) => state.currentIngredient);

  return (
    <div className={styles.wrapper}>
      <img src={data.image_large} alt={"Картинка ингредиента"} />
      <p className={`text text_type_main-medium ${styles.name}`}>{data.name}</p>
      <ul className={styles.nutrients}>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {data.calories}
          </span>
        </li>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {data.proteins}
          </span>
        </li>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {data.fat}
          </span>
        </li>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {data.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
