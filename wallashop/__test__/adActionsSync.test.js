jest.mock('../src/api/client', () => {
  return {
    client: {
      defaults: {
        headers: {
          common: {}
        }
      },
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn()
    },
    setAuthorizationHeader: jest.fn(),
    removeAuthorizationHeader: jest.fn()
  };
});

import { setAds } from '../src/store/actions/adActions';

describe('adActions', () => {
  it('should create an action to set ads', () => {
    const ads = [{ id: 1, name: 'Test Ad' }];
    const expectedAction = {
      type: 'ads/setAds',
      payload: { ads },
    };
    expect(setAds({ ads })).toEqual(expectedAction);
  });
});
