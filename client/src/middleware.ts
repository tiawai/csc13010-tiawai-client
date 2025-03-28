/* eslint-disable */
import { auth } from '@/auth';
import { Role } from '@/types/user';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

type ProtectedRoutes = {
    [key in Role]: {
        invalidRoutes: string[];
        validRoutes?: string[];
        redirect?: string;
    };
};

const protectedRoutes: ProtectedRoutes = {
    Guest: {
        invalidRoutes: [],
        validRoutes: [
            '/sign-up',
            '/sign-in',
            '/forgot-password',
            '/reset-password',
        ],
        redirect: '/',
    },
    Student: {
        invalidRoutes: ['/admin', '/sign-up', '/sign-in'],
        redirect: '/',
    },
    Teacher: {
        invalidRoutes: ['/admin', '/sign-up', '/sign-in'],
        redirect: '/',
    },
    Admin: {
        invalidRoutes: ['/home', '/sign-up', '/sign-in'],
        redirect: '/admin',
    },
};

export default auth((req: any) => {
    // const user = req.auth?.user;
    // const pathname =
    //     req.nextUrl.pathname === "/" ? "/home" : req.nextUrl.pathname;

    // const role: Role = (user && (user?.role as Role)) || "guest";

    // if (role === "guest") {
    //     const valid = protectedRoutes[role]?.validRoutes;
    //     if (valid) {
    //         const isValid = valid.some((route) => pathname.startsWith(route));
    //         if (!isValid) {
    //             const newUrl = new URL("/sign-in", req.nextUrl.origin);
    //             return Response.redirect(newUrl);
    //         }
    //     }
    // }
    // const isProtected = protectedRoutes[role].invalidRoutes.some((route) =>
    //     pathname.startsWith(route),
    // );

    // if (isProtected) {
    //     const redirect = protectedRoutes[role]?.redirect;
    //     if (redirect) {
    //         const newUrl = new URL(redirect, req.nextUrl.origin);
    //         return Response.redirect(newUrl);
    //     }

    //     return new Response("Page not found", { status: 404 });
    // }

    return;
});
