// __test__/authActionsAsync.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as authActions from '../src/store/actions/authActions';

// Configurar el mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mockear axios
jest.mock('axios');

describe('authActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('creates FETCH_ADS_SUCCESS when fetching ads has been done', async () => {
    const ads = [{ id: 1, name: 'Test Ad' }];
    axios.get.mockResolvedValue({ data: ads });

    const expectedActions = [
      { type: 'FETCH_ADS_REQUEST' },
      { type: 'FETCH_ADS_SUCCESS', payload: ads }
    ];

    await store.dispatch(authActions.fetchAds());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_ADS_FAILURE when fetching ads fails', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    const expectedActions = [
      { type: 'FETCH_ADS_REQUEST' },
      { type: 'FETCH_ADS_FAILURE', error: errorMessage }
    ];

    await store.dispatch(authActions.fetchAds());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
