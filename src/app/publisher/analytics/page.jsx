"use client";

import { useMemo, useState } from "react";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import FilterBar from "@/components/ui/FilterBar";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";
import { mockPublisherChart } from "@/data/publisher";

const DATE_FILTERS = [
  { label: "All Time", value: "all" },
  { label: "This Month", value: "month" },
  { label: "Last 30 Days", value: "30d" },
];

export default function PublisherAnalyticsPage() {
  const { publisherOrders, publisherProducts, publisherGames, publisherRevenue, hydrated } = useShop();
  const [dateFilter, setDateFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    if (dateFilter === "all") return publisherOrders;
    const now = new Date();
    const cutoff = dateFilter === "month"
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : new Date(now.getTime() - 30 * 86400000);
    return publisherOrders.filter((o) => new Date(o.date) >= cutoff);
  }, [publisherOrders, dateFilter]);

  const units = publisherProducts.reduce((s, p) => s + p.sales, 0);
  const topProducts = [...publisherProducts].sort((a, b) => b.sales - a.sales).slice(0, 4);
  const topGames = [...publisherGames].sort((a, b) => b.packageCount - a.packageCount);

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Analytics</h1>
          <p className="section-subtitle">Mock catalog performance</p>
        </div>
        <FilterBar filters={DATE_FILTERS} activeFilter={dateFilter} onFilterChange={setDateFilter} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard label="Revenue" value={formatPrice(publisherRevenue.totalRevenue)} icon="💵" />
        <StatCard label="Orders" value={filteredOrders.length} icon="🛒" />
        <StatCard label="Units sold" value={units.toLocaleString()} icon="📦" />
        <StatCard label="Pending payout" value={formatPrice(publisherRevenue.pendingPayout)} icon="⏳" />
      </div>

      <ChartCard title="Revenue trend" subtitle="6 mock data points" data={mockPublisherChart} className="mb-8" />

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="glass-card p-6">
          <h2 className="mb-4 font-semibold">Top games</h2>
          <ul className="space-y-3">
            {topGames.map((g) => (
              <li key={g.id} className="flex justify-between text-sm">
                <span>{g.name}</span>
                <span className="text-muted">{g.packageCount} packages</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="glass-card p-6">
          <h2 className="mb-4 font-semibold">Top products</h2>
          <ul className="space-y-3">
            {topProducts.map((p) => (
              <li key={p.id} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="text-muted">{p.sales} units</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
