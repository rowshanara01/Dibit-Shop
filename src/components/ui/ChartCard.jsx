import MiniChart from "@/components/ui/MiniChart";
import { cn } from "@/lib/utils";

export default function ChartCard({ title, subtitle, data, className }) {
  return (
    <div className={cn("glass-card p-6", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-semibold text-white">{title}</h2>
        {subtitle && <span className="text-xs text-muted">{subtitle}</span>}
      </div>
      <MiniChart data={data} />
    </div>
  );
}
