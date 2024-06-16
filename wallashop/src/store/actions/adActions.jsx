import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getLatestAds, getTags } from "../../pages/ads/service";

export const setAds = createAction("ads/setAds");
export const setTags = createAction("ads/setTags");
export const createAd = createAction("ads/createAd");

export const fetchAdsAndTags = createAsyncThunk(
  "ads/fetchAdsAndTags",
  async (_, { dispatch }) => {
    const [ads, tags] = await Promise.all([getLatestAds(), getTags()]);
    dispatch(setAds({ ads }));
    dispatch(setTags({ tags }));
    return { ads, tags };
  }
);
