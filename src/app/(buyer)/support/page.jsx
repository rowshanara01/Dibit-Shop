+"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input, { Select } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { TICKET_CATEGORIES } from "@/data/buyer";

const STATUS_VARIANT = {
  Open: "warning",
  "In Progress": "default",
  Resolved: "success",
  Closed: "muted",
};

export default function SupportPage() {
  const { tickets, hydrated, createTicket } = useShop();
  const [createOpen, setCreateOpen] = useState(false);
  const [detailTicket, setDetailTicket] = useState(null);
  const [form, setForm] = useState({ subject: "", category: "Payment", description: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.description.trim()) next.description = "Description is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    createTicket(form);
    setForm({ subject: "", category: "Payment", description: "" });
    setCreateOpen(false);
    setSubmitting(false);
  };

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Support</h1>
          <p className="section-subtitle">Get help with orders, payments, and more</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Create Ticket</Button>
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          icon="🎧"
          title="No support tickets"
          description="Create a ticket if you need help with an order."
          action={<Button onClick={() => setCreateOpen(true)}>Create Ticket</Button>}
        />
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => setDetailTicket(ticket)}
              className="glass-card w-full p-4 text-left transition-all hover:border-accent/30"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-accent-light">{ticket.id}</span>
                    <Badge variant="muted">{ticket.category}</Badge>
                    <Badge variant={STATUS_VARIANT[ticket.status] || "muted"}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="mt-1 font-medium text-white">{ticket.subject}</p>
                  <p className="text-xs text-muted">
                    {new Date(ticket.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-sm text-accent-light">View →</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Create Ticket Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Support Ticket">
        <div className="space-y-4">
          <Input
            label="Subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            error={errors.subject}
            required
          />
          <Select
            label="Category"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {TICKET_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">
              Description <span className="text-accent-light">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-muted/60 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
              placeholder="Describe your issue..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-400">{errors.description}</p>
            )}
          </div>
          <Button className="w-full" onClick={handleCreate} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Ticket"}
          </Button>
        </div>
      </Modal>

      {/* Ticket Detail Modal */}
      <Modal
        open={!!detailTicket}
        onClose={() => setDetailTicket(null)}
        title={detailTicket?.subject || "Ticket"}
        className="sm:max-w-xl"
      >
        {detailTicket && (
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="muted">{detailTicket.category}</Badge>
              <Badge variant={STATUS_VARIANT[detailTicket.status] || "muted"}>
                {detailTicket.status}
              </Badge>
              <span className="text-xs text-muted">{detailTicket.id}</span>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {detailTicket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg p-3 text-sm ${
                    msg.from === "user"
                      ? "bg-accent/10 border border-accent/20 ml-4"
                      : "bg-surface-light border border-border mr-4"
                  }`}
                >
                  <p className="text-xs font-medium text-muted mb-1">
                    {msg.from === "user" ? "You" : "Support"} ·{" "}
                    {new Date(msg.date).toLocaleString()}
                  </p>
                  <p className="text-white">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
