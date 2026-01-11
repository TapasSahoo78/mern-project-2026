import { screen } from '@testing-library/react';
import Users from '../../pages/admin/Users_old';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Admin Users Page', () => {
  test('renders users page heading', () => {
    renderWithProviders(<Users />);

    expect(
      screen.getByText(/users/i)
    ).toBeInTheDocument();
  });
});
