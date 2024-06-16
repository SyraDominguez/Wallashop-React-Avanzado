import { createAction } from "@reduxjs/toolkit";

export const fetchAds = createAction("ads/fetchAds");
export const createAd = createAction("ads/createAd");
export const deleteAd = createAction("ads/deleteAd");
