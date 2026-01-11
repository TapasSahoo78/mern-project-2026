import { screen } from '@testing-library/react';
import Register from '../../pages/auth/Register';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Register Page', () => {
  test('renders register form', () => {
    renderWithProviders(<Register />);

    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
  });
});
