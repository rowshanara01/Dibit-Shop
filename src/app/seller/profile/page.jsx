"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { SELLER_LEVELS } from "@/data/seller";

export default function SellerProfilePage() {
  const { sellerProfile, hydrated, updateSellerProfile } = useShop();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  const data = form || sellerProfile;

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    updateSellerProfile({
      storeName: data.storeName,
      description: data.description,
      email: data.email,
      phone: data.phone,
    });
    setSaving(false);
  };

  const levelIndex = SELLER_LEVELS.indexOf(sellerProfile.level);

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Store Profile</h1>
        <p className="section-subtitle">Manage your seller storefront</p>
      </div>

      <div className="glass-card mb-8 p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border">
            <Image src={sellerProfile.avatar} alt={sellerProfile.storeName} fill className="object-cover" sizes="80px" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-bold text-white">{sellerProfile.storeName}</h2>
              <Badge variant="success">{sellerProfile.verificationStatus}</Badge>
              <Badge>{sellerProfile.level}</Badge>
            </div>
            <div className="mt-2">
              <Rating value={sellerProfile.rating} reviews={sellerProfile.reviews} size="md" />
            </div>
            <p className="mt-2 text-sm text-muted">
              Member since {new Date(sellerProfile.joinedDate).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Seller Level Progress</p>
          <div className="flex gap-2">
            {SELLER_LEVELS.map((level, i) => (
              <div
                key={level}
                className={`flex-1 rounded-lg border p-2 text-center text-xs ${
                  i <= levelIndex
                    ? "border-accent/50 bg-accent/10 text-accent-light"
                    : "border-border text-muted"
                }`}
              >
                {level.replace(" Seller", "")}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="glass-card p-6">
        <h2 className="font-semibold text-white">Edit Profile</h2>
        <div className="mt-4 space-y-4">
          <Input
            label="Store Name"
            value={data.storeName}
            onChange={(e) => setForm((f) => ({ ...(f || sellerProfile), storeName: e.target.value }))}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setForm((f) => ({ ...(f || sellerProfile), description: e.target.value }))}
              rows={3}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Contact Email"
              type="email"
              value={data.email}
              onChange={(e) => setForm((f) => ({ ...(f || sellerProfile), email: e.target.value }))}
            />
            <Input
              label="Phone"
              value={data.phone}
              onChange={(e) => setForm((f) => ({ ...(f || sellerProfile), phone: e.target.value }))}
            />
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Profile"}
          </Button>
        </div>
      </section>
    </div>
  );
}
