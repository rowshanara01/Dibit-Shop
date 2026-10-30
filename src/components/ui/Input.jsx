import { cn } from "@/lib/utils";

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-muted">
          {label}
          {props.required && <span className="text-accent-light ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-1",
          error
            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
            : "border-border focus:border-accent/50 focus:ring-accent/30"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Select({ label, error, className, id, children, ...props }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1",
          error
            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
            : "border-border focus:border-accent/50 focus:ring-accent/30"
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
