"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatMessage, RunPhase } from "@/lib/types";
import { StreamingBubble } from "./StreamingBubble";

const PROMPTS = [
  "60-person plated dinner, Fremont, Oct 4",
  "Vegetarian option required",
  "Need a bar package included",
];

export function ChatPanel({
  messages,
  phase,
  onSend,
}: {
  messages: ChatMessage[];
  phase: RunPhase;
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || phase === "running") return;
    onSend(draft);
    setDraft("");
  };

  return (
    <section className="flex h-full min-h-0 flex-col" aria-label="Place your order">
      <header className="border-b border-paper-bright/10 px-5 py-4">
        <h2 className="font-display text-lg text-paper-bright">Place your order</h2>
        <p className="mt-0.5 text-sm text-paper-bright/50">
          Say what you need — We will take it from there.
        </p>
      </header>

      <div ref={listRef} className="scroll-quiet flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((message) => (
          <StreamingBubble key={message.id} message={message} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-paper-bright/10 p-4">
        {messages.length <= 1 && (
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setDraft(p)}
                className="rounded-sm border border-paper-bright/15 px-2.5 py-1 text-xs text-paper-bright/60 transition-colors hover:border-amber/40 hover:text-paper-bright"
              >
                {p}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={
              phase === "running" ? "Passline is working the pass…" : "Describe what you're sourcing…"
            }
            rows={1}
            disabled={phase === "running"}
            className="min-h-[42px] flex-1 resize-none rounded-sm border border-paper-bright/15 bg-charcoal-light px-3 py-2.5 text-[15px] text-paper-bright placeholder:text-paper-bright/35 focus:border-amber/50 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={phase === "running" || !draft.trim()}
            className="h-[42px] shrink-0 rounded-sm bg-amber px-4 text-sm font-medium text-charcoal-dark transition-colors hover:bg-amber-dim disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
