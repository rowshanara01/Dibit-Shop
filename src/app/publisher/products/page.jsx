"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar, { SortSelect } from "@/components/ui/FilterBar";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input, { Select } from "@/components/ui/Input";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/data/mock";
import { PUBLISHER_PRODUCT_STATUSES, PRODUCT_STATUS_VARIANT } from "@/data/publisher";

const emptyForm = { name: "", gameId: "", type: "Top-Up", price: "", stock: "", status: "Draft" };

export default function PublisherProductsPage() {
  const {
    publisherProducts,
    publisherGames,
    hydrated,
    addPublisherProduct,
    updatePublisherProduct,
    deletePublisherProduct,
  } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("sales");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const gameName = (id) => publisherGames.find((g) => g.id === id)?.name || "—";

  const filtered = useMemo(() => {
    let result = publisherProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || gameName(p.gameId).toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || p.status === status;
      return matchSearch && matchStatus;
    });
    if (sort === "price") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "stock") result = [...result].sort((a, b) => b.stock - a.stock);
    else result = [...result].sort((a, b) => b.sales - a.sales);
    return result;
  }, [publisherProducts, publisherGames, search, status, sort]);

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm, gameId: publisherGames[0]?.id || "" });
    setModalOpen(true);
  };
  const openEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name, gameId: p.gameId, type: p.type, price: String(p.price), stock: String(p.stock), status: p.status });
    setModalOpen(true);
  };
  const handleSave = () => {
    const data = {
      name: form.name,
      gameId: form.gameId,
      type: form.type,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10) || 0,
      status: form.status,
    };
    if (editId) updatePublisherProduct(editId, data);
    else addPublisherProduct(data);
    setModalOpen(false);
  };

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Products &amp; Packages</h1>
          <p className="section-subtitle">{publisherProducts.length} catalog items</p>
        </div>
        <Button onClick={openAdd}>Add Product</Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="lg:max-w-sm" />
        <SortSelect
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={[
            { label: "Top Sales", value: "sales" },
            { label: "Price", value: "price" },
            { label: "Stock", value: "stock" },
          ]}
        />
      </div>

      <FilterBar
        filters={[{ label: "All", value: "all" }, ...PUBLISHER_PRODUCT_STATUSES.map((s) => ({ label: s, value: s }))]}
        activeFilter={status}
        onFilterChange={setStatus}
        className="mb-6"
      />

      {filtered.length === 0 ? (
        <EmptyState icon="📦" title="No products found" action={<Button onClick={openAdd}>Add Product</Button>} />
      ) : (
        <>
          <div className="hidden md:block">
            <DataTable
              columns={[
                { key: "name", label: "Product" },
                { key: "game", label: "Game" },
                { key: "type", label: "Type" },
                { key: "price", label: "Price" },
                { key: "stock", label: "Stock" },
                { key: "status", label: "Status" },
                { key: "actions", label: "", className: "text-right" },
              ]}
              data={filtered}
              renderCell={(key, row) => {
                if (key === "name") return (
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="text-xs text-muted">{row.sales} sales</p>
                  </div>
                );
                if (key === "game") return gameName(row.gameId);
                if (key === "price") return formatPrice(row.price);
                if (key === "status") return <Badge variant={PRODUCT_STATUS_VARIANT[row.status]}>{row.status}</Badge>;
                if (key === "actions") return (
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openEdit(row)}>Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)}>Delete</Button>
                  </div>
                );
                return String(row[key] ?? "—");
              }}
            />
          </div>
          <div className="space-y-3 md:hidden">
            {filtered.map((p) => (
              <div key={p.id} className="glass-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted">{gameName(p.gameId)} · {p.type}</p>
                    <p className="mt-1 text-sm">{formatPrice(p.price)} · stock {p.stock}</p>
                  </div>
                  <Badge variant={PRODUCT_STATUS_VARIANT[p.status]}>{p.status}</Badge>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1" onClick={() => openEdit(p)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(p.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Product" : "Add Product"}>
        <div className="space-y-4">
          <Input label="Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Select label="Game" value={form.gameId} onChange={(e) => setForm((f) => ({ ...f, gameId: e.target.value }))}>
            {publisherGames.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </Select>
          <Select label="Type" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
            <option>Top-Up</option><option>Game Pass</option><option>Currency</option><option>Bundle</option>
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
          </div>
          <Select label="Status" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
            {PUBLISHER_PRODUCT_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Button className="w-full" onClick={handleSave} disabled={!form.name || !form.price}>Save Product</Button>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product">
        <p className="text-sm text-muted">Remove this package from the catalog?</p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button className="flex-1" onClick={() => { deletePublisherProduct(deleteId); setDeleteId(null); }}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
