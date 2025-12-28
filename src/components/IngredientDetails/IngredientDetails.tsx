import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import styles from "./IngredientDetails.module.css";

function IngredientDetails() {
  const { id } = useParams();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  const ingredient = ingredients.find((el) => el._id === id);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <img
        src={ingredient.image_large}
        alt={ingredient?.name || "Ингредиент"}
      />
      <p className={`text text_type_main-medium ${styles.name}`}>
        {ingredient.name}
      </p>
      <ul className={styles.nutrients}>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </span>
        </li>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </span>
        </li>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </span>
        </li>
        <li className={styles.nutrient}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
