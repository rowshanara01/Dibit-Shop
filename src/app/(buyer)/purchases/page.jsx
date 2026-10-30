"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import StatusBadge from "@/components/orders/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Completed", value: "Completed" },
  { label: "Processing", value: "Processing" },
  { label: "Delivered", value: "Delivered" },
  { label: "Refunded", value: "Refunded" },
];

export default function PurchasesPage() {
  const { purchases, hydrated } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return purchases.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.orderId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [purchases, search, status]);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Purchases</h1>
        <p className="section-subtitle">Your digital products and accounts</p>
      </div>

      <div className="mb-6">
        <SearchBar
          placeholder="Search purchases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <FilterBar
        filters={statusFilters}
        activeFilter={status}
        onFilterChange={setStatus}
        className="mb-8"
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="🎮"
          title="No purchases found"
          description="Your purchased items will appear here."
          action={
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((purchase) => (
            <div
              key={purchase.id}
              className="glass-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={purchase.image}
                    alt={purchase.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{purchase.name}</p>
                  <p className="text-xs text-muted">
                    {purchase.itemType} · {purchase.orderId}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(purchase.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={purchase.status} />
                <Link href={`/orders/${purchase.orderId}`}>
                  <Button variant="outline" size="sm">
                    View Order
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
