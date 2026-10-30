"use client";

import { useMemo, useState } from "react";
import OrderCard from "@/components/orders/OrderCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { ORDER_STATUSES } from "@/data/shop";

const statusFilters = [
  { label: "All", value: "all" },
  ...ORDER_STATUSES.map((s) => ({ label: s, value: s })),
];

export default function OrdersPage() {
  const { orders, hydrated } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.items.some((i) =>
          i.name.toLowerCase().includes(search.toLowerCase())
        );
      const matchesStatus = status === "all" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  if (!hydrated) {
    return (
      <div className="section-container py-12 space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="section-title">My Orders</h1>
        <p className="section-subtitle">Track and manage your purchases</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          placeholder="Search by order ID or item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lg:max-w-md"
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
          icon="📦"
          title="No orders found"
          description={
            orders.length === 0
              ? "You haven't placed any orders yet."
              : "Try adjusting your search or filter."
          }
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
