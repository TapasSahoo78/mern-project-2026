import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './auth.types';
import { jwtDecode } from "jwt-decode";

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
            localStorage.setItem('auth', JSON.stringify(action.payload));
        },

        authFailure(state, action: PayloadAction<string | null>) {
            state.loading = false;
            state.error = action.payload;
        },
        /* ===== OAUTH LOGIN (GOOGLE / FACEBOOK) ===== */
        oauthLoginSuccess(
            state,
            action: PayloadAction<{ accessToken: string }>
        ) {
            const { accessToken } = action.payload;

            const decoded: any = jwtDecode(accessToken);

            const authData: any = {
                user: {
                    _id: decoded.id,
                    role: decoded.role,
                },
                accessToken,
                refreshToken: null,
            };

            state.user = authData.user;
            state.accessToken = accessToken;
            state.refreshToken = null;
            state.isAuthenticated = true;
            state.loading = false;

            localStorage.setItem('auth', JSON.stringify(authData));
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
    oauthLoginSuccess,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
