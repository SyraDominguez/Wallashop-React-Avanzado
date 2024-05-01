import { client } from "../../api/client";

const adsUrl = 'api/v1/adverts'

export const getLatestAds = () => {
  return client
    .get(adsUrl)
};