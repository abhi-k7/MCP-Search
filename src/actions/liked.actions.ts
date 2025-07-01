'use server';

import { prisma } from '@/lib/prisma';
import { syncUser } from './user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';

export async function getLikedMCPServers({ query, category }: { query?: string, category?: string }) {
  const user = await currentUser();

  if (!user) {
    return { servers: [] };
  }
  
  const dbUser = await syncUser(user);

  try {
    // Step 1: Find all 'Like' records and get the server IDs.
    const likedServerRecords = await prisma.like.findMany({
      where: { userId: dbUser.id },
      select: { serverId: true },
    });

    // Step 2: Extract just the IDs into a simple array.
    const serverIds = likedServerRecords.map(like => like.serverId);

    // If the user hasn't liked any servers, there's nothing more to do.
    if (serverIds.length === 0) {
      return { servers: [] };
    }

    const where: Prisma.McpServerWhereInput = {
      id: {
        in: serverIds,
      },
    };

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

    // Step 3: Fetch the full server data for only the liked server IDs.
    const likedServers = await prisma.mcpServer.findMany({
      where,
      // We still need to include the 'likes' for the LikeButton UI to work correctly.
      include: {
        likes: {
          where: {
            userId: dbUser.id,
          },
        },
      },
    });

    return { servers: likedServers };

  } catch (error) {
    console.error('Failed to fetch liked servers:', error);
    return { servers: [] };
  }
}