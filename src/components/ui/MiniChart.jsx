import { cn } from "@/lib/utils";

export default function MiniChart({ data, className }) {
  const max = Math.max(...data.map((d) => d.amount), 1);

  return (
    <div className={cn("flex items-end gap-2 h-40", className)}>
      {data.map((item) => (
        <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-accent-dark to-accent transition-all hover:from-accent to-accent-light"
              style={{ height: `${(item.amount / max) * 100}%`, minHeight: "4px" }}
              title={`$${item.amount}`}
            />
          </div>
          <span className="text-xs text-muted">{item.month}</span>
        </div>
      ))}
    </div>
  );
}
