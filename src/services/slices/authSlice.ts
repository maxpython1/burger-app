import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils/api";
import { getCookie } from "../../utils/cookies";
import { TUser } from "../../utils/types";
import { AppDispatch } from "../store";

type TAuthState = {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
};

type TLoginArgs = {
  email: string;
  password: string;
};

type TRegisterArgs = TLoginArgs & {
  name: string;
};

type TUpdateUserArgs = {
  name?: string;
  email?: string;
  password?: string;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null
};

export const loginThunk = createAsyncThunk<
  {
    user: TUser;
    accessToken: string;
    refreshToken: string;
  },
  TLoginArgs,
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const { user, accessToken, refreshToken } = await request("auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    document.cookie = `token=${encodeURIComponent(accessToken)}; path=/`;
    localStorage.setItem("refreshToken", refreshToken);
    return { user, accessToken, refreshToken };
  } catch (e) {
    return thunkAPI.rejectWithValue(String(e));
  }
});

export const registerThunk = createAsyncThunk<
  {
    user: TUser;
    accessToken: string;
    refreshToken: string;
  },
  TRegisterArgs,
  { rejectValue: string }
>("auth/register", async ({ name, email, password }, thunkAPI) => {
  try {
    const { user, accessToken, refreshToken } = await request("auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    document.cookie = `token=${encodeURIComponent(accessToken)}; path=/`;
    localStorage.setItem("refreshToken", refreshToken);
    return { user, accessToken, refreshToken };
  } catch (e) {
    return thunkAPI.rejectWithValue(String(e));
  }
});

export const refreshTokenThunk = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, thunkAPI) => {
  const token = localStorage.getItem("refreshToken");
  if (!token) {
    return thunkAPI.rejectWithValue("No refresh token!");
  }
  try {
    const { accessToken, refreshToken } = await request("auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    document.cookie = `token=${encodeURIComponent(accessToken)}; path=/`;
    localStorage.setItem("refreshToken", refreshToken);
    return { accessToken, refreshToken };
  } catch (e) {
    return thunkAPI.rejectWithValue(String(e));
  }
});

export const getUserThunk = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string; dispatch: AppDispatch }
>("auth/getUser", async (_, thunkAPI) => {
  const doRequest = () => {
    const token = getCookie("token");
    if (!token) {
      throw new Error("No token");
    }
    return request("auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      }
    });
  };
  try {
    const { user } = await doRequest();
    return user;
  } catch (e: any) {
    if (e?.status !== 401 && e?.status !== 403) {
      return thunkAPI.rejectWithValue(String(e));
    }
    try {
      await thunkAPI.dispatch(refreshTokenThunk());
      const { user } = await doRequest();
      return user;
    } catch (e2) {
      return thunkAPI.rejectWithValue(String(e2));
    }
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logout", async (_, thunkAPI) => {
  const token = localStorage.getItem("refreshToken");
  try {
    await request("auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    localStorage.removeItem("refreshToken");
  } catch (e) {
    return thunkAPI.rejectWithValue(String(e));
  }
});

export const updateUserThunk = createAsyncThunk<
  TUser,
  TUpdateUserArgs,
  { rejectValue: string; dispatch: AppDispatch }
>("auth/updateUser", async (data, thunkAPI) => {
  const doRequest = () => {
    const token = getCookie("token");
    if (!token) {
      throw new Error("No token");
    }
    return request("auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(data)
    });
  };

  try {
    const res = await doRequest();
    return res.user;
  } catch (e: any) {
    if (e?.status !== 401 && e?.status !== 403) {
      return thunkAPI.rejectWithValue(String(e));
    }
    try {
      await thunkAPI.dispatch(refreshTokenThunk());
      const res2 = await doRequest();
      return res2.user;
    } catch (e2) {
      return thunkAPI.rejectWithValue(String(e2));
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutLocal(state) {
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error login";
      })
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error register";
      })
      .addCase(refreshTokenThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error refresh token!";
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error get user";
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => (state = initialState))
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error logout!";
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Error update user";
      });
  }
});

export const { logoutLocal } = authSlice.actions;
export default authSlice.reducer;
