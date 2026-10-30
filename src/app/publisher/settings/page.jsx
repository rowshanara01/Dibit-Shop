"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";

export default function PublisherSettingsPage() {
  const { publisherProfile, hydrated, updatePublisherProfile } = useShop();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  const data = form || publisherProfile;

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    updatePublisherProfile({
      company: data.company,
      name: data.name,
      email: data.email,
      country: data.country,
      website: data.website,
    });
    setSaving(false);
  };

  const setField = (key, value) => setForm((f) => ({ ...(f || publisherProfile), [key]: value }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Publisher organization profile</p>
      </div>

      <div className="glass-card mb-6 p-6 flex flex-wrap items-center gap-3">
        <Badge variant="success">{publisherProfile.verificationStatus}</Badge>
        <p className="text-sm text-muted">{publisherProfile.company}</p>
      </div>

      <section className="glass-card p-6 space-y-4">
        <Input label="Company" value={data.company} onChange={(e) => setField("company", e.target.value)} />
        <Input label="Publisher name" value={data.name} onChange={(e) => setField("name", e.target.value)} />
        <Input label="Official email" type="email" value={data.email} onChange={(e) => setField("email", e.target.value)} />
        <Input label="Website" value={data.website} onChange={(e) => setField("website", e.target.value)} />
        <Input label="Country" value={data.country} onChange={(e) => setField("country", e.target.value)} />
        <Button onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save Settings"}</Button>
      </section>
    </div>
  );
}
