import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { Provider } from 'next-auth/providers';
import { User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';
import { handleSignIn, handleRefreshToken } from '@/services/auth-server';

const providers: Provider[] = [
    Credentials({
        credentials: {
            username: {},
            password: {},
        },
        authorize: async (credentials) => {
            const { username, password } = credentials;
            const res = await handleSignIn(username, password);

            if (!res) return null;
            if (res?.error) return null;

            const { accessToken, refreshToken } = res as User;
            return { accessToken, refreshToken };
        },
    }),
    GitHub,
];

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === 'function') {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    })
    .filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            const decoded = jwtDecode(
                user ? user.accessToken : token.accessToken,
            );

            if (user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    iat: decoded.iat,
                    exp: decoded.exp,
                    user: {
                        id: decoded?.id,
                        email: decoded?.email,
                        username: decoded?.username,
                        role: decoded?.role,
                    },
                };
            }

            if (Date.now() >= (decoded?.exp || 0) * 1000 - 300000) {
                const res = await handleRefreshToken(token.refreshToken);
                if (!res) {
                    return {
                        ...token,
                        iat: decoded.iat,
                        exp: decoded.exp,
                    };
                }

                if (res?.error) {
                    token.error = 'RefreshTokenError';
                    return token;
                }

                const { accessToken, refreshToken } = res as User;
                const newDecoded = jwtDecode(accessToken);

                return {
                    ...token,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    iat: newDecoded.iat,
                    exp: newDecoded.exp,
                };
            }

            return {
                ...token,
                iat: decoded.iat,
                exp: decoded.exp,
            };
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            const decoded = jwtDecode(token.refreshToken);

            return {
                ...session,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                expires: decoded.exp
                    ? new Date(decoded.exp * 1000).toISOString()
                    : '',
                user: {
                    ...token.user,
                },
                error: token.error,
            };
        },
    },
});
