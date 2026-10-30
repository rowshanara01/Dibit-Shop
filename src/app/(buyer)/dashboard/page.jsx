"use client";

import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/ui/StatCard";
import OrderCard from "@/components/orders/OrderCard";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";

export default function DashboardPage() {
  const {
    profile,
    walletBalance,
    orders,
    wishlist,
    completedOrdersCount,
    hydrated,
  } = useShop();

  const recentOrders = orders.slice(0, 3);

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
      <div className="mb-8">
        <h1 className="section-title">
          Welcome back, {profile.name.split(" ")[0]} 👋
        </h1>
        <p className="section-subtitle">Your buyer dashboard overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard
          label="Wallet Balance"
          value={formatPrice(walletBalance)}
          icon="💳"
          href="/wallet"
        />
        <StatCard
          label="Total Orders"
          value={orders.length}
          icon="📦"
          href="/orders"
        />
        <StatCard
          label="Completed"
          value={completedOrdersCount}
          icon="✅"
          href="/orders"
        />
        <StatCard
          label="Wishlist"
          value={wishlist.length}
          icon="💜"
          href="/wishlist"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
        <Link href="/top-up">
          <Button variant="secondary">Top-Up</Button>
        </Link>
        <Link href="/wallet">
          <Button variant="outline">Add Funds</Button>
        </Link>
        <Link href="/support">
          <Button variant="ghost">Get Support</Button>
        </Link>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <Link href="/orders" className="text-sm text-accent-light hover:underline">
            View all
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-muted">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Purchases</h2>
          <Link href="/purchases" className="text-sm text-accent-light hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {orders.slice(0, 3).flatMap((order) =>
            order.items.slice(0, 1).map((item) => (
              <div key={`${order.id}-${item.itemId}`} className="glass-card flex items-center gap-3 p-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-muted">{order.id}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
