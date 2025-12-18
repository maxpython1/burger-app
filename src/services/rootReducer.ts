import { combineReducers } from "redux";
import auth from "./slices/authSlice";
import burgerConstructor from "./slices/burgerConstructorSlice";
import currentIngredient from "./slices/currentIngredientSlice";
import feed from "./slices/feedSlice";
import ingredients from "./slices/ingredientsSlice";
import order from "./slices/orderSlice";

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  currentIngredient,
  order,
  auth,
  feed
});

export type RootState = ReturnType<typeof rootReducer>;
