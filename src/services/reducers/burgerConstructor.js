import {
  CONSTRUCTOR_SET_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT
} from "../actions/burgerConstructor";

const initialState = {
  bun: null,
  ingredients: []
};

export function burgerConstructor(state = initialState, action) {
  switch (action.type) {
    case CONSTRUCTOR_SET_BUN: {
      return {
        ...state,
        bun: action.payload
      };
    }
    case CONSTRUCTOR_ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }
    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((el) => el.uuid != action.payload)
      };
    }
    default: {
      return state;
    }
  }
}
