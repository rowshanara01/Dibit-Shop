"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OrderSummary } from "@/components/cart/OrderSummary";
import Input, { Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { COUPONS } from "@/data/shop";

const PAYMENT_METHODS = [
  { value: "mock-card", label: "Mock Credit Card (Demo)" },
  { value: "mock-paypal", label: "Mock PayPal (Demo)" },
  { value: "mock-crypto", label: "Mock Crypto (Demo)" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, hydrated, getCartSubtotal, placeOrder } = useShop();

  const [form, setForm] = useState({
    name: "Alex Gamer",
    email: "alex@example.com",
    phone: "+1 555-0101",
    address: "123 Game St",
    city: "Los Angeles",
    country: "US",
    paymentMethod: "mock-card",
  });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const subtotal = getCartSubtotal();
  const discount = appliedCoupon
    ? appliedCoupon.fixed
      ? Math.min(appliedCoupon.discount, subtotal)
      : subtotal * appliedCoupon.discount
    : 0;
  const total = Math.max(0, subtotal - discount);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      next.email = "Valid email is required";
    if (!form.phone.trim()) next.phone = "Phone is required";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.country.trim()) next.country = "Country is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

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

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setProcessing(true);
    setSubmitError("");

    await new Promise((r) => setTimeout(r, 1500));

    try {
      const paymentLabel =
        PAYMENT_METHODS.find((m) => m.value === form.paymentMethod)?.label ||
        "Mock Payment";

      const order = placeOrder({
        buyer: { name: form.name, email: form.email, phone: form.phone },
        billing: {
          address: form.address,
          city: form.city,
          country: form.country,
        },
        paymentMethod: paymentLabel,
        coupon: appliedCoupon?.code || null,
        discount,
      });

      router.push(`/order-success?orderId=${order.id}`);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="section-container py-12 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="section-container py-12">
        <EmptyState
          icon="📋"
          title="Nothing to checkout"
          description="Your cart is empty. Add items before checking out."
          action={
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="section-container py-8 sm:py-12">
      <h1 className="section-title mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Buyer Info */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Contact Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                error={errors.name}
                required
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
                required
              />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                error={errors.phone}
                className="sm:col-span-2"
                required
              />
            </div>
          </section>

          {/* Billing */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Billing Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label="Address"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                error={errors.address}
                className="sm:col-span-2"
                required
              />
              <Input
                label="City"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                error={errors.city}
                required
              />
              <Input
                label="Country"
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                error={errors.country}
                required
              />
            </div>
          </section>

          {/* Coupon */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Coupon</h2>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError("");
                }}
                placeholder="Try ANONY10 or WELCOME5"
                className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white focus:border-accent/50 focus:outline-none"
              />
              <Button variant="secondary" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            {couponError && <p className="mt-1 text-xs text-red-400">{couponError}</p>}
            {appliedCoupon && (
              <p className="mt-1 text-xs text-green-400">{appliedCoupon.label} applied</p>
            )}
          </section>

          {/* Mock Payment */}
          <section className="glass-card p-6">
            <h2 className="font-semibold text-white">Payment Method</h2>
            <p className="mt-1 text-xs text-muted">
              Demo only — no real payment credentials are collected or processed.
            </p>
            <Select
              label="Select method"
              value={form.paymentMethod}
              onChange={(e) => updateField("paymentMethod", e.target.value)}
              className="mt-4"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </Select>
            <div className="mt-4 rounded-lg border border-dashed border-accent/30 bg-accent/5 p-4">
              <p className="text-sm text-muted">
                🎮 Mock payment gateway — order will be simulated instantly.
              </p>
            </div>
          </section>
        </div>

        <div>
          <OrderSummary
            items={cart}
            subtotal={subtotal}
            discount={discount}
            total={total}
            coupon={appliedCoupon?.code}
            action={
              <div className="space-y-3">
                {submitError && (
                  <p className="text-sm text-red-400 text-center">{submitError}</p>
                )}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Processing…
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </Button>
                <Link href="/cart" className="block">
                  <Button variant="ghost" className="w-full" disabled={processing}>
                    Back to Cart
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
