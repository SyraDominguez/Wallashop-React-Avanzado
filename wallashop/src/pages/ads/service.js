import { client } from "../../api/client";

const adsUrl = 'api/v1/adverts'

export const getLatestAds = () => {
  return client.get(adsUrl);
};

export const createAd = (adData) => {
  return client.post(adsUrl, adData);
};

export const getAd = adId => {
  const url = `${adsUrl}/${adId}`;
  return client.get(url);
};

export const deleteAd = async (adId) => {
  const url = `${adsUrl}/${adId}`;
  const response = await client.delete(url);
  return response;
};

