// src/store/actions/authActions.js
import React from "react";
import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

export const login = createAction("auth/login");
export const logout = createAction("auth/logout");

export const fetchAds = () => async (dispatch) => {
  dispatch({ type: "FETCH_ADS_REQUEST" });
  try {
    const response = await axios.get("/api/ads");
    dispatch({ type: "FETCH_ADS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_ADS_FAILURE", error: error.message });
  }
};
