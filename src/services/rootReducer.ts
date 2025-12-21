import { combineReducers } from "redux";
import auth from "./slices/authSlice";
import burgerConstructor from "./slices/burgerConstructorSlice";
import currentIngredient from "./slices/currentIngredientSlice";
import feed from "./slices/feedSlice";
import ingredients from "./slices/ingredientsSlice";
import orderDetails from "./slices/orderDetailsSlice";
import order from "./slices/orderSlice";
import profileFeed from "./slices/profileFeedSlice";

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  currentIngredient,
  order,
  auth,
  feed,
  profileFeed,
  orderDetails
});

export type RootState = ReturnType<typeof rootReducer>;
