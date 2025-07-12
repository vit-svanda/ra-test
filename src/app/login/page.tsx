// src/app/login/page.tsx
// Login page
'use client';

import React from 'react';
import { supabaseBrowser } from '@/lib/supabase';

export default function LoginPage() {
  const handleLogin = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Přihlášení</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Přihlásit se přes Google
      </button>
    </div>
  );
}
