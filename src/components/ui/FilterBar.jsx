"use client";

import { cn } from "@/lib/utils";

export default function FilterBar({
  filters = [],
  activeFilter,
  onFilterChange,
  className,
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200",
            activeFilter === filter.value
              ? "border-accent bg-accent/20 text-accent-light"
              : "border-border bg-surface text-muted hover:border-accent/30 hover:text-white"
          )}
        >
          {filter.label}
          {filter.count !== undefined && (
            <span className="ml-1.5 text-xs opacity-70">({filter.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function SortSelect({ value, onChange, options, className }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        "rounded-lg border border-border bg-surface px-4 py-2 text-sm text-white focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30",
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
