/**
 * @typedef {'product' | 'account' | 'topup'} ItemType
 * @typedef {'Pending' | 'Payment Confirmed' | 'Processing' | 'Ready for Delivery' | 'Delivered' | 'Completed' | 'Disputed' | 'Refunded' | 'Failed' | 'Cancelled'} OrderStatus
 */

/** @type {OrderStatus[]} */
export const ORDER_STATUSES = [
  "Pending",
  "Payment Confirmed",
  "Processing",
  "Ready for Delivery",
  "Delivered",
  "Completed",
  "Disputed",
  "Refunded",
  "Failed",
  "Cancelled",
];

/** @type {Record<OrderStatus, string>} */
export const STATUS_VARIANTS = {
  Pending: "warning",
  "Payment Confirmed": "default",
  Processing: "default",
  "Ready for Delivery": "default",
  Delivered: "success",
  Completed: "success",
  Disputed: "hot",
  Refunded: "muted",
  Failed: "hot",
  Cancelled: "muted",
};

export const COUPONS = {
  ANONY10: { code: "ANONY10", discount: 0.1, label: "10% off" },
  WELCOME5: { code: "WELCOME5", discount: 5, label: "$5 off", fixed: true },
};

/** @type {{ itemType: ItemType, itemId: string, quantity: number }[]} */
export const initialCartItems = [
  { itemType: "product", itemId: "prod-1", quantity: 1 },
  { itemType: "product", itemId: "prod-3", quantity: 2 },
  { itemType: "account", itemId: "acc-2", quantity: 1 },
];

/** @type {{ itemType: ItemType, itemId: string }[]} */
export const initialWishlistItems = [
  { itemType: "product", itemId: "prod-2" },
  { itemType: "product", itemId: "prod-4" },
  { itemType: "product", itemId: "prod-5" },
  { itemType: "account", itemId: "acc-1" },
  { itemType: "account", itemId: "acc-3" },
];

function buildTimeline(status, date) {
  const flow = [
    "Pending",
    "Payment Confirmed",
    "Processing",
    "Ready for Delivery",
    "Delivered",
    "Completed",
  ];
  const idx = flow.indexOf(status);
  const base = new Date(date);

  return flow.map((s, i) => ({
    status: s,
    date: new Date(base.getTime() + i * 3600000).toISOString(),
    done: idx >= 0 ? i <= idx : false,
    active: idx >= 0 ? i === idx : false,
  }));
}

/** @type {import('./shop-types').Order[]} */
export const mockOrders = [
  {
    id: "ORD-20250801-001",
    date: "2025-08-01T10:30:00Z",
    status: "Completed",
    items: [
      {
        itemType: "product",
        itemId: "prod-1",
        name: "PUBG Royale Pass Premium",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
        price: 14.99,
        quantity: 1,
      },
    ],
    subtotal: 14.99,
    discount: 0,
    total: 14.99,
    coupon: null,
    buyer: { name: "Alex Gamer", email: "alex@example.com", phone: "+1 555-0101" },
    billing: { address: "123 Game St", city: "Los Angeles", country: "US" },
    paymentMethod: "Mock Card",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    sellerId: "seller-1",
    timeline: buildTimeline("Completed", "2025-08-01T10:30:00Z"),
  },
  {
    id: "ORD-20250805-002",
    date: "2025-08-05T14:15:00Z",
    status: "Processing",
    items: [
      {
        itemType: "account",
        itemId: "acc-1",
        name: "PUBG Conqueror Account",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
        price: 299.99,
        quantity: 1,
      },
    ],
    subtotal: 299.99,
    discount: 29.99,
    total: 270.0,
    coupon: "ANONY10",
    buyer: { name: "Alex Gamer", email: "alex@example.com", phone: "+1 555-0101" },
    billing: { address: "123 Game St", city: "Los Angeles", country: "US" },
    paymentMethod: "Mock PayPal",
    paymentStatus: "Paid",
    deliveryStatus: "Processing",
    sellerId: "seller-1",
    timeline: buildTimeline("Processing", "2025-08-05T14:15:00Z"),
  },
  {
    id: "ORD-20250808-003",
    date: "2025-08-08T09:00:00Z",
    status: "Ready for Delivery",
    items: [
      {
        itemType: "product",
        itemId: "prod-4",
        name: "Steam Gift Card $50",
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
        price: 50.0,
        quantity: 1,
      },
      {
        itemType: "product",
        itemId: "prod-3",
        name: "COD Mobile Battle Pass S11",
        image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=200&fit=crop",
        price: 9.99,
        quantity: 1,
      },
    ],
    subtotal: 59.99,
    discount: 0,
    total: 59.99,
    coupon: null,
    buyer: { name: "Alex Gamer", email: "alex@example.com", phone: "+1 555-0101" },
    billing: { address: "123 Game St", city: "Los Angeles", country: "US" },
    paymentMethod: "Mock Card",
    paymentStatus: "Paid",
    deliveryStatus: "Ready for Delivery",
    sellerId: "seller-3",
    timeline: buildTimeline("Ready for Delivery", "2025-08-08T09:00:00Z"),
  },
  {
    id: "ORD-20250720-004",
    date: "2025-07-20T16:45:00Z",
    status: "Refunded",
    items: [
      {
        itemType: "product",
        itemId: "prod-5",
        name: "EA FC Mobile Points 5,000",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop",
        price: 39.99,
        quantity: 1,
      },
    ],
    subtotal: 39.99,
    discount: 0,
    total: 39.99,
    coupon: null,
    buyer: { name: "Alex Gamer", email: "alex@example.com", phone: "+1 555-0101" },
    billing: { address: "123 Game St", city: "Los Angeles", country: "US" },
    paymentMethod: "Mock Card",
    paymentStatus: "Refunded",
    deliveryStatus: "Cancelled",
    sellerId: "seller-2",
    timeline: [
      { status: "Pending", date: "2025-07-20T16:45:00Z", done: true, active: false },
      { status: "Payment Confirmed", date: "2025-07-20T16:46:00Z", done: true, active: false },
      { status: "Refunded", date: "2025-07-21T10:00:00Z", done: true, active: true },
    ],
  },
  {
    id: "ORD-20250810-005",
    date: "2025-08-10T11:20:00Z",
    status: "Pending",
    items: [
      {
        itemType: "account",
        itemId: "acc-3",
        name: "COD Legendary Loadout",
        image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=200&fit=crop",
        price: 149.99,
        quantity: 1,
      },
    ],
    subtotal: 149.99,
    discount: 0,
    total: 149.99,
    coupon: null,
    buyer: { name: "Alex Gamer", email: "alex@example.com", phone: "+1 555-0101" },
    billing: { address: "123 Game St", city: "Los Angeles", country: "US" },
    paymentMethod: "Mock Card",
    paymentStatus: "Pending",
    deliveryStatus: "Pending",
    sellerId: "seller-1",
    timeline: buildTimeline("Pending", "2025-08-10T11:20:00Z"),
  },
];

export function generateOrderId() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 900) + 100;
  return `ORD-${date}-${rand}`;
}
