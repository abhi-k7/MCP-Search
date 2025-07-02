import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Main content container with sidebar space consideration */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar space reservation */}
        <div className="w-[320px] lg:w-[380px] flex-shrink-0"></div>

        {/* Main content */}
        <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 -ml-14">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-6xl font-extrabold text-center gradient-text mb-4">Welcome to MCP Search</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">Your intelligent search companion</p>
            </div>

            <SignedIn>
              <div className="max-w-md mx-auto mb-16">
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/40">
                  <div className="text-center space-y-3">
                    <h2 className="text-xl font-semibold gradient-text">Ready to explore?</h2>
                    <Link href="/search" className="block">
                      <Button 
                        variant="default"
                        className="w-full py-4 text-base font-medium transition-all duration-200 hover:shadow-md"
                      >
                        Start Searching
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SignedIn>
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-muted-foreground">
            <p>Powered by official MCP servers</p>
          </div>
        </main>
      </div>
    </div>
  );
}
