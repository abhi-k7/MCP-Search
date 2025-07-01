"use server";

import { prisma } from "@/lib/prisma";
import type { User as ClerkUser } from '@clerk/nextjs/server';

export const syncUser = async (user: ClerkUser) => {

  const userId = user.id;

  // Use upsert to atomically find or create the user
  const dbUser = await prisma.user.upsert({
    where: { clerkId: userId },
    // What to update if the user is found
    update: {
      username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
    },
    // What to create if the user is not found
    create: {
      clerkId: userId,
      username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
    }
  });

  return dbUser;
}
