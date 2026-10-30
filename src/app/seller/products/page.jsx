"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
import { LISTING_STATUSES } from "@/data/seller";

const STATUS_VARIANT = { Active: "success", Draft: "muted", Paused: "warning", "Sold Out": "hot" };

const statusFilters = [{ label: "All", value: "all" }, ...LISTING_STATUSES.map((s) => ({ label: s, value: s }))];

const emptyForm = { name: "", category: "Game Pass", price: "", stock: "", status: "Draft" };

export default function SellerProductsPage() {
  const { sellerProducts, hydrated, deleteSellerProduct, updateSellerProduct, addSellerProduct } = useShop();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("sales");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = useMemo(() => {
    let result = sellerProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || p.status === status;
      return matchSearch && matchStatus;
    });
    switch (sort) {
      case "price-low": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-high": result = [...result].sort((a, b) => b.price - a.price); break;
      case "stock": result = [...result].sort((a, b) => b.stock - a.stock); break;
      default: result = [...result].sort((a, b) => b.sales - a.sales);
    }
    return result;
  }, [sellerProducts, search, status, sort]);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), status: p.status });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { name: form.name, category: form.category, price: parseFloat(form.price), stock: parseInt(form.stock, 10), status: form.status, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop" };
    if (editId) updateSellerProduct(editId, data);
    else addSellerProduct(data);
    setModalOpen(false);
  };

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Products</h1>
          <p className="section-subtitle">{sellerProducts.length} listings</p>
        </div>
        <Button onClick={openAdd}>Add Product</Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="lg:max-w-sm" />
        <SortSelect value={sort} onChange={(e) => setSort(e.target.value)} options={[
          { label: "Top Sales", value: "sales" }, { label: "Price: Low", value: "price-low" },
          { label: "Price: High", value: "price-high" }, { label: "Stock", value: "stock" },
        ]} />
      </div>

      <FilterBar filters={statusFilters} activeFilter={status} onFilterChange={setStatus} className="mb-6" />

      {filtered.length === 0 ? (
        <EmptyState icon="📦" title="No products" description="Add your first product listing." action={<Button onClick={openAdd}>Add Product</Button>} />
      ) : (
        <>
          <div className="hidden md:block">
            <DataTable
              columns={[
                { key: "name", label: "Product" },
                { key: "status", label: "Status" },
                { key: "stock", label: "Stock" },
                { key: "price", label: "Price" },
                { key: "sales", label: "Sales" },
                { key: "actions", label: "Actions", className: "text-right" },
              ]}
              data={filtered}
              renderCell={(key, row) => {
                if (key === "name") return (
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                      <Image src={row.image} alt={row.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-muted">{row.category}</p>
                    </div>
                  </div>
                );
                if (key === "status") return <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>;
                if (key === "price") return formatPrice(row.price);
                if (key === "actions") return (
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openEdit(row)}>Edit</Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(row.id)}>Delete</Button>
                  </div>
                );
                return String(row[key] ?? "—");
              }}
            />
          </div>

          <div className="space-y-3 md:hidden">
            {filtered.map((p) => (
              <div key={p.id} className="glass-card p-4">
                <div className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{p.name}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge variant={STATUS_VARIANT[p.status]}>{p.status}</Badge>
                      <span className="text-xs text-muted">Stock: {p.stock}</span>
                    </div>
                    <p className="mt-1 text-sm">{formatPrice(p.price)} · {p.sales} sales</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1" onClick={() => openEdit(p)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(p.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Product" : "Add Product"}>
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          <Input label="Category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
          </div>
          <Select label="Status" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
            {LISTING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
          <Button className="w-full" onClick={handleSave} disabled={!form.name || !form.price}>Save Product</Button>
        </div>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Product">
        <p className="text-sm text-muted">Are you sure you want to delete this product?</p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button className="flex-1" onClick={() => { deleteSellerProduct(deleteConfirm); setDeleteConfirm(null); }}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
