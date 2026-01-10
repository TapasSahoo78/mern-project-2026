import { render, screen } from '@testing-library/react';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('renders admin dashboard title', () => {
  render(
    <Provider store={store}>
      <AdminDashboard />
    </Provider>
  );

  expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
});
