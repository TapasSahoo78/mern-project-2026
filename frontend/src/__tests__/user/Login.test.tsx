import { screen } from '@testing-library/react';
import Login from '../../pages/auth/Login';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Login Page', () => {
  test('renders login form', () => {
    renderWithProviders(<Login />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });
});
