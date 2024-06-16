import { createReducer } from "@reduxjs/toolkit";
import { setAds, setTags, createAd, deleteAd } from "../actions/adActions";

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
    .addCase(deleteAd, (state, action) => {
      state.ads = state.ads.filter((ad) => ad.id !== action.payload.adId);
    });
});

export default adReducer;
