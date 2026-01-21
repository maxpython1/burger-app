import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient
} from "./currentIngredientSlice";

const ingredient = {
  _id: "id1",
  name: "Ингредиент",
  type: "sauce",
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: "https://example.com/img.png",
  image_mobile: "https://example.com/img-mobile.png",
  image_large: "https://example.com/img-large.png",
  __v: 0
};

describe("currentIngredientSlice", () => {
  test("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, { type: "UNKNOWN" })).toBeNull();
  });

  test("setCurrentIngredient: должен установить текущий ингредиент", () => {
    expect(reducer(null, setCurrentIngredient(ingredient))).toEqual(ingredient);
  });

  test("clearCurrentIngredient: должен очистить текущий ингредиент", () => {
    const prev = ingredient;
    expect(reducer(prev, clearCurrentIngredient())).toBeNull();
  });
});
