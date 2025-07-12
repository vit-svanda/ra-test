// src/app/api/agents/route.ts
// API route for CRUD operations on agents
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all agents
export async function GET() {
  try {
    const agents = await prisma.agent.findMany();
    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents.' }, { status: 500 });
  }
}

// POST: Create a new agent
export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const newAgent = await prisma.agent.create({
      data: { name, email },
    });

    return NextResponse.json(newAgent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create agent.' }, { status: 500 });
  }
}

// Add PUT, DELETE as needed for full CRUD
