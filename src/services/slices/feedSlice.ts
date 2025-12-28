import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidOrder } from "../../utils/isValidOrders";
import { TOrder, TOrderMessage } from "../../utils/types";

type TFeedState = {
  wsConnected: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
};

const initialState: TFeedState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsConnect(state, action: PayloadAction<string>) {
      //
    },
    wsDisconnect() {
      //
    },
    wsOpen(state) {
      state.wsConnected = true;
      state.error = null;
    },
    wsClose(state) {
      state.wsConnected = false;
    },
    wsError(state, action: PayloadAction<string>) {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsMessage(state, action: PayloadAction<TOrderMessage>) {
      state.orders = action.payload.orders.filter(isValidOrder);
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } =
  feedSlice.actions;

export default feedSlice.reducer;
