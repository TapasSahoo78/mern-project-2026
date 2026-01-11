import { screen } from '@testing-library/react';
import Posts from '../../pages/user/Posts';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('User Posts Page', () => {
  test('renders posts page title', () => {
    renderWithProviders(<Posts />);

    expect(
      screen.getByText(/posts/i)
    ).toBeInTheDocument();
  });
});
