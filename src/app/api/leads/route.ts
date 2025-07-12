// src/app/api/leads/route.ts
// API route for handling leads (MiniCRM)
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  // Optional: Implement fetching all leads if needed
  return NextResponse.json({ message: 'List of leads (placeholder)' });
}

export async function POST(req: NextRequest) {
  try {
    const { clientName, clientEmail, message, propertyId } = await req.json();

    if (!clientName || !clientEmail || !message || !propertyId) {
      return NextResponse.json({ error: 'Všechna pole jsou povinná.' }, { status: 400 });
    }

    // Find property and agent
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { agent: true },
    });

    if (!property || !property.agent) {
      return NextResponse.json({ error: 'Nemovitost nebo makléř nenalezen.' }, { status: 404 });
    }

    // Create Lead
    const lead = await prisma.lead.create({
      data: {
        clientName,
        clientEmail,
        message,
        propertyId,
        agentId: property.agent.id,
      },
    });

    // Send email to agent
    await resend.emails.send({
      from: 'noreply@yourdomain.cz',
      to: property.agent.email,
      subject: `Nová poptávka na nemovitost: ${property.title}`,
      html: `
        <h2>Nová poptávka</h2>
        <p><strong>Nemovitost:</strong> ${property.title}</p>
        <p><strong>Jméno zájemce:</strong> ${clientName}</p>
        <p><strong>Email zájemce:</strong> ${clientEmail}</p>
        <p><strong>Zpráva:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Chyba při odesílání poptávky.' }, { status: 500 });
  }
}
