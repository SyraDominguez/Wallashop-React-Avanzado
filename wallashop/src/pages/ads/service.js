import { client } from "../../api/client";

const adsUrl = 'api/v1/adverts';

export const getLatestAds = (filters = {}) => {
  const queryParams = new URLSearchParams();

  Object.keys(filters).forEach(key => {
    const value = filters[key];
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          queryParams.append(key, value.join(','));
        }
      } else {
        queryParams.append(key, value);
      }
    }
  });

  const url = `${adsUrl}?${queryParams.toString()}`;
  return client.get(url);
};

export const createAd = (adData) => {
  return client.post(adsUrl, adData);
};

export const getAd = (adId) => {
  const url = `${adsUrl}/${adId}`;
  return client.get(url);
};

export const deleteAd = async (adId) => {
  const url = `${adsUrl}/${adId}`;
  return client.delete(url);
};
