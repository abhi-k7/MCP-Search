import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { currentUser } from '@clerk/nextjs/server';
import { syncUser } from "./user.actions";

export async function getMCPServers({ query, category }: { query?: string, category?: string }) {
  const user = await currentUser();
  
  let dbUser = null;
  if (user) {
    dbUser = await syncUser(user);
  }
  
  try {
    const where: Prisma.McpServerWhereInput = {};

    if (query) {
      where.name = {
        contains: query,
        mode: 'insensitive',
      };
    }

    if (category) {
      where.category = {
        equals: category,
      };
    }

    const servers = await prisma.mcpServer.findMany({
      where,
      orderBy: {
        name: 'asc'
      },
      include: {
        likes: dbUser ? { where: { userId: dbUser.id } } : false,
      },
    });

    return { servers };
  } catch (error) {
    console.error('Error fetching MCP servers:', error);
    return { servers: [] };
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.mcpServer.findMany({
      distinct: ['category'],
      select: {
        category: true,
      },
      orderBy: {
        category: 'asc',
      },
    });

    return { categories: categories.map((c) => c.category) };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { categories: [] };
  }
} 