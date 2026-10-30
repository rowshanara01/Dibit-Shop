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

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Paused", value: "Paused" },
  { label: "Draft", value: "Draft" },
];

const emptyForm = { name: "", genre: "MOBA", status: "Draft", description: "", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=240&fit=crop" };

export default function PublisherGamesPage() {
  const { publisherGames, publisherProducts, hydrated, addPublisherGame, updatePublisherGame, deletePublisherGame } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = useMemo(() => {
    return publisherGames.filter((g) => {
      const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || g.status === status;
      return matchSearch && matchStatus;
    });
  }, [publisherGames, search, status]);

  const countFor = (gameId) => publisherProducts.filter((p) => p.gameId === gameId).length;

  const openAdd = () => { setEditId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (g) => {
    setEditId(g.id);
    setForm({ name: g.name, genre: g.genre, status: g.status, description: g.description, image: g.image });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form };
    if (editId) updatePublisherGame(editId, data);
    else addPublisherGame(data);
    setModalOpen(false);
  };

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Games</h1>
          <p className="section-subtitle">{publisherGames.length} titles in catalog</p>
        </div>
        <Button onClick={openAdd}>Add Game</Button>
      </div>

      <SearchBar placeholder="Search games..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-6 max-w-md" />
      <FilterBar filters={statusFilters} activeFilter={status} onFilterChange={setStatus} className="mb-6" />

      {filtered.length === 0 ? (
        <EmptyState icon="🎮" title="No games found" action={<Button onClick={openAdd}>Add Game</Button>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((g) => (
            <article key={g.id} className="glass-card overflow-hidden">
              <div className="relative h-36">
                <Image src={g.image} alt={g.name} fill className="object-cover" sizes="400px" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white">{g.name}</h3>
                    <p className="text-xs text-muted">{g.genre} · {countFor(g.id)} products</p>
                  </div>
                  <Badge variant={g.status === "Active" ? "success" : "muted"}>{g.status}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => setDetail(g)}>Details</Button>
                  <Button size="sm" variant="secondary" onClick={() => openEdit(g)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(g.id)}>Delete</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.name || "Game"}>
        {detail && (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Genre</dt><dd>{detail.genre}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Status</dt><dd>{detail.status}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Packages</dt><dd>{countFor(detail.id)}</dd></div>
            <p className="text-muted pt-2">{detail.description}</p>
          </dl>
        )}
      </Modal>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Game" : "Add Game"}>
        <div className="space-y-4">
          <Input label="Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="Genre" value={form.genre} onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))} />
          <Select label="Status" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
            <option>Active</option><option>Paused</option><option>Draft</option>
          </Select>
          <Input label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <Button className="w-full" onClick={handleSave} disabled={!form.name}>Save Game</Button>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Game">
        <p className="text-sm text-muted">Remove this game from the catalog?</p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button className="flex-1" onClick={() => { deletePublisherGame(deleteId); setDeleteId(null); }}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
