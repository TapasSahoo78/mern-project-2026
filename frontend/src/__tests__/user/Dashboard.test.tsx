import { screen } from '@testing-library/react';
import Dashboard from '../../pages/user/Dashboard';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('User Dashboard', () => {
  test('renders dashboard heading', () => {
    renderWithProviders(<Dashboard />);

    expect(
      screen.getByText(/dashboard/i)
    ).toBeInTheDocument();
  });

  test('renders logout button', () => {
    renderWithProviders(<Dashboard />);

    expect(
      screen.getByRole('button', { name: /logout/i })
    ).toBeInTheDocument();
  });
});
