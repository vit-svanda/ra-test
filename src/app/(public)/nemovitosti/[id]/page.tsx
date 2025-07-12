// src/app/(public)/nemovitosti/[id]/page.tsx
// Detail page for a single property (SSR)
import React from 'react';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import ContactForm from '../../../_components/ContactForm';

const prisma = new PrismaClient();

type Props = {
  params: { id: string };
};

export default async function PropertyDetailPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { agent: true },
  });

  if (!property || !property.isPublished) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Gallery */}
          <div className="flex-1">
            {property.imageUrls && property.imageUrls.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto">
                {property.imageUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Obrázek ${i + 1}`}
                    className="h-64 w-auto rounded shadow"
                  />
                ))}
              </div>
            ) : (
              <div className="h-64 bg-gray-200 flex items-center justify-center rounded">
                <span>Bez obrázku</span>
              </div>
            )}
          </div>
          {/* Main Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="text-2xl text-green-700 font-bold mb-2">
              {property.price.toLocaleString()} Kč
            </div>
            <table className="mb-4">
              <tbody>
                <tr>
                  <td className="pr-4 font-semibold">Adresa:</td>
                  <td>{property.address}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Dispozice:</td>
                  <td>{property.rooms}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Užitná plocha:</td>
                  <td>{property.area} m²</td>
                </tr>
                {property.plotArea && (
                  <tr>
                    <td className="pr-4 font-semibold">Plocha pozemku:</td>
                    <td>{property.plotArea} m²</td>
                  </tr>
                )}
                <tr>
                  <td className="pr-4 font-semibold">Typ:</td>
                  <td>{property.type}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Stav:</td>
                  <td>{property.condition}</td>
                </tr>
              </tbody>
            </table>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Popis</h2>
              <div className="bg-gray-50 p-3 rounded">{property.description}</div>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Kontakt na makléře</h2>
              <div>
                <div>{property.agent?.name}</div>
                <div>{property.agent?.email}</div>
                {property.agent?.phone && <div>{property.agent.phone}</div>}
              </div>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Mám zájem</h2>
              <div className="bg-gray-100 p-3 rounded">
                <ContactForm propertyId={property.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
