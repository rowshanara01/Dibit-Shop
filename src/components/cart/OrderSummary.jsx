"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

export function OrderSummary({
  items,
  subtotal,
  discount = 0,
  total,
  coupon,
  showItems = true,
  className,
  action,
}) {
  return (
    <div className={cn("glass-card p-6", className)}>
      <h2 className="font-semibold text-white">Order Summary</h2>

      {showItems && items.length > 0 && (
        <ul className="mt-4 space-y-3 border-b border-border/50 pb-4">
          {items.map((item) => (
            <li key={`${item.itemType}-${item.itemId}`} className="flex gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white">{item.name}</p>
                <p className="text-xs text-muted">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-white">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-muted">
          <dt>Subtotal</dt>
          <dd className="text-white">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-400">
            <dt>Discount{coupon ? ` (${coupon})` : ""}</dt>
            <dd>-{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between border-t border-border/50 pt-3 text-base font-bold">
          <dt className="text-white">Total</dt>
          <dd className="text-accent-light">{formatPrice(total)}</dd>
        </div>
      </dl>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function CartItemRow({ item, onRemove, onUpdateQuantity }) {
  const isAccount = item.itemType === "account";

  return (
    <div className="glass-card flex gap-4 p-4 sm:p-5">
      <Link href={item.href} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-accent-light">{item.typeLabel}</p>
          <Link href={item.href} className="font-medium text-white hover:text-accent-light transition-colors line-clamp-2">
            {item.name}
          </Link>
          <p className="mt-1 text-sm text-muted">{formatPrice(item.price)} each</p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          {!isAccount ? (
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-3 py-1.5 text-muted hover:text-white disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[2rem] text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1.5 text-muted hover:text-white"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <span className="text-sm text-muted">Qty: 1</span>
          )}

          <div className="text-right">
            <p className="font-semibold text-white">
              {formatPrice(item.price * item.quantity)}
            </p>
            <button
              onClick={() => onRemove(item.id)}
              className="mt-1 text-xs text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
