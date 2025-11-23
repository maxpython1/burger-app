import { request } from "../../utils/api";
import { getCookie } from "../../utils/cookies";
import { refreshToken } from "./auth";
import { CONSTRUCTOR_CLEAR } from "./burgerConstructor";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";

export const createOrder = (ingredientsId) => async (dispatch) => {
  dispatch({ type: ORDER_REQUEST });

  return request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("token")
    },
    body: JSON.stringify({ ingredients: ingredientsId })
  })
    .then((data) => {
      dispatch({ type: ORDER_SUCCESS, payload: data.order?.number });
    })
    .then(() => dispatch({ type: CONSTRUCTOR_CLEAR }))
    .catch((e) => {
      if (e.status !== 401 && e.status !== 403) {
        dispatch({ type: ORDER_ERROR, error: e });
        return;
      }
      return dispatch(refreshToken())
        .then(() => {
          return dispatch(createOrder(ingredientsId));
        })
        .catch((e) => dispatch({ type: ORDER_ERROR, error: e }));
    });
};
