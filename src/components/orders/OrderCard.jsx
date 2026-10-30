import Link from "next/link";
import StatusBadge from "@/components/orders/StatusBadge";
import { formatPrice } from "@/data/mock";

export default function OrderCard({ order }) {
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <Link
      href={`/orders/${order.id}`}
      className="glass-card block p-5 transition-all hover:border-accent/30 hover:neon-glow"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-sm font-medium text-accent-light">{order.id}</p>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-sm text-muted">
            {new Date(order.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="mt-2 text-sm text-muted">
            {itemCount} item{itemCount !== 1 ? "s" : ""} ·{" "}
            {order.items.map((i) => i.name).slice(0, 2).join(", ")}
            {order.items.length > 2 && "…"}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-display text-xl font-bold text-white">
            {formatPrice(order.total)}
          </p>
          <p className="mt-1 text-sm text-accent-light">View Details →</p>
        </div>
      </div>
    </Link>
  );
}
