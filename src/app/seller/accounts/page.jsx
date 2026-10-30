"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input, { Select } from "@/components/ui/Input";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";
import { games } from "@/data/mock";
import { LISTING_STATUSES } from "@/data/seller";

const STATUS_VARIANT = { Active: "success", Draft: "muted", Paused: "warning", "Sold Out": "hot" };
const statusFilters = [{ label: "All", value: "all" }, ...LISTING_STATUSES.map((s) => ({ label: s, value: s }))];
const emptyForm = { title: "", gameId: "pubg-mobile", level: "", rank: "", price: "", rareItems: "" };

export default function SellerAccountsPage() {
  const { sellerAccounts, hydrated, deleteSellerAccount, updateSellerAccount, addSellerAccount } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = useMemo(() => {
    return sellerAccounts.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.gameName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || a.status === status;
      return matchSearch && matchStatus;
    });
  }, [sellerAccounts, search, status]);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (a) => {
    setEditId(a.id);
    setForm({ title: a.title, gameId: a.gameId, level: String(a.level), rank: a.rank, price: String(a.price), rareItems: a.rareItems.join(", ") });
    setModalOpen(true);
  };

  const handleSave = () => {
    const game = games.find((g) => g.id === form.gameId);
    const data = {
      title: form.title,
      gameId: form.gameId,
      gameName: game?.name || form.gameId,
      level: parseInt(form.level, 10) || 1,
      rank: form.rank,
      price: parseFloat(form.price),
      rareItems: form.rareItems.split(",").map((s) => s.trim()).filter(Boolean),
      image: game?.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    };
    if (editId) updateSellerAccount(editId, data);
    else addSellerAccount(data);
    setModalOpen(false);
  };

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Game Accounts</h1>
          <p className="section-subtitle">Manage account listings — no credentials stored</p>
        </div>
        <Button onClick={openAdd}>Add Account</Button>
      </div>

      <div className="mb-6 rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs text-muted">
        🔒 Account credentials are never displayed or stored in this demo. Listings show metadata only.
      </div>

      <SearchBar placeholder="Search accounts..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-6 max-w-md" />
      <FilterBar filters={statusFilters} activeFilter={status} onFilterChange={setStatus} className="mb-6" />

      {filtered.length === 0 ? (
        <EmptyState icon="👤" title="No account listings" action={<Button onClick={openAdd}>Add Account</Button>} />
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <div key={a.id} className="glass-card p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                  <Image src={a.image} alt={a.title} fill className="object-cover" sizes="112px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs text-accent-light">{a.gameName}</p>
                    <Badge variant={STATUS_VARIANT[a.status]}>{a.status}</Badge>
                    <Badge variant={a.verificationStatus === "Verified" ? "success" : "warning"}>
                      {a.verificationStatus}
                    </Badge>
                  </div>
                  <h3 className="mt-1 font-semibold text-white">{a.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="muted">Lv. {a.level}</Badge>
                    <Badge variant="muted">{a.rank}</Badge>
                    <span className="text-sm font-semibold text-accent-light">{formatPrice(a.price)}</span>
                  </div>
                  {a.rareItems.length > 0 && (
                    <p className="mt-2 text-xs text-muted line-clamp-1">
                      ★ {a.rareItems.join(" · ")}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 sm:flex-col">
                  <Button size="sm" variant="secondary" onClick={() => openEdit(a)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(a.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Account" : "Add Account"} className="sm:max-w-lg">
        <p className="mb-4 text-xs text-muted">No login credentials required — metadata only.</p>
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          <Select label="Game" value={form.gameId} onChange={(e) => setForm((f) => ({ ...f, gameId: e.target.value }))}>
            {games.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Level" type="number" value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))} />
            <Input label="Rank" value={form.rank} onChange={(e) => setForm((f) => ({ ...f, rank: e.target.value }))} />
          </div>
          <Input label="Price" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
          <Input label="Rare Items (comma separated)" value={form.rareItems} onChange={(e) => setForm((f) => ({ ...f, rareItems: e.target.value }))} />
          <Button className="w-full" onClick={handleSave} disabled={!form.title || !form.price}>Save Listing</Button>
        </div>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Listing">
        <p className="text-sm text-muted">Remove this account listing?</p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button className="flex-1" onClick={() => { deleteSellerAccount(deleteConfirm); setDeleteConfirm(null); }}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
