
import { getAds, getTags, getAdById } from '../src/store/selectors/selectors';

describe('Selectors', () => {
  const state = {
    ads: {
      ads: [
        { id: 1, name: 'Ad 1' },
        { id: 2, name: 'Ad 2' },
      ],
      tags: ['tag1', 'tag2'],
    },
  };

  it('should return all ads', () => {
    const ads = getAds(state);
    expect(ads).toEqual(state.ads.ads);
  });

  it('should return all tags', () => {
    const tags = getTags(state);
    expect(tags).toEqual(state.ads.tags);
  });

  it('should return an ad by id', () => {
    const ad = getAdById(state, 1);
    expect(ad).toEqual(state.ads.ads[0]);
  });

  it('should return undefined if ad not found', () => {
    const ad = getAdById(state, 3);
    expect(ad).toBeUndefined();
  });
});
