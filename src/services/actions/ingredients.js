export const INGREDIENTS_FETCH_START = "INGREDIENTS_FETCH_START";
export const INGREDIENTS_FETCH_SUCCESS = "INGREDIENTS_FETCH_SUCCESS";
export const INGREDIENTS_FETCH_FAIL = "INGREDIENTS_FETCH_FAIL";

export const fetchIngredients = () => async (dispatch) => {
  try {
    dispatch({ type: "INGREDIENTS_FETCH_START" });

    const res = await fetch(
      "https://norma.education-services.ru/api/ingredients"
    );
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();

    dispatch({ type: "INGREDIENTS_FETCH_SUCCESS", payload: data.data });
  } catch (err) {
    dispatch({ type: "INGREDIENTS_FETCH_FAIL", payload: String(err) });
  }
};
