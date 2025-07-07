import { NextRequest, NextResponse } from 'next/server';
import { getGeminiAPItoMCP } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { restapi } = await req.json();
    if (!restapi) {
      return NextResponse.json({ error: 'REST API code is required.' }, { status: 400 });
    }
    const codeTemplate = await getGeminiAPItoMCP(restapi);
    return NextResponse.json({ codeTemplate });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
} 