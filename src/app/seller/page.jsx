"use client";

import Link from "next/link";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import StatusBadge from "@/components/orders/StatusBadge";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";

export default function SellerDashboardPage() {
  const {
    sellerProfile,
    sellerProducts,
    sellerAccounts,
    sellerOrders,
    sellerEarnings,
    hydrated,
  } = useShop();

  const activeProducts = sellerProducts.filter((p) => p.status === "Active").length;
  const activeAccounts = sellerAccounts.filter((a) => a.status === "Active").length;
  const recentOrders = sellerOrders.slice(0, 4);
  const topProducts = [...sellerProducts].sort((a, b) => b.sales - a.sales).slice(0, 3);

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="section-title">{sellerProfile.storeName}</h1>
          <p className="section-subtitle">Seller dashboard overview</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">{sellerProfile.verificationStatus}</Badge>
          <Badge>{sellerProfile.level}</Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard
          label="Total Sales"
          value={sellerEarnings.totalSales.toLocaleString()}
          icon="📈"
          href="/seller/earnings"
        />
        <StatCard
          label="Orders"
          value={sellerOrders.length}
          icon="🛒"
          href="/seller/orders"
        />
        <StatCard
          label="Earnings Balance"
          value={formatPrice(sellerEarnings.availableBalance)}
          icon="💰"
          href="/seller/earnings"
        />
        <StatCard
          label="Listings"
          value={`${activeProducts + activeAccounts}`}
          icon="📦"
          href="/seller/products"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/seller/products"><Button>Add Product</Button></Link>
        <Link href="/seller/accounts"><Button variant="secondary">Add Account</Button></Link>
        <Link href="/seller/orders"><Button variant="outline">View Orders</Button></Link>
        <Link href="/seller/withdrawals"><Button variant="ghost">Withdraw</Button></Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <Link href="/seller/orders" className="text-sm text-accent-light hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/seller/orders?order=${order.id}`}
                className="glass-card block p-4 transition-all hover:border-accent/30"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-accent-light">{order.id}</p>
                    <p className="truncate text-sm font-medium text-white">{order.itemName}</p>
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

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Top Products</h2>
            <Link href="/seller/products" className="text-sm text-accent-light hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.id} className="glass-card flex items-center gap-4 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-sm font-bold text-accent-light">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{product.name}</p>
                  <p className="text-xs text-muted">{product.sales} sales · {formatPrice(product.price)}</p>
                </div>
                <Badge variant={product.status === "Active" ? "success" : "muted"}>
                  {product.status}
                </Badge>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
