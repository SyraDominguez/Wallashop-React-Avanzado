import { createReducer } from "@reduxjs/toolkit";
import { fetchAds, createAd, deleteAd } from "../actions/adActions";

const initialState = {
  ads: [],
  tags: [],
};

const adReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAds, (state, action) => {
      console.log("Handling fetchAds action", action);
      state.ads = action.payload.ads;
    })
    .addCase(createAd, (state, action) => {
      console.log("Handling createAd action", action);
      state.ads.push(action.payload.ad);
    })
    .addCase(deleteAd, (state, action) => {
      console.log("Handling deleteAd action", action);
      state.ads = state.ads.filter((ad) => ad.id !== action.payload.id);
    });
});

export default adReducer;
