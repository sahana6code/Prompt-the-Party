import { ChatMessage } from "@/lib/types";

export function StreamingBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-md rounded-br-sm bg-paper px-4 py-2.5 text-[15px] leading-snug text-charcoal-dark">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <span
        aria-hidden
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-light"
      />
      <p className="max-w-[85%] text-[15px] leading-relaxed text-paper-bright/90">
        {message.content}
        {message.streaming && (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-blink bg-amber"
          />
        )}
        {message.streaming && <span className="sr-only"> Still typing…</span>}
      </p>
    </div>
  );
}
