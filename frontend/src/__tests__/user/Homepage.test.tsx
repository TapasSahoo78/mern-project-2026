import { screen } from '@testing-library/react';
import Homepage from '../../pages/Homepage';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Homepage', () => {
  test('renders latest posts heading', () => {
    renderWithProviders(<Homepage />);

    expect(
      screen.getByText(/latest posts/i)
    ).toBeInTheDocument();
  });

  test('renders login button', () => {
    renderWithProviders(<Homepage />);

    expect(
      screen.getByRole('button', { name: /login/i })
    ).toBeInTheDocument();
  });
});
