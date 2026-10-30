"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import StatusBadge from "@/components/orders/StatusBadge";
import StatusTimeline from "@/components/orders/StatusTimeline";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";

export default function OrderDetailPage({ params }) {
  const { id } = params;
  const { getOrder, getSellerById, hydrated } = useShop();

  const order = useMemo(() => (hydrated ? getOrder(id) : null), [hydrated, getOrder, id]);

  if (!hydrated) {
    return (
      <div className="section-container py-12 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="section-container py-12 text-center">
        <p className="text-4xl">📦</p>
        <h1 className="mt-4 text-2xl font-bold">Order Not Found</h1>
        <p className="mt-2 text-muted">Order {id} does not exist.</p>
        <Link href="/orders" className="mt-6 inline-block">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const seller = getSellerById(order.sellerId);

  return (
    <div className="section-container py-8 sm:py-12">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/orders" className="hover:text-accent-light transition-colors">
          Orders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{order.id}</span>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            Order {order.id}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Placed on{" "}
            {new Date(order.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Items</h2>
            <ul className="mt-4 space-y-4">
              {order.items.map((item) => (
                <li
                  key={`${item.itemType}-${item.itemId}`}
                  className="flex gap-4 border-b border-border/30 pb-4 last:border-0 last:pb-0"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-muted">
                      {item.itemType} · Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Price breakdown */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Price Breakdown</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <dt>Subtotal</dt>
                <dd className="text-white">{formatPrice(order.subtotal)}</dd>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <dt>Discount{order.coupon ? ` (${order.coupon})` : ""}</dt>
                  <dd>-{formatPrice(order.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-border/50 pt-3 text-base font-bold">
                <dt className="text-white">Total</dt>
                <dd className="text-accent-light">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </section>

          {/* Support placeholder */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Need Help?</h2>
            <p className="mt-2 text-sm text-muted">
              Contact support or open a dispute if there&apos;s an issue with your order.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" size="sm" disabled>
                Contact Support
              </Button>
              <Button variant="outline" size="sm" disabled>
                Open Dispute
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted">Coming in a future update</p>
          </section>
        </div>

        <div className="space-y-6">
          {/* Timeline */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Order Status</h2>
            <StatusTimeline timeline={order.timeline} className="mt-6" />
          </section>

          {/* Payment & Delivery */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Payment & Delivery</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-muted">Payment Method</dt>
                <dd className="text-white">{order.paymentMethod}</dd>
              </div>
              <div>
                <dt className="text-muted">Payment Status</dt>
                <dd className="text-white">{order.paymentStatus}</dd>
              </div>
              <div>
                <dt className="text-muted">Delivery Status</dt>
                <dd className="text-white">{order.deliveryStatus}</dd>
              </div>
            </dl>
          </section>

          {/* Seller */}
          {seller && (
            <section className="glass-card p-6">
              <h2 className="font-semibold text-white">Seller</h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={seller.avatar}
                    alt={seller.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {seller.name}
                    {seller.verified && (
                      <span className="ml-1 text-accent-light">✓</span>
                    )}
                  </p>
                  <p className="text-xs text-muted">
                    {seller.sales.toLocaleString()} sales · ★ {seller.rating}
                  </p>
                </div>
              </div>
            </section>
          )}

          <Link href="/orders">
            <Button variant="ghost" className="w-full">
              ← Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
