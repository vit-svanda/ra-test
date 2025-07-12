import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { leadId, startTime, endTime } = await request.json();

    if (!leadId || !startTime || !endTime) {
      return NextResponse.json({ error: 'Chybějící parametry: leadId, startTime, endTime.' }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        property: true,
        agent: true,
      },
    });

    if (!lead || !lead.agent || !lead.agent.googleRefreshToken) {
      return NextResponse.json({ error: 'Agent nebo poptávka nenalezena.' }, { status: 404 });
    }

    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/auth/google/callback'
    );
    client.setCredentials({ refresh_token: lead.agent.googleRefreshToken });

    const calendar = google.calendar({ version: 'v3', auth: client });

    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: `Prohlídka: ${lead.property.title}`,
        description: lead.message,
        start: { dateTime: startTime },
        end: { dateTime: endTime },
        attendees: [
          { email: lead.clientEmail, displayName: lead.clientName },
          { email: lead.agent.email, displayName: lead.agent.name },
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Chyba při plánování schůzky.' }, { status: 500 });
  }
}