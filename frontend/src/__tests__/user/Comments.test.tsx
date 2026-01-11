import { screen } from '@testing-library/react';
import Comments from '../../components/Comments';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Comments Component', () => {
  test('renders add comment input', () => {
    renderWithProviders(<Comments postId="123" />);

    expect(
      screen.getByPlaceholderText(/write a comment/i)
    ).toBeInTheDocument();
  });
});
