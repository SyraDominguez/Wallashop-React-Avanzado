import { createReducer } from "@reduxjs/toolkit";
import { fetchAds, createAd, deleteAd } from "../actions/adActions";

const initialState = {
  ads: [],
  tags: [],
};

const adReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAds, (state, action) => {
      state.ads = action.payload.ads;
    })
    .addCase(createAd, (state, action) => {
      state.ads.push(action.payload.ad);
    })
    .addCase(deleteAd, (state, action) => {
      state.ads = state.ads.filter((ad) => ad.id !== action.payload.id);
    });
});

export default adReducer;
