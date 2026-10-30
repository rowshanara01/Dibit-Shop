import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/20 hover:shadow-accent/40",
  secondary:
    "bg-surface-light border border-border hover:border-accent/50 text-white",
  ghost: "hover:bg-surface-light text-muted hover:text-white",
  outline:
    "border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
