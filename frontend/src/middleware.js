import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Routes publiques
    const publicRoutes = ['/login', '/register'];

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
    if (!token && !publicRoutes.includes(pathname)) {
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    // Si l'utilisateur est connecté et essaie d'accéder à une route publique
    if (token && publicRoutes.includes(pathname)) {
        const url = new URL('/', request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};