import { screen } from '@testing-library/react';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('AdminDashboard', () => {
  test('renders admin dashboard title', () => {
    renderWithProviders(<AdminDashboard />);

    expect(
      screen.getByText(/admin dashboard/i)
    ).toBeInTheDocument();
  });

  test('renders stats cards', () => {
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByText(/total users/i)).toBeInTheDocument();
    expect(screen.getByText(/total posts/i)).toBeInTheDocument();
    expect(screen.getByText(/total comments/i)).toBeInTheDocument();
  });
});
