/** @type {import('./buyer-types').UserProfile} */
export const mockProfile = {
  name: "Alex Gamer",
  email: "alex@example.com",
  phone: "+1 555-0101",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  preferences: {
    orderUpdates: true,
    promotions: true,
    deliveryAlerts: false,
  },
};

export const mockWalletBalance = 125.5;

/** @type {import('./buyer-types').WalletTransaction[]} */
export const mockTransactions = [
  {
    id: "tx-1",
    type: "credit",
    amount: 50.0,
    status: "Completed",
    date: "2025-08-14T10:00:00Z",
    label: "Added funds (Mock)",
  },
  {
    id: "tx-2",
    type: "debit",
    amount: 14.99,
    status: "Completed",
    date: "2025-08-01T10:35:00Z",
    label: "Purchase — PUBG Royale Pass",
  },
  {
    id: "tx-3",
    type: "debit",
    amount: 270.0,
    status: "Completed",
    date: "2025-08-05T14:20:00Z",
    label: "Purchase — PUBG Conqueror Account",
  },
  {
    id: "tx-4",
    type: "credit",
    amount: 39.99,
    status: "Completed",
    date: "2025-07-21T10:00:00Z",
    label: "Refund — EA FC Points",
  },
  {
    id: "tx-5",
    type: "credit",
    amount: 25.0,
    status: "Pending",
    date: "2025-08-15T08:00:00Z",
    label: "Added funds (Mock)",
  },
];

/** @type {import('./buyer-types').Purchase[]} */
export const mockPurchases = [
  {
    id: "pur-1",
    orderId: "ORD-20250801-001",
    itemType: "product",
    itemId: "prod-1",
    name: "PUBG Royale Pass Premium",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    date: "2025-08-01T10:30:00Z",
    status: "Completed",
  },
  {
    id: "pur-2",
    orderId: "ORD-20250805-002",
    itemType: "account",
    itemId: "acc-1",
    name: "PUBG Conqueror Account",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    date: "2025-08-05T14:15:00Z",
    status: "Processing",
  },
  {
    id: "pur-3",
    orderId: "ORD-20250808-003",
    itemType: "product",
    itemId: "prod-4",
    name: "Steam Gift Card $50",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
    date: "2025-08-08T09:00:00Z",
    status: "Ready for Delivery",
  },
  {
    id: "pur-4",
    orderId: "ORD-20250720-004",
    itemType: "product",
    itemId: "prod-5",
    name: "EA FC Mobile Points 5,000",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop",
    date: "2025-07-20T16:45:00Z",
    status: "Refunded",
  },
];

export const TICKET_CATEGORIES = [
  "Payment",
  "Top-Up",
  "Account Purchase",
  "Refund",
  "Other",
];

/** @type {import('./buyer-types').SupportTicket[]} */
export const mockTickets = [
  {
    id: "TKT-001",
    subject: "Top-up not received",
    category: "Top-Up",
    status: "In Progress",
    date: "2025-08-12T09:00:00Z",
    description: "Purchased 3,250 UC for PUBG Mobile but haven't received it yet.",
    messages: [
      {
        id: "m-1",
        from: "user",
        text: "Purchased 3,250 UC for PUBG Mobile but haven't received it yet.",
        date: "2025-08-12T09:00:00Z",
      },
      {
        id: "m-2",
        from: "support",
        text: "We're looking into this. Please allow up to 30 minutes for delivery.",
        date: "2025-08-12T09:15:00Z",
      },
    ],
  },
  {
    id: "TKT-002",
    subject: "Refund request for EA FC Points",
    category: "Refund",
    status: "Resolved",
    date: "2025-07-21T11:00:00Z",
    description: "Requesting refund for undelivered FC Points order.",
    messages: [
      {
        id: "m-3",
        from: "user",
        text: "Requesting refund for undelivered FC Points order.",
        date: "2025-07-21T11:00:00Z",
      },
      {
        id: "m-4",
        from: "support",
        text: "Refund processed. Funds returned to your wallet.",
        date: "2025-07-21T14:00:00Z",
      },
    ],
  },
  {
    id: "TKT-003",
    subject: "Account credentials issue",
    category: "Account Purchase",
    status: "Open",
    date: "2025-08-14T16:30:00Z",
    description: "Unable to log in to purchased ML account.",
    messages: [
      {
        id: "m-5",
        from: "user",
        text: "Unable to log in to purchased ML account.",
        date: "2025-08-14T16:30:00Z",
      },
    ],
  },
];

/** @type {import('./buyer-types').Notification[]} */
export const mockNotifications = [
  {
    id: "n-1",
    type: "order",
    title: "Order Processing",
    message: "Your PUBG Conqueror Account order is being processed.",
    read: false,
    date: "2025-08-05T14:20:00Z",
    href: "/orders/ORD-20250805-002",
  },
  {
    id: "n-2",
    type: "delivery",
    title: "Ready for Delivery",
    message: "Steam Gift Card is ready for delivery.",
    read: false,
    date: "2025-08-08T10:00:00Z",
    href: "/orders/ORD-20250808-003",
  },
  {
    id: "n-3",
    type: "payment",
    title: "Payment Confirmed",
    message: "Payment of $14.99 confirmed for PUBG Royale Pass.",
    read: true,
    date: "2025-08-01T10:31:00Z",
    href: "/orders/ORD-20250801-001",
  },
  {
    id: "n-4",
    type: "promotion",
    title: "Weekend Sale — 20% Off",
    message: "Use code ANONY10 for 10% off all top-ups this weekend.",
    read: false,
    date: "2025-08-14T08:00:00Z",
  },
  {
    id: "n-5",
    type: "order",
    title: "Order Completed",
    message: "Your PUBG Royale Pass order has been completed.",
    read: true,
    date: "2025-08-01T12:00:00Z",
    href: "/orders/ORD-20250801-001",
  },
  {
    id: "n-6",
    type: "payment",
    title: "Refund Processed",
    message: "$39.99 refunded to your wallet for order ORD-20250720-004.",
    read: true,
    date: "2025-07-21T10:00:00Z",
    href: "/wallet",
  },
  {
    id: "n-7",
    type: "delivery",
    title: "Delivery Update",
    message: "Your COD Legendary Loadout account details are pending verification.",
    read: false,
    date: "2025-08-10T11:30:00Z",
    href: "/orders/ORD-20250810-005",
  },
];

export function generateTicketId() {
  const rand = Math.floor(Math.random() * 900) + 100;
  return `TKT-${rand}`;
}

export function generateTransactionId() {
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `tx-${rand}`;
}
