import { cn } from "@/lib/utils";

const variants = {
  default: "bg-accent/20 text-accent-light border-accent/30",
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  hot: "bg-red-500/20 text-red-400 border-red-500/30",
  muted: "bg-surface-light text-muted border-border",
};

export default function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
