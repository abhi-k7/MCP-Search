import { Button } from "@/components/ui/button";
import { getCategories, getMCPServers } from "@/actions/server.actions";
import { getLikedMCPServers } from "@/actions/liked.actions";
import { SearchControls } from "@/components/ui/SearchControls";
import { LikeButton } from "@/components/ui/LikeButton";
import Link from "next/link";

interface ServerWithLikes {
  id: string;
  name: string;
  category: string;
  description: string;
  documentation: string;
  logoUrl: string | null;
  githubUrl: string | null;
  isRemote: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  likes: { userId: string }[];
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ query?: string; category?: string; liked?: string }>;
}) {
  const { query = "", category = "", liked = "" } = await searchParams;
  const isLiked = liked === 'true';

  let servers: ServerWithLikes[];
  if (isLiked) {
    const result = await getLikedMCPServers({ query, category });
    servers = result.servers as ServerWithLikes[];
  } else {
    const result = await getMCPServers({ query, category });
    servers = result.servers as ServerWithLikes[];
  }
    
  const { categories } = await getCategories();

  let noResultsMessage = "No servers found.";
  if (isLiked) {
    noResultsMessage = "You haven't liked any servers yet.";
  } else if (query && category) {
    noResultsMessage = `No servers found for "${query}" in the "${category}" category.`;
  } else if (query) {
    noResultsMessage = `No servers found for "${query}".`;
  } else if (category) {
    noResultsMessage = `No servers found in the "${category}" category.`;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
      {/* Search Header */}
      <div className="max-w-6xl mx-auto text-center mb-8 pt-8">
        <h1 className="text-6xl font-extrabold text-center gradient-text mb-4">
          Search MCP Servers
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Find the perfect server for your needs
        </p>

        <SearchControls categories={categories} />

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servers.length > 0 ? (
            servers.map((server) => (
              <div
                key={server.id}
                className="relative bg-card rounded-xl p-8 border border-white/70 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <LikeButton serverId={server.id} isLiked={server.likes.length > 0} />
                {/* Header Row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center overflow-hidden">
                    <img 
                      src={server.logoUrl || '/globe.svg'} 
                      alt={`${server.name} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-xl">{server.name}</h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                  {server.description}
                </p>

                {/* Action Button */}
                <Link
                  href={server.githubUrl || server.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button variant="outline" className="w-full cursor-pointer border-white/70">
                    View Details
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                {noResultsMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 