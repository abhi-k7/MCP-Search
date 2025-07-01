import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getGeminiMCPBuild } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    if (!description) {
      return NextResponse.json({ error: 'Description is required.' }, { status: 400 });
    }
    // Fetch all MCP servers
    const servers = await prisma.mcpServer.findMany();
    // Call Gemini LLM for MCP build outline
    const buildOutline = await getGeminiMCPBuild(description, servers);
    return NextResponse.json({ buildOutline });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
} 