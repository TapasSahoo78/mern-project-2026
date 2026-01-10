import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AdminState, DashboardStats, AdminUser } from './admin.types';

const initialState: AdminState = {
    stats: null,
    users: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminStart(state) {
            state.loading = true;
            state.error = null;
        },

        fetchStatsRequest() { },
        fetchStatsSuccess(state, action: PayloadAction<DashboardStats>) {
            state.loading = false;
            state.stats = action.payload;
        },

        fetchUsersRequest() { },
        fetchUsersSuccess(state, action: PayloadAction<AdminUser[]>) {
            state.loading = false;
            state.users = action.payload;
        },

        updateUserRoleRequest(
            _state,
            _action: PayloadAction<{ userId: string; role: 'ADMIN' | 'USER' }>
        ) { },

        adminFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    adminStart,
    fetchStatsRequest,
    fetchStatsSuccess,
    fetchUsersRequest,
    fetchUsersSuccess,
    updateUserRoleRequest,
    adminFailure,
} = adminSlice.actions;

export default adminSlice.reducer;
