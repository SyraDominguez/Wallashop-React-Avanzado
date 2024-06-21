export const getAds = (state) => state.ads.ads;
export const getTags = (state) => state.ads.tags;
export const getAdById = (state, id) => state.ads.ads.find((ad) => ad.id === id);
