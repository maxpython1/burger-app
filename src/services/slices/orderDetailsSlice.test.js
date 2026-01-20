import reducer, {
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderError
} from "./orderDetailsSlice";

const order = {
  _id: "order1",
  name: "Заказ",
  ingredients: ["bun1", "main1"],
  status: "done",
  number: 123,
  createdAt: "2020-01-01T00:00:00.000Z",
  updatedAt: "2020-01-01T00:00:00.000Z"
};

describe("orderDetailsSlice", () => {
  test("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, { type: "UNKNOWN" })).toEqual({
      order: null,
      isLoading: false,
      error: null
    });
  });

  test("fetchOrderStart: включает загрузку и очищает заказ", () => {
    const prev = { order, isLoading: false, error: "err" };
    const next = reducer(prev, fetchOrderStart());

    expect(next).toEqual({
      order: null,
      isLoading: true,
      error: null
    });
  });

  test("fetchOrderSuccess: кладёт заказ", () => {
    const prev = { order: null, isLoading: true, error: "err" };
    const next = reducer(prev, fetchOrderSuccess(order));

    expect(next).toEqual({
      order,
      isLoading: false,
      error: null
    });
  });

  test("fetchOrderError: кладёт ошибку и очищает заказ", () => {
    const prev = { order, isLoading: true, error: null };
    const next = reducer(prev, fetchOrderError("Не удалось"));

    expect(next).toEqual({
      order: null,
      isLoading: false,
      error: "Не удалось"
    });
  });
});
