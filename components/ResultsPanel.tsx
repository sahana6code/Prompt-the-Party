import { FitLevel, RunPhase, VendorResult } from "@/lib/types";

const FIT_LABEL: Record<FitLevel, string> = {
  strong: "strong fit",
  good: "good fit",
  stretch: "stretch",
};

const FIT_BORDER: Record<FitLevel, string> = {
  strong: "border-l-teal",
  good: "border-l-amber",
  stretch: "border-l-rust",
};

const FIT_TEXT: Record<FitLevel, string> = {
  strong: "text-teal",
  good: "text-amber-dim",
  stretch: "text-rust",
};

function VendorCard({ vendor, index }: { vendor: VendorResult; index: number }) {
  return (
    <article
      className={`animate-riseIn border border-charcoal-dark/10 border-l-4 bg-paper-bright p-4 ${FIT_BORDER[vendor.fit]}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[17px] leading-tight text-charcoal-dark">{vendor.name}</h3>
        <span className={`shrink-0 font-mono text-[11px] ${FIT_TEXT[vendor.fit]}`}>
          {FIT_LABEL[vendor.fit]}
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-2 font-mono">
        <span className="text-lg text-charcoal-dark">{vendor.priceLabel}</span>
        {vendor.priceNote && (
          <span className="text-xs text-charcoal-dark/50">{vendor.priceNote}</span>
        )}
      </div>

      <dl className="mt-3 space-y-2 text-[13.5px] leading-snug">
        <div>
          <dt className="text-charcoal-dark/45">Customization</dt>
          <dd className="text-charcoal-dark/80">{vendor.customization}</dd>
        </div>
        <div>
          <dt className="text-charcoal-dark/45">Why it's on the list</dt>
          <dd className="text-charcoal-dark/80">{vendor.reasoning}</dd>
        </div>
      </dl>
    </article>
  );
}

export function ResultsPanel({
  results,
  phase,
}: {
  results: VendorResult[];
  phase: RunPhase;
}) {
  return (
    <section className="flex h-full min-h-0 flex-col" aria-label="Ready to Serve">
      <header className="border-b border-paper-bright/10 px-5 py-4">
        <h2 className="font-display text-lg text-paper-bright">Ready to Serve</h2>
        <p className="mt-0.5 text-sm text-paper-bright/50">
          {results.length > 0
            ? `${results.length} vendor${results.length === 1 ? "" : "s"} worth a call.`
            : "Results land here once the pass clears."}
        </p>
      </header>

      <div className="scroll-quiet flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {results.length === 0 ? (
          <p className="pt-8 text-center text-sm text-paper-bright/30">
            {phase === "running" ? "Still comparing quotes…" : "No results yet."}
          </p>
        ) : (
          results.map((vendor, i) => <VendorCard key={vendor.id} vendor={vendor} index={i} />)
        )}
      </div>
    </section>
  );
}
