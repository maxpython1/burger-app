import { configureStore } from "@reduxjs/toolkit";
import { createMiddleware } from "./middleware/wsMiddleware";
import { rootReducer } from "./rootReducer";
import * as feedWsActions from "./slices/feedSlice";
import * as profileWsActions from "./slices/profileFeedSlice";

const feedMiddleware = createMiddleware(feedWsActions);
const profileFeedMiddleware = createMiddleware(profileWsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (middleware) =>
    middleware().concat(feedMiddleware, profileFeedMiddleware),
  devTools: process.env.NODE_ENV !== "production"
});
export type AppDispatch = typeof store.dispatch;
