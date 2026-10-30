"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { getOrder, hydrated } = useShop();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Skeleton className="mx-auto h-20 w-20 rounded-full" />
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const order = orderId ? getOrder(orderId) : null;

  if (!order) {
    return (
      <div className="text-center">
        <p className="text-4xl">⚠️</p>
        <h1 className="mt-4 text-2xl font-bold">Order Not Found</h1>
        <p className="mt-2 text-muted">We couldn&apos;t find this order.</p>
        <Link href="/orders" className="mt-6 inline-block">
          <Button>View Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg text-center animate-slide-up">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl">
        ✓
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold">Order Placed!</h1>
      <p className="mt-2 text-muted">
        Thank you for your purchase. Your order is being processed.
      </p>

      <div className="mt-8 glass-card p-6 text-left">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Order ID</dt>
            <dd className="font-mono text-accent-light">{order.id}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Total</dt>
            <dd className="font-bold text-white">{formatPrice(order.total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Payment</dt>
            <dd className="text-white">{order.paymentMethod}</dd>
          </div>
        </dl>

        <ul className="mt-4 space-y-3 border-t border-border/50 pt-4">
          {order.items.map((item) => (
            <li key={`${item.itemType}-${item.itemId}`} className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white">{item.name}</p>
                <p className="text-xs text-muted">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href={`/orders/${order.id}`}>
          <Button size="lg">View Order</Button>
        </Link>
        <Link href="/products">
          <Button variant="secondary" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="section-container py-12 sm:py-20">
      <Suspense
        fallback={
          <div className="mx-auto max-w-lg space-y-4">
            <Skeleton className="mx-auto h-20 w-20 rounded-full" />
            <Skeleton className="h-8 w-64 mx-auto" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
