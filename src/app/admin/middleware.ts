// src/middleware.ts
// Middleware for protecting the /admin route
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Example: Check for authentication (placeholder)
  // if (!req.cookies.get('sb-access-token')) {
  //   return NextResponse.redirect('/login');
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
