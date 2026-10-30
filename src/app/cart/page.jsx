"use client";

import Link from "next/link";
import { useState } from "react";
import { CartItemRow, OrderSummary } from "@/components/cart/OrderSummary";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { COUPONS } from "@/data/shop";

export default function CartPage() {
  const { cart, hydrated, removeFromCart, updateQuantity, getCartSubtotal } = useShop();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = getCartSubtotal();
  const discount = appliedCoupon
    ? appliedCoupon.fixed
      ? Math.min(appliedCoupon.discount, subtotal)
      : subtotal * appliedCoupon.discount
    : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = () => {
    const coupon = COUPONS[couponInput.toUpperCase()];
    if (!coupon) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponError("");
  };

  if (!hydrated) {
    return (
      <div className="section-container py-12 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="section-container py-12">
        <h1 className="section-title mb-8">Shopping Cart</h1>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Browse products and accounts to add items to your cart."
          action={
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="section-container py-8 sm:py-12">
      <h1 className="section-title mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5">
            <label className="text-sm font-medium text-muted">Coupon Code</label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError("");
                }}
                placeholder="e.g. ANONY10"
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
              />
              <Button variant="secondary" size="sm" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            {couponError && <p className="mt-1 text-xs text-red-400">{couponError}</p>}
            {appliedCoupon && (
              <p className="mt-1 text-xs text-green-400">
                {appliedCoupon.label} applied
              </p>
            )}
          </div>

          <OrderSummary
            items={cart}
            subtotal={subtotal}
            discount={discount}
            total={total}
            coupon={appliedCoupon?.code}
            action={
              <div className="space-y-3">
                <Link href="/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products" className="block">
                  <Button variant="ghost" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
