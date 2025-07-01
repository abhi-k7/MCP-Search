import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

async function Navbar() {
    const user = await currentUser();

    return (
        <nav className="fixed top-0 w-full h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="h-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary hover:text-primary/90 font-mono tracking-wider transition-colors duration-200"
                        >
                            MCP Search
                        </Link>
                        <div className="hidden sm:flex items-center gap-6">
                            <Link 
                                href="/about" 
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                            >
                                About
                            </Link>
                            {/* Add more navigation links as needed */}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {user && <UserButton afterSignOutUrl="/" />}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
