import reducer, {
  wsConnect,
  wsDisconnect,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from "./profileFeedSlice";

const validOrder = {
  _id: "order1",
  name: "Тестовый заказ",
  ingredients: ["bun1"],
  status: "done",
  number: 101,
  createdAt: "2020-01-01T00:00:00.000Z",
  updatedAt: "2020-01-01T00:00:00.000Z"
};

const invalidOrder = {
  _id: "bad",
  ingredients: [],
  status: "done",
  number: "NaN",
  createdAt: "2020-01-01",
  updatedAt: "2020-01-01"
};

describe("profileFeedSlice", () => {
  test("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, { type: "UNKNOWN" })).toEqual({
      wsConnected: false,
      orders: [],
      error: null
    });
  });

  test("wsConnect: не должен менять стейт", () => {
    const prev = reducer(undefined, { type: "UNKNOWN" });
    const next = reducer(prev, wsConnect("wss://test"));
    expect(next).toEqual(prev);
  });

  test("wsDisconnect: не должен менять стейт", () => {
    const prev = reducer(undefined, { type: "UNKNOWN" });
    const next = reducer(prev, wsDisconnect());
    expect(next).toEqual(prev);
  });

  test("wsOpen: соединение установлено", () => {
    const prev = { wsConnected: false, orders: [], error: "err" };
    const next = reducer(prev, wsOpen());
    expect(next.wsConnected).toBe(true);
    expect(next.error).toBeNull();
  });

  test("wsClose: соединение закрыто", () => {
    const prev = { wsConnected: true, orders: [], error: null };
    const next = reducer(prev, wsClose());
    expect(next.wsConnected).toBe(false);
  });

  test("wsError: сохраняет ошибку и сбрасывает соединение", () => {
    const prev = { wsConnected: true, orders: [], error: null };
    const next = reducer(prev, wsError("Ошибка WS"));
    expect(next.wsConnected).toBe(false);
    expect(next.error).toBe("Ошибка WS");
  });

  test("wsMessage: кладёт только валидные заказы", () => {
    const message = {
      success: true,
      orders: [validOrder, invalidOrder],
      total: 0,
      totalToday: 0
    };

    const prev = reducer(undefined, { type: "UNKNOWN" });
    const next = reducer(prev, wsMessage(message));

    expect(next.orders).toEqual([validOrder]);
  });
});
