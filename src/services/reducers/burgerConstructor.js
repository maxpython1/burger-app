import {
  CONSTRUCTOR_SET_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_MOVE_INGREDIENT,
  CONSTRUCTOR_CLEAR
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
    case CONSTRUCTOR_MOVE_INGREDIENT: {
      const { fromIndex, toIndex } = action.payload;
      if (fromIndex === toIndex) return state;
      const next = [...state.ingredients];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return { ...state, ingredients: next };
    }
    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((el) => el.uuid != action.payload)
      };
    }
    case CONSTRUCTOR_CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
