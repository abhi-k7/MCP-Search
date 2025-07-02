'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./button";

export default function Sidebar({ authUser }: { authUser: any }) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isLikedFilter = searchParams.get('liked') === 'true';

    // Determine which view is active
    const isAllServersActive = pathname === '/search' && !isLikedFilter;
    const isLikedServersActive = pathname === '/search' && isLikedFilter;
    const isAiSearchActive = pathname === '/aisearch';
    const isBlueprintsActive = pathname === '/blueprints' || pathname === '/blueprints/create';
    const isBuildMCPActive = pathname === '/buildmcp';

    if (!authUser) return <UnAuthenticatedSidebar />;
    
    return (
        <div className="fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] p-4 border-r border-border/40 transition-all duration-300">
            <Card className="h-full shadow-md">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-medium text-center">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-3">
                        <Button 
                          onClick={() => router.push('/search')}
                          className={`w-full py-2.5 cursor-pointer`}
                          variant={isAllServersActive ? 'default' : 'ghost'}
                        >
                            All Servers
                        </Button>
                        <Button
                          onClick={() => router.push('/search?liked=true')}
                          className={`w-full py-2.5 cursor-pointer`}
                          variant={isLikedServersActive ? 'default' : 'ghost'}
                        >
                          Liked Servers
                        </Button>
                        <Button
                          onClick={() => router.push('/aisearch')}
                          className={`w-full py-2.5 cursor-pointer`}
                          variant={isAiSearchActive ? 'default' : 'ghost'}
                        >
                          Search with AI
                        </Button>
                        <Button
                          onClick={() => router.push('/blueprints')}
                          className={`w-full py-2.5 cursor-pointer`}
                          variant={isBlueprintsActive ? 'default' : 'ghost'}
                        >
                          Build a Blueprint
                        </Button>
                        <Button
                          onClick={() => router.push('/buildmcp')}
                          className={`w-full py-2.5 cursor-pointer`}
                          variant={isBuildMCPActive ? 'default' : 'ghost'}
                        >
                          Build an MCP server
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const UnAuthenticatedSidebar = () => (
    <div className="fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] p-4 border-r border-border/40 transition-all duration-300">
        <Card className="h-full shadow-md">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-medium">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Access powerful search features and save your preferences
                </p>
                <div className="flex flex-col gap-3">
                    <SignInButton mode="modal">
                        <Button className="w-full py-2.5" variant="default">
                            Login
                        </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button className="w-full py-2.5" variant="outline">
                            Create Account
                        </Button>
                    </SignUpButton>
                </div>
            </CardContent>
        </Card>
    </div>
);