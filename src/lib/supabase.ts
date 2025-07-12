// src/lib/supabase.ts
// Supabase client instance creators
import { createBrowserClient, createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// For client-side usage
export const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// For server-side usage (API routes, SSR, etc.)
export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );
