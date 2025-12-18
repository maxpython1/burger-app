import { configureStore } from "@reduxjs/toolkit";
import { wsMiddleware } from "./middleware/wsMiddleware";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (middleware) => middleware().concat(wsMiddleware),
  devTools: process.env.NODE_ENV !== "production"
});
export type AppDispatch = typeof store.dispatch;
