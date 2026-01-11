import { screen } from '@testing-library/react';
import PrivateRoute from '../../routes/middlewares/PrivateRoute';
import { renderWithProviders } from '../../utils/renderWithProviders';

test('blocks unauthenticated access', () => {
  renderWithProviders(<PrivateRoute />);

  expect(
    screen.queryByText(/dashboard/i)
  ).not.toBeInTheDocument();
});
