import {
  INGREDIENTS_FETCH_FAIL,
  INGREDIENTS_FETCH_START,
  INGREDIENTS_FETCH_SUCCESS
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export function ingredients(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_FETCH_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case INGREDIENTS_FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        ingredients: action.payload
      };
    }
    case INGREDIENTS_FETCH_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
