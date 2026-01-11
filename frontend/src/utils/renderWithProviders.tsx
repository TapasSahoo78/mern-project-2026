import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter } from 'react-router-dom';

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};
