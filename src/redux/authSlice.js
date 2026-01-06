import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("isAuth") === "true"
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
      localStorage.setItem("isAuth", "true");   //  login
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("isAuth");        //clear on logout
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
