"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function WalletPage() {
  const { walletBalance, transactions, hydrated, addMoney } = useShop();
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleAddMoney = async () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    addMoney(val);
    setAmount("");
    setProcessing(false);
  };

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Wallet</h1>
        <p className="section-subtitle">Mock wallet — demo only, no real payments</p>
      </div>

      <div className="glass-card mb-8 p-6 sm:p-8 neon-glow">
        <p className="text-sm text-muted">Available Balance</p>
        <p className="mt-2 font-display text-4xl font-bold gradient-text">
          {formatPrice(walletBalance)}
        </p>
        <p className="mt-2 text-xs text-muted">Funds are simulated for demo purposes</p>
      </div>

      <section className="glass-card mb-8 p-6">
        <h2 className="font-semibold text-white">Add Money</h2>
        <p className="mt-1 text-xs text-muted">UI placeholder — no real transaction occurs</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(String(preset))}
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-white"
            >
              ${preset}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input
            type="number"
            min="1"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddMoney} disabled={processing || !amount}>
            {processing ? "Processing…" : "Add Money"}
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Transactions</h2>
        {transactions.length === 0 ? (
          <EmptyState
            icon="💳"
            title="No transactions"
            description="Your wallet activity will appear here."
          />
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="glass-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-white">{tx.label}</p>
                  <p className="text-xs text-muted">
                    {new Date(tx.date).toLocaleString()} · {tx.id}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={tx.status === "Completed" ? "success" : tx.status === "Pending" ? "warning" : "hot"}>
                    {tx.status}
                  </Badge>
                  <span
                    className={cn(
                      "font-semibold",
                      tx.type === "credit" ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {tx.type === "credit" ? "+" : "-"}
                    {formatPrice(tx.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
