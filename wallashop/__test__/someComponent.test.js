import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import SomeComponent from '../src/components/SomeComponent';
import * as authActions from '../src/store/actions/authActions';

// Middleware personalizado que imita a redux-thunk
const customThunk = store => next => action =>
  typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);

const middlewares = [customThunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../src/store/actions/authActions', () => ({
  login: jest.fn(),
  logout: jest.fn()
}));

describe('SomeComponent', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: { isLoggedIn: false }
    });
    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <SomeComponent />
      </Provider>
    );
  });

  it('dispatches login action on login button click', () => {
    fireEvent.click(component.getByText('Login'));
    expect(authActions.login).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(authActions.login({ user: 'testUser', token: 'abc123' }));
  });

  it('dispatches logout action on logout button click', () => {
    store = mockStore({
      auth: { isLoggedIn: true }
    });
    store.dispatch = jest.fn();

    component.rerender(
      <Provider store={store}>
        <SomeComponent />
      </Provider>
    );
    fireEvent.click(component.getByText('Logout'));
    expect(authActions.logout).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(authActions.logout());
  });
});
