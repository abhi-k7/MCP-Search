"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLoadingOverlay } from "@/components/ui/LoadingOverlay";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function APItoMCPPage() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show, hide } = useLoadingOverlay();

  async function handleSend() {
    if (!input.trim()) return;
    setIsSubmitting(true);
    show();
    setError("");
    setCode("");
    try {
      const res = await fetch("/api/api-to-mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restapi: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setCode(data.codeTemplate);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
      hide();
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 mt-10 pt-20 pb-16">
      <h1 className="text-6xl font-extrabold text-center gradient-text mb-4"> API to MCP Server</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Have an API? Turn it into an MCP Server. Only Typescript input/output currently
          supported.
        </p>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <textarea
          className="w-full border rounded px-4 py-3 text-lg min-h-[100px] resize-vertical"
          placeholder="Enter your REST API's Code"
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
          {isSubmitting ? "Building..." : "Generate MCP Server Code"}
        </Button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {code && (
        <div className="w-full max-w-3xl mt-8 border border-primary rounded-xl shadow-lg transition-all duration-300 animate-fade-in bg-background">
          <div className="flex items-center gap-2 mb-3 px-6 pt-6">
            <h2 className="text-xl font-semibold gradient-text">Generated MCP Server Code</h2>
          </div>
          <hr className="my-2 border-white/20 mx-6" />
          <div className="px-6 pb-6">
            <MonacoEditor
              height="500px"
              language="typescript"
              theme="vs-dark"
              value={code}
              onChange={(value: string | undefined) => setCode(value || "")}
              options={{
                fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 15,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineNumbers: 'on',
                automaticLayout: true,
                readOnly: false,
                scrollbar: { vertical: 'auto', horizontal: 'auto' },
                renderLineHighlight: 'all',
                renderWhitespace: 'all',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 