import reducer, { clearOrder, createOrderThunk } from "./orderSlice";

describe("orderSlice", () => {
  test("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, { type: "UNKNOWN" })).toEqual({
      orderNumber: null,
      isLoading: false,
      error: null
    });
  });

  test("clearOrder: должен очистить состояние заказа", () => {
    const prev = {
      orderNumber: 123,
      isLoading: true,
      error: "err"
    };

    const next = reducer(prev, clearOrder());

    expect(next).toEqual({
      orderNumber: null,
      isLoading: false,
      error: null
    });
  });

  test("createOrderThunk.pending: включает загрузку", () => {
    const next = reducer(undefined, createOrderThunk.pending("req", ["bun1"]));

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test("createOrderThunk.fulfilled: кладёт номер заказа", () => {
    const next = reducer(
      undefined,
      createOrderThunk.fulfilled(777, "req", ["bun1"])
    );

    expect(next.isLoading).toBe(false);
    expect(next.orderNumber).toBe(777);
  });

  test("createOrderThunk.rejected: кладёт ошибку", () => {
    const next = reducer(
      undefined,
      createOrderThunk.rejected(
        new Error("fail"),
        "req",
        ["bun1"],
        "Some error"
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Some error");
  });

  test("createOrderThunk.rejected без payload: дефолтная ошибка", () => {
    const next = reducer(
      undefined,
      createOrderThunk.rejected(new Error("fail"), "req", ["bun1"])
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Error create order");
  });
});
