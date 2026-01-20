import reducer, { fetchIngredientsThunk } from "./ingredientsSlice";

const bun = {
  _id: "bun1",
  name: "Булка",
  type: "bun",
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: "https://example.com/bun.png",
  image_mobile: "https://example.com/bun-mobile.png",
  image_large: "https://example.com/bun-large.png",
  __v: 0
};

const main = {
  _id: "main1",
  name: "Начинка",
  type: "main",
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 10,
  image: "https://example.com/main.png",
  image_mobile: "https://example.com/main-mobile.png",
  image_large: "https://example.com/main-large.png",
  __v: 0
};

describe("ingredientsSlice", () => {
  test("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, { type: "UNKNOWN" })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  test("fetchIngredientsThunk.pending: включает загрузку", () => {
    const state = reducer(
      undefined,
      fetchIngredientsThunk.pending("req", undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("fetchIngredientsThunk.fulfilled: кладёт ингредиенты", () => {
    const payload = [bun, main];

    const state = reducer(
      undefined,
      fetchIngredientsThunk.fulfilled(payload, "req", undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(payload);
  });

  test("fetchIngredientsThunk.rejected: кладёт ошибку", () => {
    const state = reducer(
      undefined,
      fetchIngredientsThunk.rejected(
        new Error("fail"),
        "req",
        undefined,
        "Network error"
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toBe("Network error");
  });

  test("fetchIngredientsThunk.rejected без payload: пишет дефолтную ошибку", () => {
    const state = reducer(
      undefined,
      fetchIngredientsThunk.rejected(new Error("fail"), "req", undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Error fetch ingredients");
  });
});
