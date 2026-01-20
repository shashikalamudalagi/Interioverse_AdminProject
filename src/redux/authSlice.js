import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuth = false;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
