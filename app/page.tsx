"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { ProgressPanel } from "@/components/ProgressPanel";
import { ResultsPanel } from "@/components/ResultsPanel";
import { useMockAgentRun } from "@/hooks/useMockAgentRun";

const TABS = [
  { id: "chat", label: "Place your order" },
  { id: "progress", label: "Kitchen" },
  { id: "results", label: "Ready to Serve" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Home() {
  const { messages, tickets, results, phase, sendMessage } = useMockAgentRun();
  const [activeTab, setActiveTab] = useState<TabId>("chat");

  return (
    <main className="flex h-dvh flex-col bg-charcoal text-paper-bright">
      <header className="flex shrink-0 items-center justify-between border-b border-paper-bright/10 px-5 py-3.5">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-xl italic tracking-tight text-paper-bright">
            Prompt the Party
          </span>
          <span className="hidden font-mono text-xs text-paper-bright/40 sm:inline">
            Caterers sourcing · Sat Oct 4
          </span>
        </div>
        <span className="font-mono text-xs text-paper-bright/40">
          {phase === "idle" && "waiting on a brief"}
          {phase === "running" && "run in progress"}
          {phase === "done" && "run complete"}
        </span>
      </header>

      <div className="min-h-0 flex-1 md:grid md:grid-cols-[9.5rem_minmax(0,1fr)]">
        <nav
          className="order-2 flex shrink-0 border-t border-paper-bright/10 md:order-1 md:flex-col md:border-r md:border-t-0"
          aria-label="Passline sections"
        >
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
              className={`flex min-h-14 flex-1 items-center gap-2 border-b-2 px-3 text-left text-xs transition-colors md:flex-none md:border-b-0 md:border-l-2 md:px-4 ${
                activeTab === tab.id
                  ? "border-amber bg-charcoal-light/60 text-paper-bright"
                  : "border-transparent text-paper-bright/40 hover:bg-charcoal-light/30 hover:text-paper-bright/75"
              }`}
            >
              <span className="font-mono text-[10px] text-paper-bright/30">0{index + 1}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="order-1 min-h-0 md:order-2">
          {activeTab === "chat" ? (
            <ChatPanel messages={messages} phase={phase} onSend={sendMessage} />
          ) : (
            <div className="grid h-full min-h-0 md:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]">
              <div className="min-h-0 border-b border-paper-bright/10 md:border-b-0 md:border-r">
                <ChatPanel messages={messages} phase={phase} onSend={sendMessage} />
              </div>
              <div className="min-h-0 bg-charcoal-light/40">
                {activeTab === "progress" ? (
                  <ProgressPanel tickets={tickets} phase={phase} />
                ) : (
                  <ResultsPanel results={results} phase={phase} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
