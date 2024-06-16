import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLatestAds,
  getTags,
  deleteAd as deleteAdService,
} from "../../pages/ads/service";

export const setAds = createAction("ads/setAds");
export const setTags = createAction("ads/setTags");
export const createAd = createAction("ads/createAd");
export const deleteAd = createAction("ads/deleteAd");

export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (_, { dispatch }) => {
    const ads = await getLatestAds();
    dispatch(setAds({ ads }));
  }
);

export const fetchTags = createAsyncThunk(
  "ads/fetchTags",
  async (_, { dispatch }) => {
    const tags = await getTags();
    dispatch(setTags({ tags }));
  }
);

export const fetchAdsAndTags = createAsyncThunk(
  "ads/fetchAdsAndTags",
  async (_, { dispatch }) => {
    const [ads, tags] = await Promise.all([getLatestAds(), getTags()]);
    dispatch(setAds({ ads }));
    dispatch(setTags({ tags }));
  }
);

export const deleteAdThunk = createAsyncThunk(
  "ads/deleteAdThunk",
  async (adId, { dispatch }) => {
    await deleteAdService(adId);
    dispatch(deleteAd({ adId }));
  }
);
