// src/app/admin/makleri/page.tsx
// Page to manage agents (CRUD)
'use client';

import React, { useEffect, useState } from 'react';

type Agent = {
  id: string;
  name: string;
  email: string;
};

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch agents on mount
  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agents');
      const data = await res.json();
      setAgents(data);
    } catch {
      setError('Nepodařilo se načíst makléře.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email) {
      setError('Jméno a email jsou povinné.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Chyba při vytváření makléře.');
        return;
      }
      setName('');
      setEmail('');
      fetchAgents();
    } catch {
      setError('Chyba při odesílání dat.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Správa makléřů</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Jméno"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Přidat makléře
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <h2 className="text-xl font-semibold mb-2">Seznam makléřů</h2>
      {loading ? (
        <div>Načítání...</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Jméno</th>
              <th className="border px-2 py-1">Email</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id}>
                <td className="border px-2 py-1">{agent.name}</td>
                <td className="border px-2 py-1">{agent.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
