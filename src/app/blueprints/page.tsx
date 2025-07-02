import { getUserBlueprints } from "@/actions/blueprint.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteBlueprintButton from "@/components/ui/DeleteBlueprintButton";
import PublishUnpublishBlueprintButton from "@/components/ui/PublishUnpublishBlueprintButton";

interface McpServer {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  category: string;
  description: string;
  documentation: string;
  logoUrl: string | null;
  githubUrl: string | null;
  isRemote: boolean;
}

interface Blueprint {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  mcpServers: McpServer[];
}

export default async function MyBlueprintsPage() {
  const { blueprints } = await getUserBlueprints();

  return (
    <div className="max-w-3xl mx-auto py-12 mt-20">
      <h1 className="text-6xl font-extrabold text-center gradient-text mb-4">My Blueprints</h1>
      <div className="flex justify-center mb-10">
        <Link href="/blueprints/create">
          <Button variant="default" className="flex items-center gap-2 text-xl px-8 py-5">
            <img src="/window.svg" alt="Blueprint Logo" className="w-6 h-6" />
            Create New Blueprint
          </Button>
        </Link>
      </div>
      {blueprints.length === 0 ? (
        <div className="text-muted-foreground text-center py-12">You haven't created any blueprints yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blueprints.map((bp: Blueprint) => (
            <div
              key={bp.id}
              className="relative bg-card rounded-xl p-6 h-[300px] w-[90%] mx-auto border border-white/70 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Header Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center overflow-hidden">
                  <img src="/window.svg" alt="Blueprint logo" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="font-semibold text-xl">{bp.title}</h3>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                {bp.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-xs text-muted-foreground">{bp.mcpServers.length} servers</div>
                <div className="flex items-center gap-2">
                  <PublishUnpublishBlueprintButton blueprintId={bp.id} isPublic={bp.isPublic} />
                  <DeleteBlueprintButton blueprintId={bp.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 