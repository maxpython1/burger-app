import React from "react";
import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";

function IngredientDetails({data}) {
	
	return (
		<div className={styles.wrapper}>
			<img src={data.image_large} alt={"Картинка ингредиента"}/>
			<p className={`text text_type_main-medium ${styles.name}`}>{data.name}</p>
			<ul className={styles.nutrients}>
				<li className={styles.nutrient}>
					<span className="text text_type_main-default text_color_inactive">Калории, ккал</span>
					<span className="text text_type_main-default text_color_inactive">{data.calories}</span>
				</li>
				<li className={styles.nutrient}>
					<span className="text text_type_main-default text_color_inactive">Белки, г</span>
					<span className="text text_type_main-default text_color_inactive">{data.proteins}</span>
				</li>
				<li className={styles.nutrient}>
					<span className="text text_type_main-default text_color_inactive">Жиры, г</span>
					<span className="text text_type_main-default text_color_inactive">{data.fat}</span>
				</li>
				<li className={styles.nutrient}>
					<span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
					<span className="text text_type_main-default text_color_inactive">{data.carbohydrates}</span>
				</li>
			</ul>
		</div>
	);
}

IngredientDetails.propTypes = {
	data: PropTypes.shape({
		_id: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string,
		proteins: PropTypes.number,
		fat: PropTypes.number,
		carbohydrates: PropTypes.number,
		calories: PropTypes.number,
		price: PropTypes.number,
		image: PropTypes.string,
		image_mobile: PropTypes.string,
		image_large: PropTypes.string,
		__v: PropTypes.number
	})
};

export default IngredientDetails;
