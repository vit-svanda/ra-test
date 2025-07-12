// src/app/admin/layout.tsx
// Layout for the admin section (e.g., with a sidebar)
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        {/* Admin Sidebar */}
        <aside className="w-64 bg-gray-900 text-white min-h-screen float-left p-4">Admin Sidebar</aside>
        <main className="ml-64 p-4">{children}</main>
      </body>
    </html>
  );
}
