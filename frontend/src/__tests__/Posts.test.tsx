import { render, screen } from '@testing-library/react';
import Posts from '../pages/user/Posts';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('renders posts heading', () => {
  render(
    <Provider store={store}>
      <Posts />
    </Provider>
  );

  expect(screen.getByText(/posts/i)).toBeInTheDocument();
});
