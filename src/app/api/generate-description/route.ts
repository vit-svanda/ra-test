// src/app/api/generate-description/route.ts
// API route for generating property description using Gemini AI
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      address,
      price,
      area,
      rooms,
      type,
      condition,
    } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Gemini API key.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Construct a detailed prompt for the AI
    const prompt = `
Jsi zkušený realitní copywriter. Na základě těchto údajů napiš poutavý, emotivní a prodejní popis nemovitosti v češtině. Zaměř se na výhody, atmosféru a vhodné využití nemovitosti. 
Údaje:
- Název: ${title}
- Adresa: ${address}
- Cena: ${price} Kč
- Užitná plocha: ${area} m²
- Dispozice: ${rooms}
- Typ: ${type}
- Stav: ${condition}
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ description: text });
  } catch (error) {
    return NextResponse.json({ error: 'AI popis se nepodařilo vygenerovat.' }, { status: 500 });
  }
}
