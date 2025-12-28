import { configureStore } from "@reduxjs/toolkit";
import { TOrderMessage } from "../utils/types";
import { createMiddleware } from "./middleware/wsMiddleware";
import { rootReducer } from "./rootReducer";
import * as feedWsActions from "./slices/feedSlice";
import * as profileWsActions from "./slices/profileFeedSlice";

const feedMiddleware = createMiddleware<TOrderMessage>(feedWsActions);
const profileFeedMiddleware = createMiddleware<TOrderMessage>(profileWsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (middleware) =>
    middleware().concat(feedMiddleware, profileFeedMiddleware),
  devTools: process.env.NODE_ENV !== "production"
});
export type AppDispatch = typeof store.dispatch;
