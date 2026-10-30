"use client";

import { useState } from "react";
import Input, { Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";

const METHODS = [
  { value: "Mock Bank Transfer", label: "Mock Bank Transfer" },
  { value: "Mock PayPal", label: "Mock PayPal" },
  { value: "Mock Crypto", label: "Mock Crypto" },
];

const STATUS_VARIANT = {
  Pending: "warning",
  Processing: "default",
  Completed: "success",
  Rejected: "hot",
};

export default function SellerWithdrawalsPage() {
  const { sellerEarnings, withdrawals, hydrated, requestWithdrawal } = useShop();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(METHODS[0].value);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleWithdraw = async () => {
    setError("");
    setSuccess(false);
    const val = parseFloat(amount);
    if (!val || val <= 0) { setError("Enter a valid amount"); return; }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1000));
    const result = requestWithdrawal(val, method);
    setProcessing(false);
    if (!result.ok) { setError(result.error); return; }
    setSuccess(true);
    setAmount("");
  };

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Withdrawals</h1>
        <p className="section-subtitle">Mock payout UI — no real transfers</p>
      </div>

      <div className="glass-card mb-8 p-6 neon-glow">
        <p className="text-sm text-muted">Available Balance</p>
        <p className="mt-1 font-display text-3xl font-bold gradient-text">
          {formatPrice(sellerEarnings.availableBalance)}
        </p>
        <p className="mt-2 text-xs text-muted">
          Pending: {formatPrice(sellerEarnings.pendingBalance)}
        </p>
      </div>

      <section className="glass-card mb-8 p-6">
        <h2 className="font-semibold text-white">Request Withdrawal</h2>
        <p className="mt-1 text-xs text-muted">Demo only — funds are not actually transferred</p>
        <div className="mt-4 space-y-4">
          <Input
            label="Amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setError(""); setSuccess(false); }}
          />
          <Select label="Payment Method" value={method} onChange={(e) => setMethod(e.target.value)}>
            {METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </Select>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">Withdrawal request submitted successfully (demo)</p>}
          <Button onClick={handleWithdraw} disabled={processing || !amount} className="w-full sm:w-auto">
            {processing ? "Processing…" : "Request Withdrawal"}
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-white">Withdrawal History</h2>
        {withdrawals.length === 0 ? (
          <EmptyState icon="🏦" title="No withdrawals yet" />
        ) : (
          <div className="space-y-3">
            {withdrawals.map((w) => (
              <div key={w.id} className="glass-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-accent-light">{w.id}</p>
                  <p className="text-sm text-white">{w.method}</p>
                  <p className="text-xs text-muted">{new Date(w.date).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={STATUS_VARIANT[w.status]}>{w.status}</Badge>
                  <span className="font-semibold text-white">{formatPrice(w.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
