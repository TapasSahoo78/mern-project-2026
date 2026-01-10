import { render, screen } from '@testing-library/react';
import Login from '../pages/auth/Login';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('renders login form', () => {
    render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
});
