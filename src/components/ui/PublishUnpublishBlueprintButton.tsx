"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { publishBlueprint, unpublishBlueprint } from "@/actions/blueprint.actions";
import { Button } from "@/components/ui/button";

export default function PublishUnpublishBlueprintButton({ blueprintId, isPublic }: { blueprintId: string; isPublic: boolean }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      if (isPublic) {
        await unpublishBlueprint(blueprintId);
      } else {
        await publishBlueprint(blueprintId);
      }
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant={isPublic ? "outline" : "default"}
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      aria-label={isPublic ? "Unpublish blueprint" : "Publish blueprint"}
      className={isPublic ? "text-muted-foreground" : ""}
    >
      {isPending
        ? (isPublic ? "Unpublishing..." : "Publishing...")
        : (isPublic ? "Unpublish" : "Publish")}
    </Button>
  );
} 