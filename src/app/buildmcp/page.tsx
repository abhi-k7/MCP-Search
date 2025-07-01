"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BuildMCPPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!input.trim()) return;
    setLoading(true);
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
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Build an outline for your MCP Server</h1>
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
          disabled={loading}
          required
        />
        <Button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded text-lg font-semibold disabled:opacity-50 cursor-pointer"
          disabled={loading || !input.trim()}
        >
          {loading ? "Searching..." : "Build an outline"}
        </Button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {response && (
        <div className="w-full max-w-3xl mt-8 bg-white border rounded shadow p-6 text-base whitespace-pre-line">
          <h2 className="text-xl font-semibold mb-3">AI Recommendations</h2>
          {response}
        </div>
      )}
    </div>
  );
} 