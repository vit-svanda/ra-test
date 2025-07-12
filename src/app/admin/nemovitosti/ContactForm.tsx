'use client';

import { useState } from 'react';

type Props = {
  propertyId: string;
};

export default function ContactForm({ propertyId }: Props) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientEmail, message, propertyId }),
      });
      if (res.ok) {
        setSuccess(true);
        setClientName('');
        setClientEmail('');
        setMessage('');
      } else {
        const data = await res.json();
        setError(data.error || 'Chyba při odesílání.');
      }
    } catch {
      setError('Chyba při odesílání.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Vaše jméno"
        value={clientName}
        onChange={e => setClientName(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />
      <input
        type="email"
        placeholder="Váš email"
        value={clientEmail}
        onChange={e => setClientEmail(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />
      <textarea
        placeholder="Vaše zpráva"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Odesílám...' : 'Odeslat poptávku'}
      </button>
      {success && <div className="text-green-600">Děkujeme za váš zájem! Makléř vás bude kontaktovat.</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}