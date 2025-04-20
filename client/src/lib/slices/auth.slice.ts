'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserUtils } from '@/types/user.type';
import type { RootState } from '@/lib/store/store';

type AccessToken = string | undefined;
type RefreshToken = string | undefined;

export type AuthState = {
    user: User;
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    chatSessionId?: string;
};

export type CredentialsProps = {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
};

const initialState: AuthState = {
    user: UserUtils.initGuest(),
    accessToken: undefined,
    refreshToken: undefined,
    chatSessionId: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>): void => {
            if (state.user.id !== action.payload.user.id) {
                state.user = action.payload.user;
            }
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },

        setCridentials: (
            state,
            action: PayloadAction<CredentialsProps>,
        ): void => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },

        setChatSessionId: (state, action: PayloadAction<string>): void => {
            state.chatSessionId = action.payload;
        },

        setUser: (state, action: PayloadAction<Partial<User>>): void => {
            console.log('setUser', action.payload);
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },

        setSignOut: (state): void => {
            state.user = UserUtils.initGuest();
            state.refreshToken = undefined;
            state.chatSessionId = undefined;
        },
    },
});

export default authSlice.reducer;

export const {
    setAuthState,
    setCridentials,
    setChatSessionId,
    setUser,
    setSignOut,
} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
