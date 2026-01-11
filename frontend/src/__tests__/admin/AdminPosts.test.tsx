import { screen } from '@testing-library/react';
import Posts from '../../pages/admin/Posts';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Admin Posts Page', () => {
  test('renders posts title', () => {
    renderWithProviders(<Posts />);

    expect(
      screen.getByText(/posts/i)
    ).toBeInTheDocument();
  });
});
