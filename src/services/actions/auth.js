import { request } from "../../utils/api";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";

export const login = (email, password) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  request("auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(({ user, accessToken, refreshToken }) => {
      document.cookie = `token=${encodeURIComponent(accessToken)}; path=/`;
      localStorage.setItem("refreshToken", refreshToken);
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user, accessToken, refreshToken }
      });
    })
    .catch((e) => dispatch({ type: AUTH_ERROR, error: e.message }));
};

export const register = (name, email, password) => (dispatch) => {};
export const logout = () => (dispatch) => {};
export const refreshToken = () => (dispatch) => {};
