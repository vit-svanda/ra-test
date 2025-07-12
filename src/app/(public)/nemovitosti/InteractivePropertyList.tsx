'use client';

import { useEffect, useMemo, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  area: number;
  rooms: string;
  imageUrls: string[];
  lat?: number; // Add latitude and longitude to your property model if not present
  lng?: number;
  agent: { name: string };
};

type Props = {
  initialProperties: Property[];
};

export default function InteractivePropertyList({ initialProperties }: Props) {
  const [filtered, setFiltered] = useState<Property[]>(initialProperties);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [search, setSearch] = useState('');

  // Filtering logic
  useEffect(() => {
    let result = initialProperties;

    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
    if (rooms) result = result.filter(p => p.rooms === rooms);
    if (search)
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.address.toLowerCase().includes(search.toLowerCase())
      );

    setFiltered(result);
  }, [minPrice, maxPrice, rooms, search, initialProperties]);

  // Center map on first property with coordinates, fallback to Prague
  const mapCenter = useMemo(() => {
    const prop = filtered.find(p => p.lat && p.lng);
    return prop ? { lat: prop.lat!, lng: prop.lng! } : { lat: 50.0755, lng: 14.4378 };
  }, [filtered]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY!}>
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto py-8 px-4">
        {/* Filters */}
        <div className="md:w-1/4 w-full bg-white p-4 rounded shadow mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Filtry</h2>
          <input
            type="text"
            placeholder="Hledat název/adresu"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <input
            type="number"
            placeholder="Min. cena"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <input
            type="number"
            placeholder="Max. cena"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Dispozice (např. 3+1)"
            value={rooms}
            onChange={e => setRooms(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <div className="text-gray-500 text-sm mt-2">
            Výsledků: {filtered.length}
          </div>
        </div>

        {/* Map & List */}
        <div className="md:w-3/4 w-full flex flex-col gap-6">
          {/* Map */}
          <div className="w-full h-80 rounded shadow overflow-hidden">
            <Map
              defaultCenter={mapCenter}
              defaultZoom={11}
              mapId=""
              style={{ width: '100%', height: '100%' }}
            >
              {filtered
                .filter(p => p.lat && p.lng)
                .map(p => (
                  <Marker
                    key={p.id}
                    position={{ lat: p.lat!, lng: p.lng! }}
                    title={p.title}
                  />
                ))}
            </Map>
          </div>
          {/* List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(property => (
              <a
                key={property.id}
                href={`/nemovitosti/${property.id}`}
                className="block border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white"
              >
                <img
                  src={property.imageUrls[0] || '/placeholder.jpg'}
                  alt={property.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{property.title}</h2>
                  <div className="text-green-700 font-bold mb-1">
                    {property.price.toLocaleString()} Kč
                  </div>
                  <div className="text-gray-600 mb-1">
                    {property.area} m² &bull; {property.rooms}
                  </div>
                  <div className="text-sm text-gray-500">
                    Makléř: {property.agent?.name || '-'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </APIProvider>
  );
}