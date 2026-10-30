/** @type {import('./publisher-types').PublisherProfile} */
export const mockPublisherProfile = {
  id: "pub-1",
  company: "NeonForge Studios",
  name: "NeonForge",
  email: "partners@neonforge.dev",
  country: "Singapore",
  website: "https://neonforge.dev",
  logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop",
  verificationStatus: "Verified",
};

/** @type {import('./publisher-types').PublisherGame[]} */
export const mockPublisherGames = [
  {
    id: "pg-1",
    name: "PUBG Mobile",
    genre: "Battle Royale",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=240&fit=crop",
    status: "Active",
    packageCount: 3,
    description: "Official UC and Royale Pass packages.",
  },
  {
    id: "pg-2",
    name: "Call of Duty Mobile",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=240&fit=crop",
    status: "Active",
    packageCount: 2,
    description: "CP packs and Battle Pass catalog.",
  },
  {
    id: "pg-3",
    name: "Mobile Legends",
    genre: "MOBA",
    image: "https://images.unsplash.com/photo-1538481190775-a9415413164c?w=400&h=240&fit=crop",
    status: "Active",
    packageCount: 1,
    description: "Diamonds and limited skin bundles.",
  },
  {
    id: "pg-4",
    name: "Honor of Kings",
    genre: "MOBA",
    image: "https://images.unsplash.com/photo-1560419015-7c4278218d5a?w=400&h=240&fit=crop",
    status: "Paused",
    packageCount: 0,
    description: "Catalog in review — packages paused.",
  },
];

/** @type {import('./publisher-types').PublisherProduct[]} */
export const mockPublisherProducts = [
  { id: "pp-1", gameId: "pg-1", name: "660 UC", type: "Top-Up", price: 9.99, stock: 5000, status: "Approved", sales: 890 },
  { id: "pp-2", gameId: "pg-1", name: "3,250 UC", type: "Top-Up", price: 49.99, stock: 2100, status: "Approved", sales: 412 },
  { id: "pp-3", gameId: "pg-1", name: "Royale Pass Premium", type: "Game Pass", price: 14.99, stock: 800, status: "Approved", sales: 342 },
  { id: "pp-4", gameId: "pg-2", name: "2,400 CP", type: "Top-Up", price: 19.99, stock: 1200, status: "Approved", sales: 267 },
  { id: "pp-5", gameId: "pg-2", name: "Battle Pass S11", type: "Game Pass", price: 9.99, stock: 0, status: "Out of Stock", sales: 567 },
  { id: "pp-6", gameId: "pg-3", name: "275 Diamonds", type: "Top-Up", price: 4.99, stock: 3400, status: "Pending Review", sales: 0 },
  { id: "pp-7", gameId: "pg-4", name: "Starter Tokens", type: "Currency", price: 2.99, stock: 100, status: "Draft", sales: 0 },
];

function timeline(status, date) {
  const flow = ["Pending", "Payment Confirmed", "Processing", "Ready for Delivery", "Delivered"];
  const idx = Math.max(0, flow.indexOf(status));
  const base = new Date(date);
  return flow.map((s, i) => ({
    status: s,
    date: new Date(base.getTime() + i * 1800000).toISOString(),
    done: i <= idx,
    active: i === idx,
  }));
}

/** @type {import('./publisher-types').PublisherOrder[]} */
export const mockPublisherOrders = [
  {
    id: "PORD-8801",
    gameName: "PUBG Mobile",
    productName: "3,250 UC",
    buyer: { name: "Alex Gamer", email: "alex@example.com" },
    date: "2025-08-12T15:00:00Z",
    amount: 49.99,
    status: "Delivered",
    timeline: timeline("Delivered", "2025-08-12T15:00:00Z"),
  },
  {
    id: "PORD-8802",
    gameName: "Call of Duty Mobile",
    productName: "Battle Pass S11",
    buyer: { name: "Jamie Pro", email: "jamie@example.com" },
    date: "2025-08-10T11:20:00Z",
    amount: 9.99,
    status: "Processing",
    timeline: timeline("Processing", "2025-08-10T11:20:00Z"),
  },
  {
    id: "PORD-8803",
    gameName: "PUBG Mobile",
    productName: "Royale Pass Premium",
    buyer: { name: "Sam Lee", email: "sam@example.com" },
    date: "2025-08-08T09:00:00Z",
    amount: 14.99,
    status: "Ready for Delivery",
    timeline: timeline("Ready for Delivery", "2025-08-08T09:00:00Z"),
  },
  {
    id: "PORD-8804",
    gameName: "Call of Duty Mobile",
    productName: "2,400 CP",
    buyer: { name: "Alex Gamer", email: "alex@example.com" },
    date: "2025-08-05T14:15:00Z",
    amount: 19.99,
    status: "Payment Confirmed",
    timeline: timeline("Payment Confirmed", "2025-08-05T14:15:00Z"),
  },
  {
    id: "PORD-8805",
    gameName: "PUBG Mobile",
    productName: "660 UC",
    buyer: { name: "Riley Chen", email: "riley@example.com" },
    date: "2025-08-01T10:30:00Z",
    amount: 9.99,
    status: "Delivered",
    timeline: timeline("Delivered", "2025-08-01T10:30:00Z"),
  },
];

