import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.token = payload.token;
      state.isLogin = Boolean(payload.token);
      state.user = payload.user;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
