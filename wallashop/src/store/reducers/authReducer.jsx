import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(logout, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    });
});

export default authReducer;
