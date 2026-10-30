"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";

export default function ProfileSettingsPage() {
  const { profile, hydrated, updateProfile, updatePreferences } = useShop();

  const [form, setForm] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const data = form || profile;

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    updateProfile({ name: data.name, email: data.email, phone: data.phone });
    setSaving(false);
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    updatePreferences(data.preferences);
    setSaving(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg("Passwords do not match");
      return;
    }
    if (passwordForm.newPass.length < 6) {
      setPasswordMsg("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setPasswordMsg("Password updated (mock)");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
    setSaving(false);
  };

  const updateField = (field, value) => {
    setForm((prev) => {
      const base = prev || profile;
      return { ...base, [field]: value };
    });
  };

  const togglePref = (key) => {
    setForm((prev) => {
      const base = prev || profile;
      return {
        ...base,
        preferences: {
          ...base.preferences,
          [key]: !base.preferences[key],
        },
      };
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Profile & Settings</h1>
        <p className="section-subtitle">Manage your account information</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <section className="glass-card p-6">
          <h2 className="font-semibold text-white">Profile Information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              label="Full Name"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            <Input
              label="Phone"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="sm:col-span-2"
            />
          </div>
          <Button className="mt-4" onClick={handleSaveProfile} disabled={saving}>
            {saving ? "Saving…" : "Save Profile"}
          </Button>
        </section>

        {/* Password */}
        <section className="glass-card p-6">
          <h2 className="font-semibold text-white">Change Password</h2>
          <p className="mt-1 text-xs text-muted">Mock UI — no real password is stored</p>
          <form onSubmit={handlePasswordChange} className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              label="Current Password"
              type="password"
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm((f) => ({ ...f, current: e.target.value }))
              }
              className="sm:col-span-2"
            />
            <Input
              label="New Password"
              type="password"
              value={passwordForm.newPass}
              onChange={(e) =>
                setPasswordForm((f) => ({ ...f, newPass: e.target.value }))
              }
            />
            <Input
              label="Confirm Password"
              type="password"
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm((f) => ({ ...f, confirm: e.target.value }))
              }
            />
            {passwordMsg && (
              <p className="sm:col-span-2 text-sm text-green-400">{passwordMsg}</p>
            )}
            <div className="sm:col-span-2">
              <Button type="submit" variant="secondary" disabled={saving}>
                Update Password
              </Button>
            </div>
          </form>
        </section>

        {/* Notification Preferences */}
        <section className="glass-card p-6">
          <h2 className="font-semibold text-white">Notification Preferences</h2>
          <div className="mt-4 space-y-4">
            {[
              { key: "orderUpdates", label: "Order updates", desc: "Status changes on your orders" },
              { key: "deliveryAlerts", label: "Delivery alerts", desc: "When items are ready" },
              { key: "promotions", label: "Promotions", desc: "Sales and discount codes" },
            ].map((pref) => (
              <label
                key={pref.key}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-border/50 p-4 hover:border-accent/20"
              >
                <div>
                  <p className="text-sm font-medium text-white">{pref.label}</p>
                  <p className="text-xs text-muted">{pref.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={data.preferences[pref.key]}
                  onChange={() => togglePref(pref.key)}
                  className="h-5 w-5 rounded border-border bg-surface accent-accent"
                />
              </label>
            ))}
          </div>
          <Button className="mt-4" variant="secondary" onClick={handleSavePreferences} disabled={saving}>
            Save Preferences
          </Button>
        </section>
      </div>
    </div>
  );
}
