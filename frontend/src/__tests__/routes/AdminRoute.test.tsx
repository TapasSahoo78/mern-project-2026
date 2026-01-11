import { screen } from '@testing-library/react';
import AdminRoute from '../../routes/middlewares/AdminRoute';
import { renderWithProviders } from '../../utils/renderWithProviders';

test('redirects non-admin users', () => {
  renderWithProviders(<AdminRoute />);

  expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
});
