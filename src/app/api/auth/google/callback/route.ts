import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.redirect('/?error=missing_code');

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/auth/google/callback'
  );

  const { tokens } = await client.getToken(code);

  // TODO: Get the currently logged-in agent's ID (e.g., from session/cookie)
  const agentId = /* your logic here */ '';

  if (!tokens.refresh_token) {
    return NextResponse.redirect('/?error=missing_refresh_token');
  }

  await prisma.agent.update({
    where: { id: agentId },
    data: { googleRefreshToken: tokens.refresh_token },
  });

  return NextResponse.redirect('/admin?calendar_connected=1');
}