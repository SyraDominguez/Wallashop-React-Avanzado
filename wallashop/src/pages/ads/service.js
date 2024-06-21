// src/pages/ads/service.js
import { client } from "../../api/client";

const adsUrl = 'api/v1/adverts';
const tagsUrl = 'api/v1/adverts/tags';

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
  // Aquí no se especifica el tipo de contenido porque FormData se encarga de ello
  return client.post(adsUrl, adData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getAd = (adId) => {
  const url = `${adsUrl}/${adId}`;
  return client.get(url);
};

export const deleteAd = async (adId) => {
  const url = `${adsUrl}/${adId}`;
  return client.delete(url);
};

export const getTags = () => {
  return client.get(tagsUrl);
};
