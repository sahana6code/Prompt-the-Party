# Passline — chat UI scaffold

Zero AWS, zero backend. Every "response" in this build is a scripted local
timeline — no network calls are made. It exists to prove out the UI flow
before any real agent, queue, or vendor API is wired in.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3000, type anything in the composer (or tap one of
the suggested prompts) and hit Send. That triggers the whole scripted run:
the assistant message streams in word by word, the progress rail ("the
pass") lights up ticket by ticket, and three vendor cards ("plated") land
once the rail finishes.

## Where things live

- `app/page.tsx` — layout: three panels on desktop, tabbed on mobile.
- `hooks/useMockAgentRun.ts` — **all** the fake state machine. This is the
  one file you'd rewrite to call a real backend: replace `runDemo()` with a
  fetch/stream call that pushes the same shapes (`ChatMessage`,
  `ProgressTicket`, `VendorResult`) into the same setters.
- `lib/mockScript.ts` — the actual scripted copy (assistant reply text,
  progress strings, vendor data). Edit this to try different scenarios
  without touching any component.
- `lib/types.ts` — the shared shapes every component and the hook agree on.
- `components/ChatPanel.tsx` + `StreamingBubble.tsx` — message list,
  composer, and the per-message bubble/streaming-cursor treatment.
- `components/ProgressPanel.tsx` — the ticket rail.
- `components/ResultsPanel.tsx` — the vendor result cards.

## Swapping in a real backend later

Nothing in `components/` or `app/page.tsx` needs to change. The contract is
just: something calls `sendMessage`, and somewhere upstream you now call
`setMessages` / `setTickets` / `setResults` in response to real events
(SSE chunks, polling, websockets, whatever) instead of `setTimeout`. Keep
the same `ChatMessage` / `ProgressTicket` / `VendorResult` shapes and every
component below the hook keeps working unmodified.
