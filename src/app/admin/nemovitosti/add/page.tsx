// src/app/admin/nemovitosti/add/page.tsx
// Page with multi-step form to add property
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/app/_components/ImageUploader';

type Agent = {
  id: string;
  name: string;
};

const propertyTypes = [
  { value: 'SALE', label: 'Prodej' },
  { value: 'RENT', label: 'Pronájem' },
];

const propertyConditions = [
  { value: 'NEW_BUILDING', label: 'Novostavba' },
  { value: 'GOOD', label: 'Dobrý stav' },
  { value: 'NEEDS_RECONSTRUCTION', label: 'K rekonstrukci' },
];

const [property, setProperty] = useState({
  // ...other fields...
  imageUrls: [] as string[],
  // ...other fields...
});

export default function AddPropertyPage() {
  const [step, setStep] = useState(1);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const router = useRouter();

  // Property state
  const [property, setProperty] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    area: '',
    plotArea: '',
    rooms: '',
    type: 'SALE',
    condition: 'GOOD',
    agentId: '',
    imageUrls: '',
    isPublished: false,
  });

  // Fetch agents for dropdown
  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => setAgents(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare imageUrls as array
    const imageUrlsArray = property.imageUrls
      ? property.imageUrls.split(',').map(url => url.trim()).filter(Boolean)
      : [];

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...property,
          price: Number(property.price),
          area: Number(property.area),
          plotArea: property.plotArea ? Number(property.plotArea) : null,
          imageUrls: imageUrlsArray,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Chyba při ukládání nemovitosti.');
        setLoading(false);
        return;
      }
      router.push('/admin/nemovitosti');
    } catch {
      setError('Chyba při odesílání dat.');
      setLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    setAiLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: property.title,
          address: property.address,
          price: property.price,
          area: property.area,
          rooms: property.rooms,
          type: property.type,
          condition: property.condition,
        }),
      });
      const data = await res.json();
      if (data.description) {
        setProperty(prev => ({ ...prev, description: data.description }));
      } else {
        setError('AI popis se nepodařilo vygenerovat.');
      }
    } catch {
      setError('Chyba při komunikaci s AI.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Přidat novou nemovitost</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Krok 1: Základní informace</h2>
            <input
              type="text"
              name="title"
              placeholder="Název"
              value={property.title}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            />
            <textarea
              name="description"
              placeholder="Popis"
              value={property.description}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Adresa"
              value={property.address}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="rooms"
              placeholder="Dispozice (např. 3+1, 4+kk)"
              value={property.rooms}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            />
            <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
              Další
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Krok 2: Specifikace a cena</h2>
            <input
              type="number"
              name="price"
              placeholder="Cena"
              value={property.price}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="number"
              name="area"
              placeholder="Užitná plocha (m²)"
              value={property.area}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="number"
              name="plotArea"
              placeholder="Plocha pozemku (m²)"
              value={property.plotArea}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="imageUrls"
              placeholder="Obrázky (URL oddělené čárkou)"
              value={property.imageUrls}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <select
              name="type"
              value={property.type}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            >
              {propertyTypes.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              name="condition"
              value={property.condition}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            >
              {propertyConditions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button type="button" onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 rounded">
                Zpět
              </button>
              <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
                Další
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Krok 2: Obrázky nemovitosti</h2>
              <ImageUploader
              onUploadComplete={(urls) =>
              setProperty((prev) => ({ ...prev, imageUrls: urls }))
              }
              />
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 rounded">
                    Zpět
                  </button>
                  <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Další
                  </button>
                </div>
            </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Krok 3: Přiřazení makléře</h2>
            <select
              name="agentId"
              value={property.agentId}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full mb-2"
              required
            >
              <option value="">Vyberte makléře</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={property.isPublished}
                onChange={handleChange}
              />
              Publikovat nemovitost
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 rounded">
                Zpět
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                Uložit nemovitost
              </button>
            </div>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>
        )}
      </form>
    </div>
  );
}
