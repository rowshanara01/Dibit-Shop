/** @type {import('./seller-types').SellerProfile} */
export const mockSellerProfile = {
  id: "seller-1",
  storeName: "NeonVault",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  description:
    "Premium gaming digital goods — top passes, skins, and high-rank accounts. Fast delivery guaranteed.",
  email: "seller@neonvault.com",
  phone: "+1 555-0200",
  level: "Trusted Seller",
  verificationStatus: "Verified",
  rating: 4.9,
  reviews: 342,
  joinedDate: "2024-01-15",
};

/** @type {import('./seller-types').SellerProduct[]} */
export const mockSellerProducts = [
  {
    id: "sp-1",
    slug: "pubg-royale-pass-premium",
    name: "PUBG Royale Pass Premium",
    category: "Game Pass",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    status: "Active",
    stock: 120,
    sales: 342,
  },
  {
    id: "sp-2",
    slug: "cod-battle-pass-s11",
    name: "COD Mobile Battle Pass S11",
    category: "Game Pass",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=200&fit=crop",
    status: "Active",
    stock: 85,
    sales: 567,
  },
  {
    id: "sp-3",
    slug: "pubg-uc-bundle-660",
    name: "PUBG UC Bundle 660",
    category: "Currency",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    status: "Active",
    stock: 200,
    sales: 890,
  },
  {
    id: "sp-4",
    slug: "premium-skin-pack",
    name: "Premium Skin Pack Vol. 3",
    category: "Skins",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    status: "Paused",
    stock: 0,
    sales: 45,
  },
  {
    id: "sp-5",
    slug: "starter-pack-bundle",
    name: "Starter Pack Bundle",
    category: "Bundle",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=200&fit=crop",
    status: "Draft",
    stock: 50,
    sales: 0,
  },
];

/** @type {import('./seller-types').SellerAccount[]} */
export const mockSellerAccounts = [
  {
    id: "sa-1",
    gameId: "pubg-mobile",
    gameName: "PUBG Mobile",
    title: "PUBG Conqueror Account",
    level: 78,
    rank: "Conqueror",
    rareItems: ["M416 Glacier", "Golden Mirado", "Pharaoh X-Suit"],
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    status: "Active",
    verificationStatus: "Verified",
  },
  {
    id: "sa-2",
    gameId: "cod-mobile",
    gameName: "Call of Duty Mobile",
    title: "COD Legendary Loadout",
    level: 150,
    rank: "Legendary",
    rareItems: ["Dark Matter AK", "Mythic Holger"],
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=200&fit=crop",
    status: "Active",
    verificationStatus: "Verified",
  },
  {
    id: "sa-3",
    gameId: "mobile-legends",
    gameName: "Mobile Legends",
    title: "ML Epic Account",
    level: 65,
    rank: "Epic",
    rareItems: ["Kagura Skin", "Gusion Epic"],
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1538481190775-a9415413164c?w=200&h=200&fit=crop",
    status: "Sold Out",
    verificationStatus: "Verified",
  },
];

/** @type {import('./seller-types').SellerOrder[]} */
export const mockSellerOrders = [
  {
    id: "ORD-20250801-001",
    itemName: "PUBG Royale Pass Premium",
    itemType: "product",
    buyer: { name: "Alex Gamer", email: "alex@example.com" },
    date: "2025-08-01T10:30:00Z",
    amount: 14.99,
    status: "Completed",
    deliveryStatus: "Delivered",
  },
  {
    id: "ORD-20250805-002",
    itemName: "PUBG Conqueror Account",
    itemType: "account",
    buyer: { name: "Alex Gamer", email: "alex@example.com" },
    date: "2025-08-05T14:15:00Z",
    amount: 270.0,
    status: "Processing",
    deliveryStatus: "Processing",
  },
  {
    id: "ORD-20250808-003",
    itemName: "COD Mobile Battle Pass S11",
    itemType: "product",
    buyer: { name: "Jamie Pro", email: "jamie@example.com" },
    date: "2025-08-08T09:00:00Z",
    amount: 9.99,
    status: "Ready for Delivery",
    deliveryStatus: "Ready for Delivery",
  },
  {
    id: "ORD-20250810-005",
    itemName: "COD Legendary Loadout",
    itemType: "account",
    buyer: { name: "Alex Gamer", email: "alex@example.com" },
    date: "2025-08-10T11:20:00Z",
    amount: 149.99,
    status: "Pending",
    deliveryStatus: "Pending",
  },
  {
    id: "ORD-20250720-004",
    itemName: "Premium Skin Pack Vol. 3",
    itemType: "product",
    buyer: { name: "Sam Lee", email: "sam@example.com" },
    date: "2025-07-20T16:45:00Z",
    amount: 19.99,
    status: "Refunded",
    deliveryStatus: "Cancelled",
  },
];

