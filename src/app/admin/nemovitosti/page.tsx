// src/app/admin/nemovitosti/page.tsx
// List of properties for admin to manage
'use client';

import { useEffect, useState } from 'react';

type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  agent: { name: string };
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Seznam nemovitostí (Admin)</h1>
          <a
            href="/admin/nemovitosti/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Přidat novou nemovitost
          </a>
        </div>
        {loading ? (
          <div>Načítání...</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Název</th>
                <th className="border px-2 py-1">Adresa</th>
                <th className="border px-2 py-1">Cena</th>
                <th className="border px-2 py-1">Makléř</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="border px-2 py-1">{property.title}</td>
                  <td className="border px-2 py-1">{property.address}</td>
                  <td className="border px-2 py-1">{property.price.toLocaleString()} Kč</td>
                  <td className="border px-2 py-1">{property.agent?.name || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
