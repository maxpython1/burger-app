import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";

type TCurrentIngredientState = TIngredient | null;

const initialState = null as TCurrentIngredientState;

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<TIngredient>) {
      return action.payload;
    },
    clearCurrentIngredient() {
      return initialState;
    }
  }
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
