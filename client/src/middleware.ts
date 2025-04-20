/* eslint-disable */
import { auth } from './auth';
import { Role, User, UserUtils } from '@/types/user.type';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

type ProtectedRoutes = {
    [key in Role]: {
        invalidRoutes: string[];
        validRoutes: string[];
        redirect: string;
    };
};

const protectedRoutes: ProtectedRoutes = {
    Guest: {
        invalidRoutes: ['/student/', '/teacher/'],
        validRoutes: ['/student', '/teacher', '/auth'],
        redirect: '/auth/sign-in',
    },
    Student: {
        invalidRoutes: ['/admin', '/teacher', '/auth'],
        validRoutes: [],
        redirect: '/',
    },
    Teacher: {
        invalidRoutes: ['/admin', '/student', '/auth'],
        validRoutes: [],
        redirect: '/',
    },
    Admin: {
        invalidRoutes: ['/auth'],
        validRoutes: [],
        redirect: '/admin',
    },
};

export default auth((req: any) => {
    const authUser = req.auth?.user;
    const user: User =
        authUser === undefined ? UserUtils.initGuest() : authUser;
    const pathname = req.nextUrl.pathname;

    if (pathname === '/') {
        if (user.role === Role.GUEST) {
            return Response.redirect(new URL('/student', req.nextUrl.origin));
        }
        const newUrl = new URL(
            `/${user.role.toLowerCase()}`,
            req.nextUrl.origin,
        );
        return Response.redirect(newUrl);
    }

    const redirect = protectedRoutes[user.role].redirect;
    const newUrl = new URL(redirect, req.nextUrl.origin);

    const validRoutes = protectedRoutes[user.role];
    if (validRoutes.validRoutes.length > 0) {
        const isValid = protectedRoutes[user.role].validRoutes.some((route) =>
            pathname.startsWith(route),
        );
        if (!isValid) {
            return Response.redirect(newUrl);
        }
    }

    const invalidRoutes = protectedRoutes[user.role];
    if (invalidRoutes.invalidRoutes.length > 0) {
        const isProtected = protectedRoutes[user.role].invalidRoutes.some(
            (route) => pathname.startsWith(route),
        );

        if (isProtected) {
            return Response.redirect(newUrl);
        }
    }

    return;
});
