"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBlueprint } from "@/actions/blueprint.actions";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteBlueprintButton({ blueprintId }: { blueprintId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this blueprint? This action cannot be undone.")) return;
    startTransition(async () => {
      await deleteBlueprint(blueprintId);
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete blueprint"
      className="text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="w-5 h-5" />
    </Button>
  );
} 