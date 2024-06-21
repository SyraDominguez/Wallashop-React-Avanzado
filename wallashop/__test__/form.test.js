import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Form from '../src/components/form';

const mockStore = configureStore([]);
const store = mockStore({
  ads: [],
  tags: [],
});

describe('Form component', () => {
  it('should render correctly and match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Form />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
