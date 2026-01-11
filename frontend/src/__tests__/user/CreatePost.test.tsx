import { screen } from '@testing-library/react';
import CreatePost from '../../pages/user/CreatePost';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Create Post Page', () => {
  test('renders create post form', () => {
    renderWithProviders(<CreatePost />);

    expect(
      screen.getByText(/create new post/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/post title/i)
    ).toBeInTheDocument();
  });
});
