import { ProgressTicket, RunPhase } from "@/lib/types";

const STATUS_GLYPH: Record<ProgressTicket["status"], string> = {
  pending: "○",
  active: "●",
  done: "✓",
};

const STATUS_COLOR: Record<ProgressTicket["status"], string> = {
  pending: "text-paper-bright/30",
  active: "text-amber",
  done: "text-teal-light",
};

function TicketRow({ ticket }: { ticket: ProgressTicket }) {
  return (
    <li
      className="ticket-perf animate-riseIn border-b border-paper-bright/10 py-3 pl-1 pt-4 first:pt-3"
    >
      <div className="flex items-baseline gap-2.5">
        <span className={`font-mono text-xs ${STATUS_COLOR[ticket.status]}`} aria-hidden>
          {STATUS_GLYPH[ticket.status]}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm leading-snug ${
              ticket.status === "pending" ? "text-paper-bright/40" : "text-paper-bright"
            }`}
          >
            {ticket.label}
          </p>
          {ticket.detail && ticket.status !== "pending" && (
            <p className="mt-0.5 font-mono text-xs leading-snug text-paper-bright/45">
              {ticket.detail}
            </p>
          )}
        </div>
        {ticket.timestamp && (
          <span className="shrink-0 font-mono text-[11px] text-paper-bright/35">
            {ticket.timestamp}
          </span>
        )}
      </div>
    </li>
  );
}

export function ProgressPanel({
  tickets,
  phase,
}: {
  tickets: ProgressTicket[];
  phase: RunPhase;
}) {
  return (
    <section className="flex h-full min-h-0 flex-col" aria-label="Kitchen">
      <header className="border-b border-paper-bright/10 px-5 py-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-paper-bright">Kitchen</h2>
          {phase === "running" && (
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
              live
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-paper-bright/50">Every step, timestamped as it happens.</p>
      </header>

      <div className="scroll-quiet flex-1 overflow-y-auto px-5">
        {tickets.length === 0 ? (
          <p className="pt-8 text-center text-sm text-paper-bright/30">
            Nothing on the rail yet — send a brief to start a run.
          </p>
        ) : (
          <ol>
            {tickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
