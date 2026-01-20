import reducer, {
  logoutLocal,
  loginThunk,
  registerThunk,
  refreshTokenThunk,
  getUserThunk,
  logoutThunk,
  updateUserThunk
} from "./authSlice";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null
};

const user = { name: "Тест", email: "test@example.com" };
const userUpdated = { name: "Тест 2", email: "test2@example.com" };

describe("authSlice", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=0";
  });

  test("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, { type: "UNKNOWN" })).toEqual(initialState);
  });

  test("logoutLocal должен очистить локальные данные и стейт", () => {
    localStorage.setItem("refreshToken", "refresh");

    const prev = {
      user,
      accessToken: "Bearer access",
      refreshToken: "refresh",
      isLoading: true,
      error: "err"
    };

    const next = reducer(prev, logoutLocal());

    expect(next).toEqual(initialState);
    expect(localStorage.getItem("refreshToken")).toBeNull();
  });

  test("loginThunk.pending: включает загрузку", () => {
    const next = reducer(
      initialState,
      loginThunk.pending("req", { email: "a", password: "b" })
    );

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test("loginThunk.fulfilled: кладёт пользователя и токены", () => {
    const payload = {
      user,
      accessToken: "Bearer access",
      refreshToken: "refresh"
    };

    const next = reducer(
      { ...initialState, isLoading: true },
      loginThunk.fulfilled(payload, "req", { email: "a", password: "b" })
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.user).toEqual(user);
    expect(next.accessToken).toBe("Bearer access");
    expect(next.refreshToken).toBe("refresh");
  });

  test("loginThunk.rejected: кладёт ошибку", () => {
    const next = reducer(
      { ...initialState, isLoading: true },
      loginThunk.rejected(
        new Error("fail"),
        "req",
        { email: "a", password: "b" },
        "Bad login"
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Bad login");
  });

  test("registerThunk.pending: включает загрузку", () => {
    const next = reducer(
      initialState,
      registerThunk.pending("req", { name: "n", email: "a", password: "b" })
    );

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test("registerThunk.fulfilled: кладёт пользователя и токены", () => {
    const payload = {
      user,
      accessToken: "Bearer access",
      refreshToken: "refresh"
    };

    const next = reducer(
      { ...initialState, isLoading: true },
      registerThunk.fulfilled(payload, "req", {
        name: "n",
        email: "a",
        password: "b"
      })
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.user).toEqual(user);
    expect(next.accessToken).toBe("Bearer access");
    expect(next.refreshToken).toBe("refresh");
  });

  test("registerThunk.rejected: кладёт ошибку", () => {
    const next = reducer(
      { ...initialState, isLoading: true },
      registerThunk.rejected(
        new Error("fail"),
        "req",
        { name: "n", email: "a", password: "b" },
        "Bad register"
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Bad register");
  });

  test("refreshTokenThunk.pending: включает загрузку", () => {
    const next = reducer(
      initialState,
      refreshTokenThunk.pending("req", undefined)
    );
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test("refreshTokenThunk.fulfilled: обновляет токены", () => {
    const payload = { accessToken: "Bearer new", refreshToken: "refresh2" };
    const next = reducer(
      { ...initialState, isLoading: true, refreshToken: "refresh" },
      refreshTokenThunk.fulfilled(payload, "req", undefined)
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.accessToken).toBe("Bearer new");
    expect(next.refreshToken).toBe("refresh2");
  });

  test("refreshTokenThunk.rejected: кладёт ошибку", () => {
    const next = reducer(
      { ...initialState, isLoading: true },
      refreshTokenThunk.rejected(
        new Error("fail"),
        "req",
        undefined,
        "Bad refresh"
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Bad refresh");
  });

  test("getUserThunk.pending: включает загрузку", () => {
    const next = reducer(initialState, getUserThunk.pending("req", undefined));
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test("getUserThunk.fulfilled: кладёт пользователя", () => {
    const next = reducer(
      { ...initialState, isLoading: true },
      getUserThunk.fulfilled(user, "req", undefined)
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.user).toEqual(user);
  });

  test("getUserThunk.rejected: кладёт ошибку", () => {
    const next = reducer(
      { ...initialState, isLoading: true },
      getUserThunk.rejected(new Error("fail"), "req", undefined, "Bad user")
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Bad user");
  });

  test("logoutThunk.pending: включает загрузку", () => {
    const next = reducer(
      { ...initialState, user },
      logoutThunk.pending("req", undefined)
    );

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test("logoutThunk.fulfilled: сбрасывает стейт к initialState", () => {
    const prev = {
      user,
      accessToken: "Bearer access",
      refreshToken: "refresh",
      isLoading: true,
      error: "err"
    };

    const next = reducer(
      prev,
      logoutThunk.fulfilled(undefined, "req", undefined)
    );

    expect(next).toEqual(initialState);
  });

  test("logoutThunk.rejected: кладёт ошибку", () => {
    const next = reducer(
      { ...initialState, isLoading: true },
      logoutThunk.rejected(new Error("fail"), "req", undefined, "Bad logout")
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Bad logout");
  });

  test("updateUserThunk.pending: включает загрузку", () => {
    const next = reducer(
      { ...initialState, user },
      updateUserThunk.pending("req", { name: "x" })
    );

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test("updateUserThunk.fulfilled: обновляет пользователя", () => {
    const next = reducer(
      { ...initialState, isLoading: true, user },
      updateUserThunk.fulfilled(userUpdated, "req", { name: "x" })
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.user).toEqual(userUpdated);
  });

  test("updateUserThunk.rejected: кладёт ошибку", () => {
    const next = reducer(
      { ...initialState, isLoading: true },
      updateUserThunk.rejected(
        new Error("fail"),
        "req",
        { name: "x" },
        "Bad update"
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe("Bad update");
  });
});
