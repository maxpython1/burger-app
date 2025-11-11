import { AUTH_ERROR, AUTH_REQUEST, AUTH_SUCCESS } from "../actions/auth";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    }
    case AUTH_ERROR: {
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
