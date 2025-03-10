import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie,getCookie, removeCookie } from "@/utils/cookie";
import { setLocalStorage,getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { login } from "@/api/user";

// 添加异步thunk处理登录
export const loginAsync = createAsyncThunk("common/login", async (payload: { username: string; password: string }, { dispatch }) => {
  const response = await login(payload);
  dispatch(setToken(response.data.token));
  dispatch(setUserInfo(response.data.userInfo));
  return response.data;
});

const commonSlice = createSlice({
  name: "common",
  initialState: {
    userInfo: getCookie("userInfo") || null,
    token: getCookie("token") || null,
    activeMenu: getLocalStorage("activeMenu") || "/home",
    loading: false,
    error: "",
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      setLocalStorage("userInfo", action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      setCookie("token", action.payload);
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
      setLocalStorage("activeMenu", action.payload);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      removeLocalStorage("userInfo");
      removeLocalStorage("activeMenu");
      removeCookie("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "登录失败";
      });
  },
});

export interface LoginPayload {
  username: string;
  password: string;
}

export const { setUserInfo, setToken, setActiveMenu, logout } = commonSlice.actions;
export default commonSlice.reducer;
