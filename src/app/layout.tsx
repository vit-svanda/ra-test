// src/app/layout.tsx
// Root layout of the entire application
import React from 'react';
import Analytics from './_components/Analytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="bg-gray-50 min-h-screen">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
