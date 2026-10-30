"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import MiniChart from "@/components/ui/MiniChart";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FilterBar from "@/components/ui/FilterBar";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";
import { mockEarningsChart } from "@/data/seller";
import { cn } from "@/lib/utils";

const DATE_FILTERS = [
  { label: "All Time", value: "all" },
  { label: "This Month", value: "month" },
  { label: "Last 30 Days", value: "30d" },
];

export default function SellerEarningsPage() {
  const { sellerEarnings, earningTransactions, hydrated } = useShop();
  const [dateFilter, setDateFilter] = useState("all");

  const filteredTx = useMemo(() => {
    if (dateFilter === "all") return earningTransactions;
    const now = new Date();
    const cutoff = dateFilter === "month"
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : new Date(now.getTime() - 30 * 86400000);
    return earningTransactions.filter((t) => new Date(t.date) >= cutoff);
  }, [earningTransactions, dateFilter]);

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Earnings</h1>
          <p className="section-subtitle">Revenue and transaction history</p>
        </div>
        <Link href="/seller/withdrawals">
          <Button variant="outline">Withdraw Funds</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard label="Total Revenue" value={formatPrice(sellerEarnings.totalRevenue)} icon="💵" />
        <StatCard label="Available" value={formatPrice(sellerEarnings.availableBalance)} icon="✅" href="/seller/withdrawals" />
        <StatCard label="Pending" value={formatPrice(sellerEarnings.pendingBalance)} icon="⏳" />
        <StatCard label="Platform Fees" value={formatPrice(sellerEarnings.platformFees)} icon="📊" />
      </div>

      <div className="glass-card mb-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-white">Earnings Chart</h2>
          <span className="text-xs text-muted">Last 6 months (mock)</span>
        </div>
        <MiniChart data={mockEarningsChart} />
        <p className="mt-4 text-xs text-muted">
          Commission rate: {(sellerEarnings.commissionRate * 100).toFixed(0)}% · Total sales: {sellerEarnings.totalSales.toLocaleString()}
        </p>
      </div>

      <section>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-white">Recent Transactions</h2>
          <FilterBar filters={DATE_FILTERS} activeFilter={dateFilter} onFilterChange={setDateFilter} />
        </div>
        <div className="space-y-3">
          {filteredTx.map((tx) => (
            <div key={tx.id} className="glass-card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-medium text-white">{tx.label}</p>
                <p className="text-xs text-muted">{new Date(tx.date).toLocaleString()}</p>
              </div>
              <span className={cn("font-semibold", tx.type === "credit" ? "text-green-400" : "text-red-400")}>
                {tx.type === "credit" ? "+" : "-"}{formatPrice(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
