import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from "../../utils/types";

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TMovePayload = {
  fromIndex: number;
  toIndex: number;
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient | null>) {
      state.bun = action.payload;
    },
    clear(state) {
      state.bun = null;
      state.ingredients = [];
    },
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients = [...state.ingredients, action.payload];
      },
      prepare(item: TIngredient) {
        return {
          payload: {
            ...item,
            uuid: crypto.randomUUID?.() || String(Date.now() + Math.random())
          }
        };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (el) => el.uuid !== action.payload
      );
    },
    moveIngredient(state, action: PayloadAction<TMovePayload>) {
      const { fromIndex, toIndex } = action.payload;
      const arr = [...state.ingredients];
      const [item] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, item);
      state.ingredients = arr;
    }
  }
});

export const {
  setBun,
  clear,
  addIngredient,
  removeIngredient,
  moveIngredient
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
