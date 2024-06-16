import { createReducer } from "@reduxjs/toolkit";
import { setAds, setTags, createAd } from "../actions/adActions";

const initialState = {
  ads: [],
  tags: [],
  loading: false,
};

const adReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAds, (state, action) => {
      state.ads = action.payload.ads;
    })
    .addCase(setTags, (state, action) => {
      state.tags = action.payload.tags;
    })
    .addCase(createAd, (state, action) => {
      state.ads.push(action.payload.ad);
    })
    .addCase("ads/fetchAdsAndTags/pending", (state) => {
      state.loading = true;
    })
    .addCase("ads/fetchAdsAndTags/fulfilled", (state, action) => {
      state.ads = action.payload.ads;
      state.tags = action.payload.tags;
      state.loading = false;
    })
    .addCase("ads/fetchAdsAndTags/rejected", (state) => {
      state.loading = false;
    });
});

export default adReducer;
