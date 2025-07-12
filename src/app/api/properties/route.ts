// src/app/api/properties/route.ts
// API route for CRUD operations on properties
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, PropertyType, PropertyCondition } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all properties, including agent's name
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        agent: {
          select: { name: true }
        }
      }
    });
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties.' }, { status: 500 });
  }
}

// POST: Create a new property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      address,
      price,
      area,
      plotArea,
      rooms,
      type,
      condition,
      agentId,
      imageUrls,
      description,
      isPublished
    } = body;

    // Basic validation
    if (!title || !address || !price || !area || !rooms || !type || !condition || !agentId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const property = await prisma.property.create({
      data: {
        title,
        address,
        price: Number(price),
        area: Number(area),
        plotArea: plotArea ? Number(plotArea) : null,
        rooms,
        type,
        condition,
        agentId,
        imageUrls: imageUrls || [],
        description: description || null,
        isPublished: !!isPublished,
      }
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create property.' }, { status: 500 });
  }
}

// Add PUT, DELETE as needed for full CRUD
