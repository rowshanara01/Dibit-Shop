"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { WEBHOOK_EVENTS } from "@/data/publisher";

const emptyForm = { url: "", events: ["order.created"], status: "Active" };

export default function PublisherWebhooksPage() {
  const {
    publisherWebhooks,
    webhookLogs,
    hydrated,
    addPublisherWebhook,
    updatePublisherWebhook,
    deletePublisherWebhook,
    testPublisherWebhook,
  } = useShop();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => { setEditId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (w) => {
    setEditId(w.id);
    setForm({ url: w.url, events: w.events, status: w.status });
    setModalOpen(true);
  };

  const toggleEvent = (event) => {
    setForm((f) => ({
      ...f,
      events: f.events.includes(event) ? f.events.filter((e) => e !== event) : [...f.events, event],
    }));
  };

  const handleSave = () => {
    if (editId) updatePublisherWebhook(editId, form);
    else addPublisherWebhook(form);
    setModalOpen(false);
  };

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Webhooks</h1>
          <p className="section-subtitle">Mock event deliveries only</p>
        </div>
        <Button onClick={openAdd}>Add Webhook</Button>
      </div>

      {publisherWebhooks.length === 0 ? (
        <EmptyState icon="🔗" title="No webhooks" action={<Button onClick={openAdd}>Add Webhook</Button>} />
      ) : (
        <div className="space-y-4 mb-10">
          {publisherWebhooks.map((w) => (
            <div key={w.id} className="glass-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={w.status === "Active" ? "success" : "muted"}>{w.status}</Badge>
                    <span className="font-mono text-xs text-muted">{w.id}</span>
                  </div>
                  <p className="mt-2 truncate font-mono text-sm text-white">{w.url}</p>
                  <p className="mt-2 text-xs text-muted">{w.events.join(" · ")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => testPublisherWebhook(w.id)}>Test</Button>
                  <Button size="sm" variant="secondary" onClick={() => openEdit(w)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(w.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="mb-4 text-lg font-semibold">Delivery logs</h2>
      <div className="space-y-2">
        {webhookLogs.map((log) => (
          <div key={log.id} className="glass-card flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between text-sm">
            <div>
              <span className="font-mono text-xs text-accent-light">{log.webhookId}</span>
              <p className="text-white">{log.event}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <Badge variant={log.status === "200" ? "success" : log.status === "500" ? "hot" : "muted"}>{log.status}</Badge>
              {new Date(log.date).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Webhook" : "Add Webhook"}>
        <div className="space-y-4">
          <Input label="Endpoint URL" placeholder="https://hooks.example.com" value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} />
          <SelectStatus form={form} setForm={setForm} />
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-muted">Events</legend>
            <div className="space-y-2">
              {WEBHOOK_EVENTS.map((event) => (
                <label key={event} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.events.includes(event)}
                    onChange={() => toggleEvent(event)}
                    className="accent-accent"
                  />
                  {event}
                </label>
              ))}
            </div>
          </fieldset>
          <Button className="w-full" onClick={handleSave} disabled={!form.url || form.events.length === 0}>Save Webhook</Button>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Webhook">
        <p className="text-sm text-muted">Remove this webhook endpoint?</p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button className="flex-1" onClick={() => { deletePublisherWebhook(deleteId); setDeleteId(null); }}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}

function SelectStatus({ form, setForm }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-muted">Status</label>
      <select
        value={form.status}
        onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white focus:border-accent/50 focus:outline-none"
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
  );
}
