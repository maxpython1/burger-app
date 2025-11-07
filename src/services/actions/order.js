export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";

export const createOrder = (ingredientsId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });
    const res = await fetch("https://norma.education-services.ru/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsId })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error("Ошибка");
    }

    dispatch({ type: ORDER_SUCCESS, payload: data.order.number });
  } catch (e) {
    dispatch({ type: ORDER_ERROR, error: e.message });
  }
};
