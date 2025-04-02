'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/user';

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
    user: new User(),
    accessToken: undefined,
    refreshToken: undefined,
    chatSessionId: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>): void => {
            state.user = action.payload.user;
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

        setSignOut: (state): void => {
            state.user = new User();
            state.refreshToken = undefined;
            state.chatSessionId = undefined;
        },
    },
});

export default authSlice.reducer;

export const { setAuthState, setCridentials, setChatSessionId, setSignOut } =
    authSlice.actions;
