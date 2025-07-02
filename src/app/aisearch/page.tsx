"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Sparkles } from "lucide-react";

export default function AiSearchPage() {
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
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResponse(data.recommendations);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
      hide();
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 mt-10 pt-20 pb-16">
      <h1 className="text-6xl font-extrabold text-center gradient-text mb-4">AI MCP Server Search</h1>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <textarea
          className="w-full border rounded px-4 py-3 text-lg min-h-[100px] resize-vertical"
          placeholder="Describe your application..."
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
          {isSubmitting ? "Searching..." : "Find Relevant MCP Servers"}
        </Button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {response && (
        <div className="w-full max-w-3xl mt-8 bg-background border border-primary rounded-xl shadow-lg p-8 text-base whitespace-pre-line transition-all duration-300 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 gradient-text" />
            <h2 className="text-xl font-semibold gradient-text">AI Recommendations</h2>
          </div>
          <hr className="my-2 border-white/20" />
          <div className="font-mono text-white">{response}</div>
        </div>
      )}
    </div>
  );
} 