export const mockPublisherRevenue = {
  totalRevenue: 18420.5,
  pendingPayout: 1260.0,
  unitsSold: 2478,
};

/** @type {{ month: string, amount: number }[]} */
export const mockPublisherChart = [
  { month: "Mar", amount: 1840 },
  { month: "Apr", amount: 2210 },
  { month: "May", amount: 1980 },
  { month: "Jun", amount: 2640 },
  { month: "Jul", amount: 3120 },
  { month: "Aug", amount: 2860 },
];

/** @type {import('./publisher-types').PublisherApiKey[]} */
export const mockPublisherApiKeys = [
  { id: "key-1", name: "Production", masked: "pk_live_••••••••a4f2", status: "Live", created: "2025-03-12T08:00:00Z", lastUsed: "2025-08-14T09:12:00Z" },
  { id: "key-2", name: "Sandbox", masked: "pk_test_••••••••c91b", status: "Live", created: "2025-03-12T08:05:00Z", lastUsed: "2025-08-13T16:40:00Z" },
  { id: "key-3", name: "Legacy", masked: "pk_live_••••••••7e10", status: "Disabled", created: "2024-11-02T12:00:00Z", lastUsed: "2025-01-20T11:00:00Z" },
];

export const WEBHOOK_EVENTS = [
  "order.created",
  "order.completed",
  "order.failed",
  "product.updated",
  "payout.pending",
];

/** @type {import('./publisher-types').PublisherWebhook[]} */
export const mockPublisherWebhooks = [
  { id: "wh-1", url: "https://hooks.neonforge.dev/orders", events: ["order.created", "order.completed"], status: "Active", created: "2025-04-01T10:00:00Z" },
  { id: "wh-2", url: "https://hooks.neonforge.dev/payouts", events: ["payout.pending"], status: "Active", created: "2025-05-18T14:00:00Z" },
  { id: "wh-3", url: "https://staging.neonforge.dev/hooks", events: ["product.updated"], status: "Inactive", created: "2025-07-09T09:00:00Z" },
];

/** @type {import('./publisher-types').WebhookLog[]} */
export const mockWebhookLogs = [
  { id: "log-1", webhookId: "wh-1", event: "order.completed", status: "200", date: "2025-08-12T15:01:00Z" },
  { id: "log-2", webhookId: "wh-1", event: "order.created", status: "200", date: "2025-08-10T11:21:00Z" },
  { id: "log-3", webhookId: "wh-2", event: "payout.pending", status: "500", date: "2025-08-09T08:00:00Z" },
  { id: "log-4", webhookId: "wh-3", event: "product.updated", status: "skipped", date: "2025-08-08T09:10:00Z" },
];

export const officialPartners = [
  { id: "op-1", name: "Tencent Games", games: "PUBG Mobile · Honor of Kings" },
  { id: "op-2", name: "Activision", games: "Call of Duty Mobile" },
  { id: "op-3", name: "Moonton", games: "Mobile Legends" },
];

export const PUBLISHER_PRODUCT_STATUSES = [
  "Draft",
  "Pending Review",
  "Approved",
  "Rejected",
  "Suspended",
  "Out of Stock",
];

export const PRODUCT_STATUS_VARIANT = {
  Draft: "muted",
  "Pending Review": "warning",
  Approved: "success",
  Rejected: "hot",
  Suspended: "hot",
  "Out of Stock": "warning",
};

export function generatePublisherId(prefix) {
  return `${prefix}-${Math.floor(Math.random() * 900) + 100}`;
}

export function maskApiKey() {
  const hex = Math.random().toString(16).slice(2, 6);
  return `pk_live_••••••••${hex}`;
}
