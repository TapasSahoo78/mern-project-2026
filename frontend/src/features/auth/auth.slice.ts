import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './auth.types';

const storedAuth = localStorage.getItem('auth');

const initialState: AuthState = storedAuth
    ? {
        user: JSON.parse(storedAuth).user,
        accessToken: JSON.parse(storedAuth).accessToken,
        refreshToken: JSON.parse(storedAuth).refreshToken,
        isAuthenticated: true,
        loading: false,
        error: null,
    }
    : {
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    };


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart(state) {
            state.loading = true;
            state.error = null;
        },

        loginRequest(_state, _action: PayloadAction<{ email: string; password: string }>) { },

        registerRequest(
            _state,
            _action: PayloadAction<{ name: string; email: string; password: string }>
        ) { },

        authSuccess(
            state,
            action: PayloadAction<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>
        ) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem(
                'auth',
                JSON.stringify(action.payload)
            );
        },

        authFailure(state, action: PayloadAction<string | null>) {
            state.loading = false;
            state.error = action.payload;
        },

        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth');
        },
    }

});

export const {
    authStart,
    loginRequest,
    registerRequest,
    authSuccess,
    authFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
