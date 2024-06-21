
import adReducer from '../src/store/reducers/adReducer';
import { setAds, setTags, createAd, deleteAd } from '../src/store/actions/adActions';

describe('adReducer', () => {
  const initialState = {
    ads: [],
    tags: [],
    loading: false,
  };

  it('should return the initial state', () => {
    expect(adReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setAds', () => {
    const ads = [{ id: 1, name: 'Test Ad' }];
    const expectedState = {
      ...initialState,
      ads,
    };
    expect(adReducer(undefined, setAds({ ads }))).toEqual(expectedState);
  });

  it('should handle setTags', () => {
    const tags = ['tag1', 'tag2'];
    const expectedState = {
      ...initialState,
      tags,
    };
    expect(adReducer(undefined, setTags({ tags }))).toEqual(expectedState);
  });

  it('should handle createAd', () => {
    const newAd = { id: 2, name: 'New Ad' };
    const initialStateWithAds = {
      ...initialState,
      ads: [{ id: 1, name: 'Existing Ad' }],
    };
    const expectedState = {
      ...initialStateWithAds,
      ads: [...initialStateWithAds.ads, newAd],
    };
    expect(adReducer(initialStateWithAds, createAd({ ad: newAd }))).toEqual(expectedState);
  });

  it('should handle deleteAd', () => {
    const initialStateWithAds = {
      ...initialState,
      ads: [{ id: 1, name: 'Test Ad' }, { id: 2, name: 'Ad to Delete' }],
    };
    const expectedState = {
      ...initialState,
      ads: [{ id: 1, name: 'Test Ad' }],
    };
    expect(adReducer(initialStateWithAds, deleteAd({ adId: 2 }))).toEqual(expectedState);
  });
});
