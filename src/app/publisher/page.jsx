"use client";

import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import StatusBadge from "@/components/orders/StatusBadge";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";
import { mockPublisherChart } from "@/data/publisher";

export default function PublisherDashboardPage() {
  const {
    publisherProfile,
    publisherGames,
    publisherProducts,
    publisherOrders,
    publisherRevenue,
    hydrated,
  } = useShop();

  const recent = publisherOrders.slice(0, 4);
  const topProducts = [...publisherProducts].sort((a, b) => b.sales - a.sales).slice(0, 3);
  const topGames = [...publisherGames].sort((a, b) => b.packageCount - a.packageCount).slice(0, 3);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="section-title">{publisherProfile.name}</h1>
          <p className="section-subtitle">Publisher dashboard</p>
        </div>
        <Badge variant="success">{publisherProfile.verificationStatus}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard label="Games" value={publisherGames.length} icon="🎮" href="/publisher/games" />
        <StatCard label="Products" value={publisherProducts.length} icon="📦" href="/publisher/products" />
        <StatCard label="Orders" value={publisherOrders.length} icon="🛒" href="/publisher/orders" />
        <StatCard label="Revenue" value={formatPrice(publisherRevenue.totalRevenue)} icon="💵" href="/publisher/analytics" />
      </div>

      <div className="glass-card mb-8 flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">Pending payout (mock)</p>
          <p className="font-display text-2xl font-bold text-accent-light">{formatPrice(publisherRevenue.pendingPayout)}</p>
        </div>
        <p className="text-xs text-muted">Demo balance — no real settlement</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/publisher/games"><Button>Add Game</Button></Link>
        <Link href="/publisher/products"><Button variant="secondary">Add Product</Button></Link>
        <Link href="/publisher/api"><Button variant="outline">API Keys</Button></Link>
        <Link href="/publisher/webhooks"><Button variant="ghost">Webhooks</Button></Link>
      </div>

      <ChartCard title="Revenue / sales" subtitle="Last 6 months (mock)" data={mockPublisherChart} className="mb-8" />

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent orders</h2>
            <Link href="/publisher/orders" className="text-sm text-accent-light hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recent.map((order) => (
              <Link key={order.id} href={`/publisher/orders?order=${order.id}`} className="glass-card block p-4 hover:border-accent/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-accent-light">{order.id}</p>
                    <p className="truncate text-sm font-medium">{order.productName}</p>
                    <p className="text-xs text-muted">{order.buyer.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={order.status} />
                    <p className="mt-1 text-sm font-semibold">{formatPrice(order.amount)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="mb-4 text-lg font-semibold">Top games</h2>
            <div className="space-y-3">
              {topGames.map((g, i) => (
                <div key={g.id} className="glass-card flex items-center gap-4 p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-sm font-bold text-accent-light">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{g.name}</p>
                    <p className="text-xs text-muted">{g.packageCount} packages</p>
                  </div>
                  <Badge variant={g.status === "Active" ? "success" : "muted"}>{g.status}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold">Top products</h2>
            <div className="space-y-3">
              {topProducts.map((p) => (
                <div key={p.id} className="glass-card flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted">{p.sales} sold · {formatPrice(p.price)}</p>
                  </div>
                  <Badge variant="success">{p.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
