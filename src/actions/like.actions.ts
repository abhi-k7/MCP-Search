'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { syncUser } from './user.actions';
import { revalidatePath } from 'next/cache';

export async function toggleLike({ serverId }: { serverId: string }) {
  const user = await currentUser();

  if (!user) {
    throw new Error('You must be logged in to like a server.');
  }
  
  const dbUser = await syncUser(user);
  const data = {
    userId: dbUser.id,
    serverId: serverId,
  };

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_serverId: data,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_serverId: data,
        },
      });
      revalidatePath('/search');
      return { liked: false };
    } else {
      await prisma.like.create({ data });
      revalidatePath('/search');
      return { liked: true };
    }
  } catch (error) {
    console.error("Failed to toggle like:", error);
    throw new Error("Something went wrong. Please try again.");
  }
} 