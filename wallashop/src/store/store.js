import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import adReducer from "./reducers/adReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adReducer,
  },
});

export default store;
