// src/app/(public)/makleri/[slug]/page.tsx
// Public profile of an agent
import React from 'react';

export default function AgentProfilePage({ params }: { params: { slug: string } }) {
  // Fetch agent profile by slug
  // const agent = await getAgentBySlug(params.slug);
  return (
    <main>
      <h1>Profil makléře (slug: {params.slug})</h1>
      {/* Render agent profile here */}
    </main>
  );
}
