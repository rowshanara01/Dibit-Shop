"use client";

import { cn } from "@/lib/utils";

export default function SearchBar({
  placeholder = "Search games, products...",
  value,
  onChange,
  className,
  size = "md",
}) {
  const sizes = {
    sm: "py-2 text-sm",
    md: "py-2.5",
    lg: "py-3 text-base",
  };

  return (
    <div className={cn("relative", className)}>
      <svg
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-white placeholder:text-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors",
          sizes[size]
        )}
      />
    </div>
  );
}
