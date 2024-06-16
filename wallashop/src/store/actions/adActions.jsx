import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLatestAds,
  getTags,
  deleteAd as deleteAdService,
} from "../../pages/ads/service";

export const setAds = createAction("ads/setAds");
export const setTags = createAction("ads/setTags");
export const createAd = createAction("ads/createAd");

export const fetchAdsAndTags = createAsyncThunk(
  "ads/fetchAdsAndTags",
  async () => {
    const ads = await getLatestAds();
    const tags = await getTags();
    return { ads, tags };
  }
);

export const deleteAd = createAsyncThunk(
  "ads/deleteAd",
  async (adId, { dispatch }) => {
    await deleteAdService(adId);
    dispatch(fetchAdsAndTags());
  }
);
