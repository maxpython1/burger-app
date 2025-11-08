import { ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../actions/order";

const initialState = {
  orderNumber: null,
  isLoading: false,
  error: null
};

export function order(state = initialState, action) {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderNumber: null,
        isLoading: true,
        error: null
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        isLoading: false,
        error: null
      };
    }
    case ORDER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
