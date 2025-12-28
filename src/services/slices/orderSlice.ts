import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils/api";
import { getCookie } from "../../utils/cookies";
import { RootState } from "../rootReducer";
import { AppDispatch } from "../store";
import { refreshTokenThunk } from "./authSlice";
import { clear } from "./burgerConstructorSlice";

type TOrderState = {
  orderNumber: number | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderNumber: null,
  isLoading: false,
  error: null
};

export const createOrderThunk = createAsyncThunk<
  number,
  string[],
  { dispatch: AppDispatch; state: RootState; rejectValue: unknown }
>("order/createOrder", async (ingredientsId, thunkAPI) => {
  const doRequest = async () => {
    const token = getCookie("token");
    if (!token) {
      throw new Error("No token");
    }
    const data = await request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ ingredients: ingredientsId })
    });
    return data.order?.number;
  };

  try {
    const number = await doRequest();
    thunkAPI.dispatch(clear());
    return number;
  } catch (e: any) {
    if (e?.status !== 401 && e?.status !== 403) {
      return thunkAPI.rejectWithValue(String(e));
    }

    await thunkAPI.dispatch(refreshTokenThunk());

    return await doRequest();
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderNumber = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload ?? "Error create order");
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
