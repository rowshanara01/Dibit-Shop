"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";

const ENDPOINTS = [
  { method: "GET", path: "/v1/games", desc: "List publisher games" },
  { method: "GET", path: "/v1/products", desc: "List packages" },
  { method: "POST", path: "/v1/orders/fulfill", desc: "Mark order delivered" },
  { method: "GET", path: "/v1/analytics", desc: "Revenue snapshot" },
];

export default function PublisherApiPage() {
  const { publisherApiKeys, hydrated, copyApiKey, regenerateApiKey } = useShop();

  if (!hydrated) return <Skeleton className="h-64 w-full" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">API</h1>
        <p className="section-subtitle">Mock keys and docs — never real credentials</p>
      </div>

      <div className="mb-6 rounded-lg border border-accent/20 bg-accent/5 p-4 text-sm text-muted">
        Keys shown here are masked fakes. Regenerating only changes the last 4 mock characters.
      </div>

      <div className="space-y-4 mb-10">
        {publisherApiKeys.map((key) => (
          <div key={key.id} className="glass-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{key.name}</h3>
                  <Badge variant={key.status === "Live" ? "success" : "muted"}>{key.status}</Badge>
                </div>
                <p className="mt-2 font-mono text-sm text-accent-light">{key.masked}</p>
                <p className="mt-1 text-xs text-muted">
                  Created {new Date(key.created).toLocaleDateString()} · Last used {new Date(key.lastUsed).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => copyApiKey(key)}>Copy</Button>
                <Button size="sm" variant="outline" onClick={() => regenerateApiKey(key.id)} disabled={key.status !== "Live"}>
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold">Endpoints</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {ENDPOINTS.map((ep) => (
          <div key={ep.path} className="glass-card p-4">
            <div className="flex items-center gap-2">
              <Badge>{ep.method}</Badge>
              <code className="text-sm text-accent-light">{ep.path}</code>
            </div>
            <p className="mt-2 text-sm text-muted">{ep.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
