"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLoadingOverlay } from "@/components/ui/LoadingOverlay";
import Link from "next/link";

export default function BuildMCPPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show, hide } = useLoadingOverlay();

  async function handleSend() {
    if (!input.trim()) return;
    setIsSubmitting(true);
    show();
    setError("");
    setResponse("");
    try {
      const res = await fetch("/api/ai-build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResponse(data.buildOutline);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
      hide();
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 mt-10 pt-20 pb-16">
      <h1 className="text-6xl font-extrabold text-center gradient-text mb-4">MCP Server Outline Creator</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Enter a descirption for an MCP server that you want to build, and ideate with AI.        </p>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <textarea
          className="w-full border rounded px-4 py-3 text-lg min-h-[100px] resize-vertical"
          placeholder="Describe the MCP server that you want to build"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <Button
          type="submit"
          className={`w-full px-6 py-3 rounded text-lg font-semibold disabled:opacity-50 cursor-pointer transition-colors ${isSubmitting ? 'cursor-wait' : ''}`}
          variant={isSubmitting ? 'ghost' : 'default'}
          disabled={!input.trim() || isSubmitting}
        >
          {isSubmitting ? "Building..." : "Build an outline"}
        </Button>
        <Link href="/createmcp" className="w-full">
          <Button
            type="button"
            className="w-full px-6 py-3 rounded text-lg font-semibold mt-2 border border-primary text-primary bg-background hover:bg-primary/10 transition-colors"
            variant="outline"
          >
            Get an MCP Server's code template
          </Button>
        </Link>
        <Link href="/apitomcp" className="w-full">
          <Button
            type="button"
            className="w-full px-6 py-3 rounded text-lg font-semibold mt-2 border border-primary text-primary bg-background hover:bg-primary/10 transition-colors"
            variant="outline"
          >
            Convert REST API to MCP Server
          </Button>
        </Link>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {response && (
        <div className="w-full max-w-3xl mt-8 bg-background border border-primary rounded-xl shadow-lg p-8 text-base whitespace-pre-line transition-all duration-300 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-xl font-semibold gradient-text">AI Recommendations</h2>
          </div>
          <hr className="my-2 border-white/20" />
          <div className="font-mono text-white">{response}</div>
        </div>
      )}
    </div>
  );
} 