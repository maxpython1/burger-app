import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidOrder } from "../../utils/isValidOrders";
import { TOrder, TOrderMessage } from "../../utils/types";

type TProfileOrder = {
  wsConnected: boolean;
  orders: TOrder[];
  error: string | null;
};

const initialState: TProfileOrder = {
  wsConnected: false,
  orders: [],
  error: null
};

const profileFeedSlice = createSlice({
  name: "profileFeed",
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
    }
  }
});

export const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } =
  profileFeedSlice.actions;

export default profileFeedSlice.reducer;
