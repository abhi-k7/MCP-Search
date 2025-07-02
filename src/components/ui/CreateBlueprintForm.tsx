"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBlueprint } from "@/actions/blueprint.actions";
import Image from "next/image";
import { McpServer } from "@prisma/client";
import { X } from "lucide-react";
import { useLoadingOverlay } from "@/components/ui/LoadingOverlay";

export default function CreateBlueprintForm({ servers }: { servers: McpServer[] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { show, hide } = useLoadingOverlay();

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    show();
    setError(null);
    try {
      await createBlueprint({ title, description, serverIds: selected });
      router.push("/blueprints");
    } catch (err: any) {
      setError(err.message || "Failed to create blueprint");
    } finally {
      setIsSubmitting(false);
      hide();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => router.push("/blueprints")}
        className="absolute -top-12 right-0 mt-2 mr-2 p-2 rounded-full hover:bg-muted transition-colors z-20"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block font-medium mb-2">Title *</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Blueprint title"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>
        <div>
          <label className="block font-medium mb-4">Select MCP Servers</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servers.map((server) => (
              <Card
                key={server.id}
                className={`relative cursor-pointer border-2 transition-all ${selected.includes(server.id) ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
                onClick={() => handleToggle(server.id)}
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="w-10 h-10 bg-muted/30 border border-border/50 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image src={server.logoUrl || "/globe.svg"} alt={server.name} width={32} height={32} />
                  </div>
                  <CardTitle className="text-lg font-semibold">{server.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">{server.category}</div>
                  <div className="text-xs text-muted-foreground">{server.description}</div>
                  <input
                    type="checkbox"
                    checked={selected.includes(server.id)}
                    onChange={() => handleToggle(server.id)}
                    className="absolute top-4 right-4 scale-125 accent-primary"
                    tabIndex={-1}
                    aria-label="Select server"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button
          type="submit"
          disabled={!title || selected.length === 0 || isSubmitting}
          className={`w-full py-3 text-lg font-semibold transition-colors ${isSubmitting ? 'cursor-wait' : ''}`}
          variant={isSubmitting ? 'ghost' : 'default'}
        >
          {isSubmitting ? "Creating..." : "Create Blueprint"}
        </Button>
      </form>
    </div>
  );
} 