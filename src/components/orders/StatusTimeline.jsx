import { cn } from "@/lib/utils";

export default function StatusTimeline({ timeline, className }) {
  return (
    <ol className={cn("relative space-y-0", className)}>
      {timeline.map((entry, i) => (
        <li key={entry.status} className="relative flex gap-4 pb-8 last:pb-0">
          {i < timeline.length - 1 && (
            <span
              className={cn(
                "absolute left-[11px] top-6 h-full w-0.5",
                entry.done ? "bg-accent/50" : "bg-border"
              )}
            />
          )}
          <span
            className={cn(
              "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs",
              entry.active
                ? "border-accent bg-accent/20 text-accent-light"
                : entry.done
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-surface text-muted"
            )}
          >
            {entry.done && !entry.active ? "✓" : i + 1}
          </span>
          <div className="pt-0.5">
            <p
              className={cn(
                "text-sm font-medium",
                entry.active || entry.done ? "text-white" : "text-muted"
              )}
            >
              {entry.status}
            </p>
            <p className="text-xs text-muted">
              {new Date(entry.date).toLocaleString()}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
