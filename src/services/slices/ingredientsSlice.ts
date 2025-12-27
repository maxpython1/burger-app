import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils/api";
import { TIngredient } from "../../utils/types";

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredientsThunk = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>("ingredients/fetch", async () => {
  const data = await request("ingredients");
  return data.data;
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error fetch ingredients";
      });
  }
});

export default ingredientsSlice.reducer;
