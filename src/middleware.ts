// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define paths where only unauthenticated users should have access
  const loginPath = '/login';
  const registerPath = '/register';

  // Check if the user is accessing the login or register page
  if (req.nextUrl.pathname === loginPath || req.nextUrl.pathname === registerPath) {
    // If the user is authenticated, redirect them away from the login/register page
    if (token) {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to home or a specific page like '/dashboard'
    }
  }

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  return NextResponse.next();
}

// Configuring the middleware to run on specific paths
export const config = {
  matcher: ['/login','/register', '/dashboard/:path*'], // Apply middleware to /login and all paths under /protected
};
