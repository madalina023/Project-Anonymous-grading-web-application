import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';  // Import the Provider
import store from "./stores/store.js";  
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
