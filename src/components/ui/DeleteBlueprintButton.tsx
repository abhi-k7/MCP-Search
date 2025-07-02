"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBlueprint } from "@/actions/blueprint.actions";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DeleteBlueprintButton({ blueprintId }: { blueprintId: string }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    startTransition(async () => {
      await deleteBlueprint(blueprintId);
      router.refresh();
    });
  };

  return (
    <>
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
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
            <div className="font-bold text-lg mb-4 text-center">Delete Blueprint?</div>
            <div className="mb-6 text-center text-sm">Are you sure you want to delete this blueprint? This action cannot be undone.</div>
            <div className="flex gap-4 w-full justify-center">
              <button
                className="px-4 py-2 rounded border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
                onClick={() => setShowModal(false)}
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded border border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
                onClick={confirmDelete}
                disabled={isPending}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 