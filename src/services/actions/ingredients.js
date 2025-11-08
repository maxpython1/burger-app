import { request } from "../../utils/api";

export const INGREDIENTS_FETCH_START = "INGREDIENTS_FETCH_START";
export const INGREDIENTS_FETCH_SUCCESS = "INGREDIENTS_FETCH_SUCCESS";
export const INGREDIENTS_FETCH_FAIL = "INGREDIENTS_FETCH_FAIL";

export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_FETCH_START });

  return request("ingredients")
    .then((data) =>
      dispatch({ type: INGREDIENTS_FETCH_SUCCESS, payload: data.data })
    )
    .catch((e) =>
      dispatch({ type: INGREDIENTS_FETCH_FAIL, payload: String(e) })
    );
};
