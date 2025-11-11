import { combineReducers } from "redux";
import { ingredients } from "./reducers/ingredients";
import { burgerConstructor } from "./reducers/burgerConstructor";
import { currentIngredient } from "./reducers/currentIngredient";
import { order } from "./reducers/order";
import { auth } from "./reducers/auth";

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  currentIngredient,
  order,
  auth
});
