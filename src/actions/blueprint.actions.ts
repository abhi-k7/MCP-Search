"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "./user.actions";

export async function createBlueprint({
  title,
  description,
  serverIds,
  isPublic = false
}: {
  title: string;
  description?: string;
  serverIds: string[];
  isPublic?: boolean;
}) {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to create a blueprint.");
  const dbUser = await syncUser(user);

  if (!title || !serverIds.length) {
    throw new Error("Title and at least one server are required.");
  }

  const blueprint = await prisma.blueprint.create({
    data: {
      title,
      description: description || "",
      isPublic,
      user: { connect: { id: dbUser.id } },
      mcpServers: {
        connect: serverIds.map((id) => ({ id })),
      },
    },
  });

  return blueprint;
}

export async function getUserBlueprints() {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to view blueprints.");
  const dbUser = await syncUser(user);

  const blueprints = await prisma.blueprint.findMany({
    where: { userId: dbUser.id },
    include: {
      mcpServers: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return { blueprints };
}

export async function deleteBlueprint(blueprintId: string): Promise<{ success: boolean }> {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to delete a blueprint.");
  const dbUser = await syncUser(user);

  // Ensure the blueprint belongs to the user
  const blueprint = await prisma.blueprint.findUnique({
    where: { id: blueprintId },
    select: { userId: true },
  });
  if (!blueprint || blueprint.userId !== dbUser.id) {
    throw new Error("You do not have permission to delete this blueprint.");
  }

  await prisma.blueprint.delete({ where: { id: blueprintId } });
  return { success: true };
}

export async function publishBlueprint(blueprintId: string): Promise<{ success: boolean }> {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to publish a blueprint.");
  const dbUser = await syncUser(user);

  // Ensure the blueprint belongs to the user
  const blueprint = await prisma.blueprint.findUnique({
    where: { id: blueprintId },
    select: { userId: true },
  });
  if (!blueprint || blueprint.userId !== dbUser.id) {
    throw new Error("You do not have permission to publish this blueprint.");
  }

  await prisma.blueprint.update({
    where: { id: blueprintId },
    data: { isPublic: true },
  });
  return { success: true };
}

export async function unpublishBlueprint(blueprintId: string): Promise<{ success: boolean }> {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to unpublish a blueprint.");
  const dbUser = await syncUser(user);

  // Ensure the blueprint belongs to the user
  const blueprint = await prisma.blueprint.findUnique({
    where: { id: blueprintId },
    select: { userId: true },
  });
  if (!blueprint || blueprint.userId !== dbUser.id) {
    throw new Error("You do not have permission to unpublish this blueprint.");
  }

  await prisma.blueprint.update({
    where: { id: blueprintId },
    data: { isPublic: false },
  });
  return { success: true };
} 