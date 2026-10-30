import Badge from "@/components/ui/Badge";
import { STATUS_VARIANTS } from "@/data/shop";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status, className }) {
  const variant = STATUS_VARIANTS[status] || "muted";
  return (
    <Badge variant={variant} className={cn("whitespace-nowrap", className)}>
      {status}
    </Badge>
  );
}
