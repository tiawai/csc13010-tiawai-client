'use client';
import { appApi } from '@/services/config';
import { store } from '@/lib/store/store';
import { setSignOut } from '@/lib/slices/auth.slice';
import { UserSignUpDto } from '@/types/auth.type';

const authApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        signUp: builder.mutation<void, UserSignUpDto>({
            query: (body) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body,
            }),
        }),

        signIn: builder.mutation({
            query: ({ username, password }) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: {
                    username,
                    password,
                },
            }),
        }),

        signOut: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/sign-out',
                method: 'DELETE',
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await queryFulfilled;
                store.dispatch(setSignOut());
            },
        }),

        refreshToken: builder.mutation({
            query: () => '/auth/refresh-token',
        }),

        passwordRecovery: builder.mutation({
            query: ({ email }) => ({
                url: '/auth/password-recovery',
                method: 'POST',
                body: {
                    email,
                },
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ email, otp, newPassword, confirmPassword }) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: {
                    email,
                    otp,
                    newPassword,
                    confirmPassword,
                },
            }),
        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useRefreshTokenMutation,
    usePasswordRecoveryMutation,
    useResetPasswordMutation,
} = authApi;
