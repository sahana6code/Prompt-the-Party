"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage, ProgressTicket, RunPhase, VendorResult } from "@/lib/types";
import { ASSISTANT_REPLY, PROGRESS_SCRIPT, VENDOR_RESULTS } from "@/lib/mockScript";

const WORD_INTERVAL_MS = 45;
const TICKET_INTERVAL_MS = 900;
const RESULT_STAGGER_MS = 550;

let idCounter = 0;
const nextId = (prefix: string) => `${prefix}-${Date.now()}-${idCounter++}`;

const currentTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/**
 * Drives the whole demo end to end with nothing but local state and
 * setTimeout. Swap the body of `runDemo` for a real fetch/stream call
 * later; the component tree doesn't need to know the difference.
 */
export function useMockAgentRun() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextId("m"),
      role: "assistant",
      content:
        "Tell us what you're sourcing — headcount, dietary requirements, date and anything non-negotiable — we'll get on it right away.",
    },
  ]);
  const [tickets, setTickets] = useState<ProgressTicket[]>([]);
  const [results, setResults] = useState<VendorResult[]>([]);
  const [phase, setPhase] = useState<RunPhase>("idle");

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const runDemo = useCallback(() => {
    clearTimers();
    setPhase("running");
    setResults([]);
    setTickets(
      PROGRESS_SCRIPT.map((t, i) => ({ ...t, status: i === 0 ? "active" : "pending" }))
    );

    const assistantId = nextId("m");
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", streaming: true },
    ]);

    const words = ASSISTANT_REPLY.split(" ");
    words.forEach((_, i) => {
      const t = setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: words.slice(0, i + 1).join(" "),
                  streaming: i < words.length - 1,
                }
              : m
          )
        );
      }, i * WORD_INTERVAL_MS);
      timers.current.push(t);
    });

    // Tickets march forward one at a time, each becoming "active" in turn.
    PROGRESS_SCRIPT.forEach((_, i) => {
      const t = setTimeout(() => {
        setTickets((prev) =>
          prev.map((ticket, idx) => {
            if (idx < i) return { ...ticket, status: "done" as const };
            if (idx === i) return { ...ticket, status: "active" as const, timestamp: currentTime() };
            return ticket;
          })
        );
      }, 700 + i * TICKET_INTERVAL_MS);
      timers.current.push(t);
    });

    const lastTicketDoneAt = 700 + PROGRESS_SCRIPT.length * TICKET_INTERVAL_MS;
    const finalTicketsTimer = setTimeout(() => {
      setTickets((prev) => prev.map((ticket) => ({ ...ticket, status: "done" as const })));
    }, lastTicketDoneAt);
    timers.current.push(finalTicketsTimer);

    // Results plate one at a time once the pass clears.
    VENDOR_RESULTS.forEach((vendor, i) => {
      const t = setTimeout(() => {
        setResults((prev) => [...prev, vendor]);
      }, lastTicketDoneAt + 400 + i * RESULT_STAGGER_MS);
      timers.current.push(t);
    });

    const donePhaseTimer = setTimeout(() => {
      setPhase("done");
    }, lastTicketDoneAt + 400 + VENDOR_RESULTS.length * RESULT_STAGGER_MS + 300);
    timers.current.push(donePhaseTimer);
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || phase === "running") return;
      setMessages((prev) => [...prev, { id: nextId("m"), role: "user", content: trimmed }]);
      runDemo();
    },
    [phase, runDemo]
  );

  return { messages, tickets, results, phase, sendMessage };
}
