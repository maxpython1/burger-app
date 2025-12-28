import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../utils/api";
import { TOrder } from "../../utils/types";
import { AppDispatch } from "../store";

type TOrderDetailsState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  order: null,
  isLoading: false,
  error: null
};

export const getOrderDetailsThunk =
  (number: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchOrderStart());

      const data = await request(`orders/${number}`);

      const order: TOrder = data.orders[0];

      dispatch(fetchOrderSuccess(order));
    } catch (e) {
      dispatch(fetchOrderError("Не удалось загрузить заказ"));
    }
  };

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    fetchOrderStart(state) {
      state.isLoading = true;
      state.error = null;
      state.order = null;
    },
    fetchOrderSuccess(state, action: PayloadAction<TOrder>) {
      state.isLoading = false;
      state.error = null;
      state.order = action.payload;
    },
    fetchOrderError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload ?? "Error order details";
      state.order = null;
    }
  }
});

export const { fetchOrderStart, fetchOrderSuccess, fetchOrderError } =
  orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
