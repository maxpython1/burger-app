export const CURRENT_INGREDIENT_SET = "CURRENT_INGREDIENT_SET";
export const CURRENT_INGREDIENT_CLEAR = "CURRENT_INGREDIENT_CLEAR";

export const setIngredient = (ingredient) => {
  return {
    type: CURRENT_INGREDIENT_SET,
    payload: ingredient
  };
};

export const clearIngredient = () => {
  return {
    type: CURRENT_INGREDIENT_CLEAR
  };
};
