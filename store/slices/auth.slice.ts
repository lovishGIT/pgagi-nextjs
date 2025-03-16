import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: Partial<User> | null;
    token?: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                name: string;
                email: string;
                token: string;
            }>
        ) => {
            state.user = {
                name: action.payload.name,
                email: action.payload.email,
            };
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
