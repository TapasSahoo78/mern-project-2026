import { screen } from '@testing-library/react';
import PostDetails from '../../pages/user/PostDetails';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Post Details Page', () => {
  test('renders comments section', () => {
    renderWithProviders(<PostDetails />);

    expect(
      screen.getByText(/comments/i)
    ).toBeInTheDocument();
  });
});
