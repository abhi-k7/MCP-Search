import { NextRequest, NextResponse } from 'next/server';
import { getGeminiMCPServerTemplate } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    if (!description) {
      return NextResponse.json({ error: 'Description is required.' }, { status: 400 });
    }
    const codeTemplate = await getGeminiMCPServerTemplate(description);
    return NextResponse.json({ codeTemplate });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
} 