/** @type {import('./seller-types').SellerEarnings} */
export const mockSellerEarnings = {
  totalRevenue: 12450.0,
  availableBalance: 890.5,
  pendingBalance: 245.0,
  totalSales: 2840,
  commissionRate: 0.08,
  platformFees: 996.0,
};

/** @type {import('./seller-types').EarningTransaction[]} */
export const mockEarningTransactions = [
  { id: "et-1", label: "Sale — PUBG Royale Pass", amount: 14.99, type: "credit", date: "2025-08-01T10:35:00Z" },
  { id: "et-2", label: "Sale — PUBG Conqueror Account", amount: 270.0, type: "credit", date: "2025-08-05T14:20:00Z" },
  { id: "et-3", label: "Platform fee (8%)", amount: 21.6, type: "debit", date: "2025-08-05T14:20:00Z" },
  { id: "et-4", label: "Withdrawal", amount: 500.0, type: "debit", date: "2025-08-01T09:00:00Z" },
  { id: "et-5", label: "Sale — COD Battle Pass", amount: 9.99, type: "credit", date: "2025-08-08T09:05:00Z" },
  { id: "et-6", label: "Refund — Skin Pack", amount: 19.99, type: "debit", date: "2025-07-21T10:00:00Z" },
  { id: "et-7", label: "Sale — UC Bundle 660", amount: 9.99, type: "credit", date: "2025-08-12T15:00:00Z" },
];

/** @type {import('./seller-types').Withdrawal[]} */
export const mockWithdrawals = [
  { id: "wd-1", amount: 500.0, method: "Mock Bank Transfer", status: "Completed", date: "2025-08-01T09:00:00Z" },
  { id: "wd-2", amount: 250.0, method: "Mock PayPal", status: "Processing", date: "2025-08-10T14:00:00Z" },
  { id: "wd-3", amount: 100.0, method: "Mock Bank Transfer", status: "Pending", date: "2025-08-14T11:00:00Z" },
  { id: "wd-4", amount: 1000.0, method: "Mock Crypto", status: "Rejected", date: "2025-07-15T10:00:00Z" },
];

/** @type {import('./seller-types').EarningsChartData} */
export const mockEarningsChart = [
  { month: "Mar", amount: 820 },
  { month: "Apr", amount: 1150 },
  { month: "May", amount: 980 },
  { month: "Jun", amount: 1420 },
  { month: "Jul", amount: 1680 },
  { month: "Aug", amount: 1240 },
];

export const SELLER_LEVELS = [
  "New Seller",
  "Verified Seller",
  "Trusted Seller",
  "Top Seller",
];

export const LISTING_STATUSES = ["Active", "Draft", "Paused", "Sold Out"];

export function generateWithdrawalId() {
  return `wd-${Math.floor(Math.random() * 9000) + 1000}`;
}

export function generateSellerProductId() {
  return `sp-${Math.floor(Math.random() * 900) + 100}`;
}

export function generateSellerAccountId() {
  return `sa-${Math.floor(Math.random() * 900) + 100}`;
}
