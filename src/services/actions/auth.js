import { request } from "../../utils/api";
import { getCookie } from "../../utils/cookies";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

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

export const register = (name, email, password) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  request("auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name })
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

export const logout = () => (dispatch) => {
  const token = localStorage.getItem("refreshToken");

  request("auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
    .then((data) => {
      if (data.success) {
        document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
        localStorage.removeItem("refreshToken");
        dispatch({ type: AUTH_LOGOUT });
      }
    })
    .catch((e) => console.log(e));
};

export const refreshToken = () => (dispatch) => {
  const token = localStorage.getItem("refreshToken");
  dispatch({ type: AUTH_REQUEST });

  request("auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
    .then(({ accessToken, refreshToken }) => {
      document.cookie = `token=${encodeURIComponent(accessToken)}; path=/`;
      localStorage.setItem("refreshToken", refreshToken);
      dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        payload: { accessToken, refreshToken }
      });
    })
    .catch((e) => dispatch({ type: AUTH_ERROR, error: e.message }));
};

export const getUser = () => (dispatch) => {
  dispatch({ type: USER_REQUEST });

  request("auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("token")
    }
  })
    .then(({ user }) => dispatch({ type: USER_SUCCESS, payload: { user } }))
    .catch((e) => dispatch({ type: USER_ERROR, error: e.message }));
};

export const updateUser = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST });

  request("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("token")
    },
    body: JSON.stringify(data)
  })
    .then(({ user }) => dispatch({ type: USER_SUCCESS, payload: { user } }))
    .catch((e) => dispatch({ type: USER_ERROR, error: e.message }));
};
