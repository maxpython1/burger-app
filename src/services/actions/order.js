import { request } from "../../utils/api";
import { CONSTRUCTOR_CLEAR } from "./burgerConstructor";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";

export const createOrder = (ingredientsId) => async (dispatch) => {
  dispatch({ type: ORDER_REQUEST });

  return request("orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsId })
  })
    .then((data) =>
      dispatch({ type: ORDER_SUCCESS, payload: data.order.number })
    )
    .then(() => dispatch({ type: CONSTRUCTOR_CLEAR }))
    .catch((e) => dispatch({ type: ORDER_ERROR, error: e.message }));
};
