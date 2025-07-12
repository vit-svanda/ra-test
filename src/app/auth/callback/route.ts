// src/app/auth/callback/route.ts
// Supabase auth callback handler
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies: () => request.cookies });

  // Handles the OAuth callback and sets the session cookie
  await supabase.auth.exchangeCodeForSession(request);

  // Redirect to homepage or dashboard after successful login
  return NextResponse.redirect(new URL('/', request.url));
}
