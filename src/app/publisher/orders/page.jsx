"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/orders/StatusBadge";
import StatusTimeline from "@/components/orders/StatusTimeline";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Payment Confirmed", value: "Payment Confirmed" },
  { label: "Processing", value: "Processing" },
  { label: "Ready for Delivery", value: "Ready for Delivery" },
  { label: "Delivered", value: "Delivered" },
];

function OrdersContent() {
  const searchParams = useSearchParams();
  const { publisherOrders, hydrated } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [detailId, setDetailId] = useState(searchParams.get("order"));

  const filtered = useMemo(() => {
    return publisherOrders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.productName.toLowerCase().includes(search.toLowerCase()) ||
        o.buyer.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || o.status === status;
      return matchSearch && matchStatus;
    });
  }, [publisherOrders, search, status]);

  const detail = publisherOrders.find((o) => o.id === detailId);

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Orders</h1>
        <p className="section-subtitle">{publisherOrders.length} publisher orders</p>
      </div>

      <SearchBar placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-6 max-w-md" />
      <FilterBar filters={statusFilters} activeFilter={status} onFilterChange={setStatus} className="mb-6" />

      {filtered.length === 0 ? (
        <EmptyState icon="🛒" title="No orders found" />
      ) : (
        <>
          <div className="hidden md:block">
            <DataTable
              columns={[
                { key: "id", label: "Order ID" },
                { key: "item", label: "Game / Product" },
                { key: "buyer", label: "Buyer" },
                { key: "date", label: "Date" },
                { key: "amount", label: "Amount" },
                { key: "status", label: "Status" },
                { key: "actions", label: "", className: "text-right" },
              ]}
              data={filtered}
              renderCell={(key, row) => {
                if (key === "id") return <span className="font-mono text-xs text-accent-light">{row.id}</span>;
                if (key === "item") return (
                  <div>
                    <p className="font-medium">{row.productName}</p>
                    <p className="text-xs text-muted">{row.gameName}</p>
                  </div>
                );
                if (key === "buyer") return (
                  <div>
                    <p>{row.buyer.name}</p>
                    <p className="text-xs text-muted">{row.buyer.email}</p>
                  </div>
                );
                if (key === "date") return new Date(row.date).toLocaleDateString();
                if (key === "amount") return formatPrice(row.amount);
                if (key === "status") return <StatusBadge status={row.status} />;
                if (key === "actions") return <Button size="sm" variant="outline" onClick={() => setDetailId(row.id)}>View</Button>;
                return String(row[key] ?? "—");
              }}
            />
          </div>
          <div className="space-y-3 md:hidden">
            {filtered.map((o) => (
              <div key={o.id} className="glass-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-accent-light">{o.id}</p>
                    <p className="font-medium">{o.productName}</p>
                    <p className="text-xs text-muted">{o.gameName} · {o.buyer.name}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold">{formatPrice(o.amount)}</span>
                  <Button size="sm" variant="outline" onClick={() => setDetailId(o.id)}>View</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal open={!!detail} onClose={() => setDetailId(null)} title={detail?.id || "Order"} className="sm:max-w-lg">
        {detail && (
          <div>
            <dl className="space-y-2 text-sm mb-6">
              <div className="flex justify-between"><dt className="text-muted">Product</dt><dd>{detail.productName}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Game</dt><dd>{detail.gameName}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Buyer</dt><dd>{detail.buyer.name}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Amount</dt><dd className="text-accent-light font-semibold">{formatPrice(detail.amount)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Status</dt><dd><StatusBadge status={detail.status} /></dd></div>
            </dl>
            <h3 className="mb-3 text-sm font-semibold">Delivery timeline</h3>
            <StatusTimeline timeline={detail.timeline} />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function PublisherOrdersPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <OrdersContent />
    </Suspense>
  );
}
