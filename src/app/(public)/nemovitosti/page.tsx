// /src/app/(public)/nemovitosti/InteractivePropertyList.tsx

'use client'; // <-- Důležité: Tímto říkáme, že jde o interaktivní komponentu pro prohlížeč

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property, Agent } from '@prisma/client';

// Definujeme si typ pro data, která komponenta očekává
// Je to 'Property' plus připojená data o makléři
type PropertyWithAgent = Property & {
  agent: {
    name: string | null;
  } | null;
};

interface Props {
  initialProperties: PropertyWithAgent[];
}

export default function InteractivePropertyList({ initialProperties }: Props) {
  // Stav pro ukládání aktuálně zobrazených (vyfiltrovaných) nemovitostí
  const [displayedProperties, setDisplayedProperties] = useState(initialProperties);
  
  // Stav pro ukládání hodnot filtrů
  const [filters, setFilters] = useState({
    maxPrice: '',
  });

  // Tento efekt se spustí vždy, když se změní filtry
  useEffect(() => {
    let filtered = initialProperties;

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice, 10));
    }
    
    // Zde můžete přidat další logiku pro filtrování...

    setDisplayedProperties(filtered);
  }, [filters, initialProperties]);


  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Seznam nemovitostí</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* === SEKCE S FILTRY (Levý sloupec) === */}
        <aside className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Filtry</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                Cena do (Kč)
              </label>
              <input
                type="number"
                id="maxPrice"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="např. 8000000"
              />
            </div>
            {/* Zde přijdou další filtry */}
          </div>
        </aside>

        {/* === SEKCE S VÝPISEM NEMOVITOSTÍ (Pravý sloupec) === */}
        {/* Toto je váš původní kód z page.tsx, jen místo 'properties' používá 'displayedProperties' */}
        <div className="w-full md:w-3/4">
          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/nemovitosti/${property.id}`}
                  className="block border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white"
                >
                  <img
                    src={property.imageUrls[0] || '/placeholder.jpg'}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                    <div className="text-lg font-bold text-green-700 mb-1">
                      {property.price.toLocaleString()} Kč
                    </div>
                    <div className="text-gray-600 mb-1">
                      {property.area} m² &bull; {property.rooms}
                    </div>
                    <div className="text-sm text-gray-500">
                      Makléř: {property.agent?.name || '-'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>Těmto filtrům neodpovídají žádné nemovitosti.</p>
          )}
        </div>
      </div>
    </main>
  );
}