import {
  CURRENT_INGREDIENT_CLEAR,
  CURRENT_INGREDIENT_SET
} from "../actions/currentIngredient";

const initialState = null;

export function currentIngredient(state = initialState, action) {
  switch (action.type) {
    case CURRENT_INGREDIENT_SET: {
      return action.payload;
    }
    case CURRENT_INGREDIENT_CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
