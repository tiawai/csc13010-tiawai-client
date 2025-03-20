/* eslint-disable */
import NextAuth, { DefaultSession, User } from 'next-auth';
import { User as UserInfo } from '@/lib/slices/auth';
import { JWT } from 'next-auth/jwt';

export type RefreshTokenError = 'RefreshTokenError';

declare module 'next-auth' {
    interface User {
        refreshToken: string;
        accessToken: string;
    }

    interface Account {
        provider: string;
        type: string;
        id: string;
        refreshToken: string;
        accessToken: string;
        accessTokenExpires: number;
    }

    interface Session {
        accessToken: string;
        refreshToken: string;
        expires: string;
        user: UserInfo;
        error?: RefreshTokenError;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        user: UserInfo;
        error?: RefreshTokenError;
    }
}
