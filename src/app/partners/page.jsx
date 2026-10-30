"use client";

import { useState } from "react";
import Link from "next/link";
import Input, { Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { officialPartners } from "@/data/publisher";
import { useShop } from "@/context/ShopContext";

const emptyForm = {
  company: "",
  publisherName: "",
  website: "",
  email: "",
  country: "Singapore",
  companyType: "Publisher",
  games: "",
  products: "",
  monthlySales: "10k-50k",
  contact: "",
  description: "",
};

export default function PartnersPage() {
  const { showToast } = useShop();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.company.trim()) next.company = "Required";
    if (!form.publisherName.trim()) next.publisherName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = "Valid official email required";
    if (!form.contact.trim()) next.contact = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
    showToast("Partner application submitted (demo)");
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-hero-glow border-b border-border/40">
        <div className="section-container py-16 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-light">Official Partners</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl max-w-3xl">
            Publish games and digital products on <span className="gradient-text">AnonyShop</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Reach millions of buyers with official top-ups, packages, and catalog APIs — all from one publisher console.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#apply"><Button size="lg">Become a Partner</Button></a>
            <Link href="/publisher"><Button variant="secondary" size="lg">Publisher Login</Button></Link>
            <Link href="/publisher/api"><Button variant="outline" size="lg">API &amp; Docs</Button></Link>
          </div>
        </div>
      </section>

      <section className="section-container py-16">
        <h2 className="section-title mb-8">Why partner with us</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Global reach", desc: "Instant catalog distribution to AnonyShop buyers." },
            { title: "Official APIs", desc: "Mock keys, webhooks, and order events in one hub." },
            { title: "Fast settlement", desc: "Mock payouts with transparent platform fees." },
            { title: "Brand control", desc: "Manage games, packages, stock, and status." },
          ].map((item) => (
            <div key={item.title} className="glass-card p-5">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/30 bg-surface/30 py-16">
        <div className="section-container">
          <h2 className="section-title mb-8">Official partners</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {officialPartners.map((p) => (
              <div key={p.id} className="glass-card p-6">
                <Badge className="mb-3">Official</Badge>
                <h3 className="font-semibold text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.games}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section-container py-16">
        <h2 className="section-title">Partner application</h2>
        <p className="section-subtitle mb-8">Frontend only — no documents are uploaded to a server.</p>

        {submitted ? (
          <div className="glass-card p-8 text-center max-w-lg mx-auto">
            <p className="text-4xl">✓</p>
            <h3 className="mt-4 text-xl font-bold">Application received</h3>
            <p className="mt-2 text-sm text-muted">We&apos;ll review {form.company} shortly. This is a demo confirmation.</p>
            <Link href="/publisher" className="mt-6 inline-block">
              <Button>Open Publisher Hub</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 grid gap-4 sm:grid-cols-2">
            <Input label="Company" required value={form.company} error={errors.company} onChange={(e) => setField("company", e.target.value)} />
            <Input label="Publisher / Developer name" required value={form.publisherName} error={errors.publisherName} onChange={(e) => setField("publisherName", e.target.value)} />
            <Input label="Website" type="url" placeholder="https://" value={form.website} onChange={(e) => setField("website", e.target.value)} />
            <Input label="Official email" type="email" required value={form.email} error={errors.email} onChange={(e) => setField("email", e.target.value)} />
            <Input label="Country" value={form.country} onChange={(e) => setField("country", e.target.value)} />
            <Select label="Company type" value={form.companyType} onChange={(e) => setField("companyType", e.target.value)}>
              <option>Publisher</option>
              <option>Developer</option>
              <option>Studio</option>
              <option>Distributor</option>
            </Select>
            <Input label="Games / Apps" placeholder="PUBG Mobile, COD Mobile" value={form.games} onChange={(e) => setField("games", e.target.value)} />
            <Input label="Products" placeholder="Top-up, Game Pass" value={form.products} onChange={(e) => setField("products", e.target.value)} />
            <Select label="Estimated monthly sales" value={form.monthlySales} onChange={(e) => setField("monthlySales", e.target.value)}>
              <option>Under 10k</option>
              <option>10k-50k</option>
              <option>50k-200k</option>
              <option>200k+</option>
            </Select>
            <Input label="Contact person" required value={form.contact} error={errors.contact} onChange={(e) => setField("contact", e.target.value)} />
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-muted">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
                placeholder="Tell us about your catalog..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-muted">Logo / documents</label>
              <input
                type="file"
                accept="image/*,.pdf"
                className="w-full rounded-lg border border-dashed border-border bg-surface px-4 py-3 text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent/20 file:px-3 file:py-1 file:text-accent-light"
              />
              <p className="mt-1 text-xs text-muted">Files stay in the browser — nothing is uploaded.</p>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={sending}>{sending ? "Submitting…" : "Submit Application"}</Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
