import { cn } from "@/lib/utils";

/**
 * @param {{ columns: { key: string, label: string, className?: string }[], data: Record<string, unknown>[], renderCell?: (key: string, row: Record<string, unknown>) => React.ReactNode, emptyMessage?: string, className?: string }} props
 */
export default function DataTable({
  columns,
  data,
  renderCell,
  emptyMessage = "No data found",
  className,
}) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">{emptyMessage}</p>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border/50", className)}>
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border/50 bg-surface-light/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className="bg-surface/40 transition-colors hover:bg-surface-light/40"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("px-4 py-3 text-white", col.className)}>
                  {renderCell
                    ? renderCell(col.key, row)
                    : String(row[col.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
