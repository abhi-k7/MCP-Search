import { LoadingOverlayTestButton } from "@/components/ui/LoadingOverlay";
// ... existing code ...
export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-6xl font-extrabold text-center gradient-text mb-4">About</h1>
      <p className="mb-8">This is the about page for the MCP Search application.</p>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold gradient-text mb-4">FAQ</h2>
        <p className="mb-8 text-muted-foreground">Frequently Asked Questions about the Model Context Protocol (MCP)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1 */}
          <div className="bg-card border border-white/70 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <span className="font-bold text-base border border-primary rounded px-2 py-0.5 mr-2">1</span>
              <span className="font-bold text-base">What is the Model Context Protocol (MCP)?</span>
            </div>
            <p className="text-foreground">The Model Context Protocol (MCP) is an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools. Think of MCP like a USB-C port for AI applications: it provides a standardized way to connect AI models to different data sources and tools.</p>
          </div>
          {/* 2 */}
          <div className="bg-card border border-white/70 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <span className="font-bold text-base border border-primary rounded px-2 py-0.5 mr-2">2</span>
              <span className="font-bold text-base">What problem does MCP solve?</span>
            </div>
            <p className="text-foreground">MCP addresses the challenge of fragmented AI integrations and data silos. It makes it much easier for developers to integrate their AI systems with the context they need, without the headaches of siloed systems or duplicated integration effort.</p>
          </div>
          {/* 3 */}
          <div className="bg-card border border-white/70 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <span className="font-bold text-base border border-primary rounded px-2 py-0.5 mr-2">3</span>
              <span className="font-bold text-base">Who developed the Model Context Protocol?</span>
            </div>
            <p className="text-foreground">MCP was developed and open sourced by Anthropic in November 2024 as a new standard for connecting AI assistants to the systems where data resides.</p>
          </div>
          {/* 4 */}
          <div className="bg-card border border-white/70 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <span className="font-bold text-base border border-primary rounded px-2 py-0.5 mr-2">4</span>
              <span className="font-bold text-base">What are some use cases for MCP?</span>
            </div>
            <p className="text-foreground">MCP can be used for AI-powered IDEs, file system access, database connections, external tool integration, and enterprise data integration. It provides a standardized way for AI models to interact with files, databases, and external applications.</p>
          </div>
          {/* 5 */}
          <div className="bg-card border border-white/70 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <span className="font-bold text-base border border-primary rounded px-2 py-0.5 mr-2">5</span>
              <span className="font-bold text-base">Why is MCP important for AI development?</span>
            </div>
            <p className="text-foreground">MCP standardizes integration, improves AI responses by providing better context, reduces development overhead, and enables ecosystem growth by allowing the broader developer community to build compatible tools and services.</p>
          </div>
          {/* 6 */}
          <div className="bg-card border border-white/70 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <span className="font-bold text-base border border-primary rounded px-2 py-0.5 mr-2">6</span>
              <span className="font-bold text-base">What is the main advantage of using MCP over traditional integration methods?</span>
            </div>
            <p className="text-foreground">The main advantage is standardization and reusability. MCP provides a single protocol that works across different systems, eliminating the need for multiple custom integrations and creating a more interoperable AI ecosystem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// ... existing code ...