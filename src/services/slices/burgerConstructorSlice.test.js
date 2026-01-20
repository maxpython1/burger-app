import reducer, {
  setBun,
  clear,
  addIngredient,
  removeIngredient,
  moveIngredient
} from "./burgerConstructorSlice";

const bun = {
  _id: "bun1",
  name: "Булка тестовая",
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
  name: "Начинка тестовая",
  type: "main",
  proteins: 42,
  fat: 24,
  carbohydrates: 11,
  calories: 424,
  price: 100,
  image: "https://example.com/main.png",
  image_mobile: "https://example.com/main-mobile.png",
  image_large: "https://example.com/main-large.png",
  __v: 0
};

describe("burgerConstructorSlice", () => {
  beforeAll(() => {
    if (!global.crypto) {
      Object.defineProperty(global, "crypto", {
        value: {
          randomUUID: () => "test-uuid"
        }
      });
    }

    if (!global.crypto.randomUUID) {
      global.crypto.randomUUID = () => "test-uuid";
    }
  });

  test("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, { type: "UNKNOWN" })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test("setBun: должен установить булку", () => {
    const state = reducer(undefined, setBun(bun));
    expect(state.bun).toEqual(bun);
  });

  test("clear: должен очистить конструктор", () => {
    const prev = {
      bun,
      ingredients: [{ ...main, uuid: "uuid-1" }]
    };

    const state = reducer(prev, clear());

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test("addIngredient: должен добавить ингредиент с uuid", () => {
    const state = reducer(undefined, addIngredient(main));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(main);
    expect(state.ingredients[0].uuid).toEqual(expect.any(String));
  });

  test("removeIngredient: должен удалить ингредиент по uuid", () => {
    const prev = {
      bun: null,
      ingredients: [
        { ...main, uuid: "uuid-1" },
        { ...main, _id: "main2", name: "Начинка 2", uuid: "uuid-2" }
      ]
    };

    const state = reducer(prev, removeIngredient("uuid-1"));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].uuid).toBe("uuid-2");
  });

  test("moveIngredient: должен менять порядок ингредиентов", () => {
    const prev = {
      bun: null,
      ingredients: [
        { ...main, uuid: "uuid-1", name: "1" },
        { ...main, uuid: "uuid-2", name: "2" },
        { ...main, uuid: "uuid-3", name: "3" }
      ]
    };

    const state = reducer(prev, moveIngredient({ fromIndex: 0, toIndex: 2 }));

    expect(state.ingredients.map((i) => i.uuid)).toEqual([
      "uuid-2",
      "uuid-3",
      "uuid-1"
    ]);
  });
});
