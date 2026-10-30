export default function LoadingGrid({ count = 6, columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }) {
  return (
    <div className={`grid gap-4 sm:gap-6 ${columns}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-surface-light" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 rounded bg-surface-light" />
            <div className="h-3 w-1/2 rounded bg-surface-light" />
            <div className="h-5 w-1/3 rounded bg-surface-light" />
          </div>
        </div>
      ))}
    </div>
  );
}
