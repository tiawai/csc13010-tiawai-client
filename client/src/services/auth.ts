'use client';
import { appApi } from '@/services/config';
import { setSignOut } from '@/lib/slices/auth';
import { store } from '@/lib/store/store';
import { UserSignUpDto } from '@/types/user';

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

        signOut: builder.mutation({
            query: () => ({
                url: '/auth/sign-out',
                method: 'POST',
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

export const handleRefreshToken = async (refreshToken: string) => {
    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/auth/refresh-token',
            {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        );

        if (res.ok) {
            const data = await res.json();
            return { accessToken: data.accessToken };
        }
    } catch (error) {
        return { error };
    }
};
