import { screen } from '@testing-library/react';
import Comments from '../../pages/admin/Comments';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Admin Comments Page', () => {
  test('renders comments heading', () => {
    renderWithProviders(<Comments />);

    expect(
      screen.getByText(/comments/i)
    ).toBeInTheDocument();
  });
});
