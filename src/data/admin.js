import { mockOrders } from "./shop";

/** @type {import('./admin-types').AdminUser[]} */
export const mockAdminUsers = [
  { id: "u-1", name: "Alex Gamer", email: "alex@example.com", role: "buyer", status: "Active", joined: "2025-03-12T10:00:00Z" },
  { id: "u-2", name: "Jamie Pro", email: "jamie@example.com", role: "buyer", status: "Active", joined: "2025-04-02T09:00:00Z" },
  { id: "u-3", name: "NeonVault", email: "seller@neonvault.com", role: "seller", status: "Active", joined: "2024-01-15T08:00:00Z" },
  { id: "u-4", name: "CyberLoot", email: "hi@cyberloot.shop", role: "seller", status: "Pending", joined: "2025-08-01T12:00:00Z" },
  { id: "u-5", name: "NeonForge", email: "partners@neonforge.dev", role: "publisher", status: "Active", joined: "2024-06-20T11:00:00Z" },
  { id: "u-6", name: "Sam Lee", email: "sam@example.com", role: "buyer", status: "Suspended", joined: "2025-02-18T16:00:00Z" },
  { id: "u-7", name: "Admin Kim", email: "admin@anonyshop.demo", role: "admin", status: "Active", joined: "2024-01-01T00:00:00Z" },
];

/** Admin orders reuse marketplace orders with owner labels. */
export const mockAdminOrders = mockOrders.slice(0, 6).map((o) => ({
  ...o,
  ownerName: o.sellerId === "seller-3" ? "PixelForge" : o.sellerId === "seller-2" ? "CyberLoot" : "NeonVault",
  ownerType: o.items[0]?.itemType === "account" ? "seller" : "seller",
}));

/** @type {import('./admin-types').AdminSeller[]} */
export const mockAdminSellers = [
  { id: "seller-1", storeName: "NeonVault", email: "seller@neonvault.com", verification: "Approved", level: "Trusted Seller", rating: 4.9, products: 5, orders: 2840, sales: 12450 },
  { id: "seller-2", storeName: "CyberLoot", email: "hi@cyberloot.shop", verification: "Pending", level: "New Seller", rating: 4.7, products: 3, orders: 1520, sales: 4820 },
  { id: "seller-3", storeName: "PixelForge", email: "hello@pixelforge.io", verification: "Approved", level: "Verified Seller", rating: 4.8, products: 4, orders: 980, sales: 3210 },
  { id: "seller-4", storeName: "DarkByte", email: "ops@darkbyte.gg", verification: "Suspended", level: "New Seller", rating: 3.9, products: 2, orders: 44, sales: 210 },
];

/** @type {import('./admin-types').AdminPublisher[]} */
export const mockAdminPublishers = [
  { id: "pub-1", name: "NeonForge", company: "NeonForge Studios", email: "partners@neonforge.dev", verification: "Approved", games: 4, products: 7, orders: 2478, revenue: 18420 },
  { id: "pub-2", name: "Moonton Official", company: "Moonton", email: "partners@moonton.demo", verification: "Pending", games: 1, products: 2, orders: 120, revenue: 890 },
  { id: "pub-3", name: "Tencent Games", company: "Tencent", email: "biz@tencent.demo", verification: "Approved", games: 2, products: 5, orders: 5400, revenue: 92000 },
];

/** @type {import('./admin-types').AdminCatalogItem[]} */
export const mockAdminCatalog = [
  { id: "cat-1", kind: "product", name: "PUBG Royale Pass Premium", owner: "NeonVault", ownerType: "seller", approval: "Approved", featured: true, price: 14.99, status: "Active" },
  { id: "cat-2", kind: "product", name: "COD Mobile Battle Pass S11", owner: "NeonVault", ownerType: "seller", approval: "Approved", featured: false, price: 9.99, status: "Active" },
  { id: "cat-3", kind: "account", name: "PUBG Conqueror Account", owner: "NeonVault", ownerType: "seller", approval: "Pending", featured: false, price: 299.99, status: "Pending Review" },
  { id: "cat-4", kind: "product", name: "3,250 UC", owner: "NeonForge", ownerType: "publisher", approval: "Approved", featured: true, price: 49.99, status: "Approved" },
  { id: "cat-5", kind: "game", name: "Honor of Kings", owner: "NeonForge", ownerType: "publisher", approval: "Rejected", featured: false, price: 0, status: "Paused" },
  { id: "cat-6", kind: "product", name: "Starter Pack Bundle", owner: "CyberLoot", ownerType: "seller", approval: "Pending", featured: false, price: 4.99, status: "Draft" },
  { id: "cat-7", kind: "account", name: "ML Epic Account", owner: "PixelForge", ownerType: "seller", approval: "Suspended", featured: false, price: 89.99, status: "Sold Out" },
];

/** @type {import('./admin-types').AdminDispute[]} */
export const mockAdminDisputes = [
  { id: "DSP-101", orderId: "ORD-20250720-004", buyer: "Alex Gamer", seller: "CyberLoot", reason: "Item not delivered", status: "Refunded", date: "2025-07-21T09:00:00Z", evidence: "Screenshot of empty inventory (mock)." },
  { id: "DSP-102", orderId: "ORD-20250805-002", buyer: "Alex Gamer", seller: "NeonVault", reason: "Account credentials mismatch", status: "Under Review", date: "2025-08-06T11:00:00Z", evidence: "Login error screenshot (mock)." },
  { id: "DSP-103", orderId: "ORD-20250810-005", buyer: "Jamie Pro", seller: "NeonVault", reason: "Wrong rank advertised", status: "Open", date: "2025-08-11T08:30:00Z", evidence: "Rank screenshot vs listing (mock)." },
  { id: "DSP-104", orderId: "ORD-20250808-003", buyer: "Sam Lee", seller: "PixelForge", reason: "Gift card code invalid", status: "Rejected", date: "2025-08-09T14:00:00Z", evidence: "Redeem error (mock)." },
];

/** @type {{ month: string, amount: number }[]} */
export const mockAdminChart = [
  { month: "Mar", amount: 8200 },
  { month: "Apr", amount: 9400 },
  { month: "May", amount: 10120 },
  { month: "Jun", amount: 12840 },
  { month: "Jul", amount: 15110 },
  { month: "Aug", amount: 14260 },
];

export const mockAdminActivity = [
  { id: "act-1", text: "CyberLoot submitted seller verification", date: "2025-08-14T10:00:00Z" },
  { id: "act-2", text: "Dispute DSP-102 marked Under Review", date: "2025-08-06T11:05:00Z" },
  { id: "act-3", text: "Honor of Kings listing rejected", date: "2025-08-04T16:20:00Z" },
  { id: "act-4", text: "Order ORD-20250801-001 completed", date: "2025-08-01T12:00:00Z" },
];

/** @type {import('./admin-types').AdminSettings} */
export const mockAdminSettings = {
  sellerCommission: 8,
  publisherMarkup: 5,
  marketplaceLive: true,
  newListingsNeedReview: true,
  emailAlerts: true,
  twoFactorRequired: false,
  auditLog: true,
};

export const REVIEW_STATUSES = ["Pending", "Approved", "Rejected", "Suspended"];

export const REVIEW_VARIANT = {
  Pending: "warning",
  Approved: "success",
  Rejected: "hot",
  Suspended: "hot",
};

export const DISPUTE_VARIANT = {
  Open: "warning",
  "Under Review": "default",
  Refunded: "success",
  Released: "success",
  Rejected: "hot",
};
