import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/dashboard', '/avi', '/profile'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshCookie = request.cookies.get('avante_refresh')?.value;

  const isPrivateRoute = privateRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isAuthRoute = pathname === '/auth';

  if (isPrivateRoute && !refreshCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (isAuthRoute && refreshCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/avi/:path*', '/profile/:path*', '/auth']
};
