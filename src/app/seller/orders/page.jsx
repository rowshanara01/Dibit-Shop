"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/orders/StatusBadge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";
import { ORDER_STATUSES } from "@/data/shop";

const statusFilters = [{ label: "All", value: "all" }, ...ORDER_STATUSES.slice(0, 6).map((s) => ({ label: s, value: s }))];

function SellerOrdersContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order");
  const { sellerOrders, hydrated, getSellerOrder } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [detailId, setDetailId] = useState(initialOrder);

  const filtered = useMemo(() => {
    return sellerOrders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.itemName.toLowerCase().includes(search.toLowerCase()) ||
        o.buyer.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || o.status === status;
      return matchSearch && matchStatus;
    });
  }, [sellerOrders, search, status]);

  const detail = detailId ? getSellerOrder(detailId) : null;

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Seller Orders</h1>
        <p className="section-subtitle">{sellerOrders.length} orders received</p>
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
                { key: "item", label: "Item" },
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
                    <p className="font-medium">{row.itemName}</p>
                    <p className="text-xs text-muted capitalize">{row.itemType}</p>
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
                if (key === "actions") return (
                  <Button size="sm" variant="outline" onClick={() => setDetailId(row.id)}>View</Button>
                );
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
                    <p className="font-medium text-white">{o.itemName}</p>
                    <p className="text-xs text-muted">{o.buyer.name}</p>
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

      <Modal open={!!detail} onClose={() => setDetailId(null)} title={`Order ${detail?.id}`} className="sm:max-w-lg">
        {detail && (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Item</dt><dd className="text-white">{detail.itemName}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Type</dt><dd className="capitalize text-white">{detail.itemType}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Buyer</dt><dd className="text-white">{detail.buyer.name}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Email</dt><dd className="text-white">{detail.buyer.email}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Amount</dt><dd className="font-semibold text-accent-light">{formatPrice(detail.amount)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Order Status</dt><dd><StatusBadge status={detail.status} /></dd></div>
            <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="text-white">{detail.deliveryStatus}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Date</dt><dd className="text-white">{new Date(detail.date).toLocaleString()}</dd></div>
          </dl>
        )}
      </Modal>
    </div>
  );
}

export default function SellerOrdersPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <SellerOrdersContent />
    </Suspense>
  );
}
