// src/app/(public)/layout.tsx
// Public layout with Navbar and Footer
import React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        {/* Navbar */}
        <nav className="bg-white shadow p-4">Navbar</nav>
        <main>{children}</main>
        {/* Footer */}
        <footer className="bg-gray-100 p-4 text-center">&copy; {new Date().getFullYear()} Real Estate App</footer>
      </body>
    </html>
  );
}
