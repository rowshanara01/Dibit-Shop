"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import {
  products,
  gameAccounts,
  topUpPackages,
  getSellerById,
} from "@/data/mock";
import {
  initialCartItems,
  initialWishlistItems,
  mockOrders,
  COUPONS,
  generateOrderId,
} from "@/data/shop";
import {
  mockProfile,
  mockWalletBalance,
  mockTransactions,
  mockPurchases,
  mockTickets,
  mockNotifications,
  generateTicketId,
  generateTransactionId,
} from "@/data/buyer";
import {
  mockSellerProfile,
  mockSellerProducts,
  mockSellerAccounts,
  mockSellerOrders,
  mockSellerEarnings,
  mockEarningTransactions,
  mockWithdrawals,
  mockEarningsChart,
  generateWithdrawalId,
  generateSellerProductId,
  generateSellerAccountId,
} from "@/data/seller";
import {
  mockPublisherProfile,
  mockPublisherGames,
  mockPublisherProducts,
  mockPublisherOrders,
  mockPublisherRevenue,
  mockPublisherApiKeys,
  mockPublisherWebhooks,
  mockWebhookLogs,
  generatePublisherId,
  maskApiKey,
} from "@/data/publisher";
import {
  mockAdminUsers,
  mockAdminOrders,
  mockAdminSellers,
  mockAdminPublishers,
  mockAdminCatalog,
  mockAdminDisputes,
  mockAdminSettings,
} from "@/data/admin";

const STORAGE_KEYS = {
  cart: "anonyshop_cart",
  wishlist: "anonyshop_wishlist",
  orders: "anonyshop_orders",
  wallet: "anonyshop_wallet",
  transactions: "anonyshop_transactions",
  tickets: "anonyshop_tickets",
  notifications: "anonyshop_notifications",
  profile: "anonyshop_profile",
  sellerProfile: "anonyshop_seller_profile",
  sellerProducts: "anonyshop_seller_products",
  sellerAccounts: "anonyshop_seller_accounts",
  sellerOrders: "anonyshop_seller_orders",
  sellerEarnings: "anonyshop_seller_earnings",
  earningTransactions: "anonyshop_earning_transactions",
  withdrawals: "anonyshop_withdrawals",
  publisherProfile: "anonyshop_publisher_profile",
  publisherGames: "anonyshop_publisher_games",
  publisherProducts: "anonyshop_publisher_products",
  publisherOrders: "anonyshop_publisher_orders",
  publisherApiKeys: "anonyshop_publisher_api_keys",
  publisherWebhooks: "anonyshop_publisher_webhooks",
  adminUsers: "anonyshop_admin_users",
  adminSellers: "anonyshop_admin_sellers",
  adminPublishers: "anonyshop_admin_publishers",
  adminCatalog: "anonyshop_admin_catalog",
  adminDisputes: "anonyshop_admin_disputes",
  adminSettings: "anonyshop_admin_settings",
};

/** @param {import('./shop-types').ItemType} itemType @param {string} itemId */
export function resolveItem(itemType, itemId) {
  if (itemType === "product") {
    const p = products.find((x) => x.id === itemId);
    if (!p) return null;
    return {
      itemType,
      itemId,
      name: p.name,
      image: p.image,
      price: p.price,
      typeLabel: p.category,
      sellerId: p.sellerId,
      href: `/products/${p.slug}`,
    };
  }
  if (itemType === "account") {
    const a = gameAccounts.find((x) => x.id === itemId);
    if (!a) return null;
    return {
      itemType,
      itemId,
      name: a.title,
      image: a.image,
      price: a.price,
      typeLabel: "Account",
      sellerId: a.sellerId,
      href: `/accounts/${a.id}`,
    };
  }
  if (itemType === "topup") {
    const t = topUpPackages.find((x) => x.id === itemId);
    if (!t) return null;
    return {
      itemType,
      itemId,
      name: t.name,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
      price: t.price,
      typeLabel: "Top-Up",
      sellerId: null,
      href: "/top-up",
    };
  }
  return null;
}

function loadStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

/** @param {{ itemType: import('./shop-types').ItemType, itemId: string, quantity: number }[]} raw */
function hydrateCart(raw) {
  return raw
    .map((entry) => {
      const resolved = resolveItem(entry.itemType, entry.itemId);
      if (!resolved) return null;
      return {
        id: `${entry.itemType}-${entry.itemId}`,
        ...resolved,
        quantity: entry.quantity,
      };
    })
    .filter(Boolean);
}

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [walletBalance, setWalletBalance] = useState(mockWalletBalance);
  const [transactions, setTransactions] = useState([]);
  const [purchases] = useState(mockPurchases);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState(mockProfile);
  const [sellerProfile, setSellerProfile] = useState(mockSellerProfile);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerAccounts, setSellerAccounts] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [sellerEarnings, setSellerEarnings] = useState(mockSellerEarnings);
  const [earningTransactions, setEarningTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [publisherProfile, setPublisherProfile] = useState(mockPublisherProfile);
  const [publisherGames, setPublisherGames] = useState([]);
  const [publisherProducts, setPublisherProducts] = useState([]);
  const [publisherOrders, setPublisherOrders] = useState([]);
  const [publisherRevenue] = useState(mockPublisherRevenue);
  const [publisherApiKeys, setPublisherApiKeys] = useState([]);
  const [publisherWebhooks, setPublisherWebhooks] = useState([]);
  const [webhookLogs] = useState(mockWebhookLogs);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminOrders] = useState(mockAdminOrders);
  const [adminSellers, setAdminSellers] = useState([]);
  const [adminPublishers, setAdminPublishers] = useState([]);
  const [adminCatalog, setAdminCatalog] = useState([]);
  const [adminDisputes, setAdminDisputes] = useState([]);
  const [adminSettings, setAdminSettings] = useState(mockAdminSettings);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setCart(hydrateCart(loadStorage(STORAGE_KEYS.cart, initialCartItems)));
    setWishlist(loadStorage(STORAGE_KEYS.wishlist, initialWishlistItems));
    setOrders(loadStorage(STORAGE_KEYS.orders, mockOrders));
    setWalletBalance(loadStorage(STORAGE_KEYS.wallet, mockWalletBalance));
    setTransactions(loadStorage(STORAGE_KEYS.transactions, mockTransactions));
    setTickets(loadStorage(STORAGE_KEYS.tickets, mockTickets));
    setNotifications(loadStorage(STORAGE_KEYS.notifications, mockNotifications));
    setProfile(loadStorage(STORAGE_KEYS.profile, mockProfile));
    setSellerProfile(loadStorage(STORAGE_KEYS.sellerProfile, mockSellerProfile));
    setSellerProducts(loadStorage(STORAGE_KEYS.sellerProducts, mockSellerProducts));
    setSellerAccounts(loadStorage(STORAGE_KEYS.sellerAccounts, mockSellerAccounts));
    setSellerOrders(loadStorage(STORAGE_KEYS.sellerOrders, mockSellerOrders));
    setSellerEarnings(loadStorage(STORAGE_KEYS.sellerEarnings, mockSellerEarnings));
    setEarningTransactions(loadStorage(STORAGE_KEYS.earningTransactions, mockEarningTransactions));
    setWithdrawals(loadStorage(STORAGE_KEYS.withdrawals, mockWithdrawals));
    setPublisherProfile(loadStorage(STORAGE_KEYS.publisherProfile, mockPublisherProfile));
    setPublisherGames(loadStorage(STORAGE_KEYS.publisherGames, mockPublisherGames));
    setPublisherProducts(loadStorage(STORAGE_KEYS.publisherProducts, mockPublisherProducts));
    setPublisherOrders(loadStorage(STORAGE_KEYS.publisherOrders, mockPublisherOrders));
    setPublisherApiKeys(loadStorage(STORAGE_KEYS.publisherApiKeys, mockPublisherApiKeys));
    setPublisherWebhooks(loadStorage(STORAGE_KEYS.publisherWebhooks, mockPublisherWebhooks));
    setAdminUsers(loadStorage(STORAGE_KEYS.adminUsers, mockAdminUsers));
    setAdminSellers(loadStorage(STORAGE_KEYS.adminSellers, mockAdminSellers));
    setAdminPublishers(loadStorage(STORAGE_KEYS.adminPublishers, mockAdminPublishers));
    setAdminCatalog(loadStorage(STORAGE_KEYS.adminCatalog, mockAdminCatalog));
    setAdminDisputes(loadStorage(STORAGE_KEYS.adminDisputes, mockAdminDisputes));
    setAdminSettings(loadStorage(STORAGE_KEYS.adminSettings, mockAdminSettings));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(
      STORAGE_KEYS.cart,
      cart.map(({ itemType, itemId, quantity }) => ({ itemType, itemId, quantity }))
    );
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.wishlist, wishlist);
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.orders, orders);
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.wallet, walletBalance);
  }, [walletBalance, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.transactions, transactions);
  }, [transactions, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.tickets, tickets);
  }, [tickets, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.notifications, notifications);
  }, [notifications, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.profile, profile);
  }, [profile, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.sellerProfile, sellerProfile);
  }, [sellerProfile, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.sellerProducts, sellerProducts);
  }, [sellerProducts, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.sellerAccounts, sellerAccounts);
  }, [sellerAccounts, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.sellerOrders, sellerOrders);
  }, [sellerOrders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.sellerEarnings, sellerEarnings);
  }, [sellerEarnings, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.earningTransactions, earningTransactions);
  }, [earningTransactions, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.withdrawals, withdrawals);
  }, [withdrawals, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.publisherProfile, publisherProfile);
  }, [publisherProfile, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.publisherGames, publisherGames);
  }, [publisherGames, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.publisherProducts, publisherProducts);
  }, [publisherProducts, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.publisherOrders, publisherOrders);
  }, [publisherOrders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.publisherApiKeys, publisherApiKeys);
  }, [publisherApiKeys, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.publisherWebhooks, publisherWebhooks);
  }, [publisherWebhooks, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.adminUsers, adminUsers);
  }, [adminUsers, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.adminSellers, adminSellers);
  }, [adminSellers, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.adminPublishers, adminPublishers);
  }, [adminPublishers, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.adminCatalog, adminCatalog);
  }, [adminCatalog, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.adminDisputes, adminDisputes);
  }, [adminDisputes, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveStorage(STORAGE_KEYS.adminSettings, adminSettings);
  }, [adminSettings, hydrated]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback(
    (itemType, itemId, quantity = 1) => {
      const resolved = resolveItem(itemType, itemId);
      if (!resolved) return;
      const id = `${itemType}-${itemId}`;

      setCart((prev) => {
        const existing = prev.find((i) => i.id === id);
        if (existing) {
          return prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { id, ...resolved, quantity }];
      });
      showToast(`Added ${resolved.name} to cart`);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (cartItemId) => {
      setCart((prev) => prev.filter((i) => i.id !== cartItemId));
      showToast("Item removed from cart", "info");
    },
    [showToast]
  );

  const updateQuantity = useCallback((cartItemId, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addToWishlist = useCallback(
    (itemType, itemId) => {
      setWishlist((prev) => {
        if (prev.some((w) => w.itemType === itemType && w.itemId === itemId)) {
          showToast("Already in wishlist", "info");
          return prev;
        }
        const resolved = resolveItem(itemType, itemId);
        showToast(resolved ? `Added ${resolved.name} to wishlist` : "Added to wishlist");
        return [...prev, { itemType, itemId }];
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (itemType, itemId) => {
      setWishlist((prev) =>
        prev.filter((w) => !(w.itemType === itemType && w.itemId === itemId))
      );
      showToast("Removed from wishlist", "info");
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (itemType, itemId) =>
      wishlist.some((w) => w.itemType === itemType && w.itemId === itemId),
    [wishlist]
  );

  const getCartSubtotal = useCallback(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  const calcDiscount = useCallback(
    (couponCode, subtotal) => {
      if (!couponCode) return 0;
      const coupon = COUPONS[couponCode.toUpperCase()];
      if (!coupon) return null;
      if (coupon.fixed) return Math.min(coupon.discount, subtotal);
      return subtotal * coupon.discount;
    },
    []
  );

  const placeOrder = useCallback(
    (checkoutData) => {
      const subtotal = getCartSubtotal();
      const discount = checkoutData.discount || 0;
      const total = Math.max(0, subtotal - discount);

      const orderItems = cart.map(({ itemType, itemId, name, image, price, quantity }) => ({
        itemType,
        itemId,
        name,
        image,
        price,
        quantity,
      }));

      const sellerId =
        cart.find((i) => i.sellerId)?.sellerId || "seller-1";

      const now = new Date().toISOString();
      /** @type {import('@/data/shop-types').Order} */
      const order = {
        id: generateOrderId(),
        date: now,
        status: "Payment Confirmed",
        items: orderItems,
        subtotal,
        discount,
        total,
        coupon: checkoutData.coupon || null,
        buyer: checkoutData.buyer,
        billing: checkoutData.billing,
        paymentMethod: checkoutData.paymentMethod,
        paymentStatus: "Paid",
        deliveryStatus: "Processing",
        sellerId,
        timeline: [
          { status: "Pending", date: now, done: true, active: false },
          { status: "Payment Confirmed", date: now, done: true, active: true },
          { status: "Processing", date: now, done: false, active: false },
          { status: "Ready for Delivery", date: now, done: false, active: false },
          { status: "Delivered", date: now, done: false, active: false },
          { status: "Completed", date: now, done: false, active: false },
        ],
      };

      setOrders((prev) => [order, ...prev]);
      clearCart();
      return order;
    },
    [cart, getCartSubtotal, clearCart]
  );

  const getOrder = useCallback(
    (id) => orders.find((o) => o.id === id),
    [orders]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addMoney = useCallback(
    (amount) => {
      if (!amount || amount <= 0) return false;
      const tx = {
        id: generateTransactionId(),
        type: "credit",
        amount,
        status: "Completed",
        date: new Date().toISOString(),
        label: "Added funds (Mock)",
      };
      setWalletBalance((b) => b + amount);
      setTransactions((prev) => [tx, ...prev]);
      showToast(`$${amount.toFixed(2)} added to wallet (demo)`);
      return true;
    },
    [showToast]
  );

  const createTicket = useCallback(
    ({ subject, category, description }) => {
      const now = new Date().toISOString();
      /** @type {import('@/data/buyer-types').SupportTicket} */
      const ticket = {
        id: generateTicketId(),
        subject,
        category,
        status: "Open",
        date: now,
        description,
        messages: [{ id: `m-${Date.now()}`, from: "user", text: description, date: now }],
      };
      setTickets((prev) => [ticket, ...prev]);
      showToast("Support ticket created");
      return ticket;
    },
    [showToast]
  );

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read", "info");
  }, [showToast]);

  const updateProfile = useCallback(
    (data) => {
      setProfile((prev) => ({ ...prev, ...data }));
      showToast("Profile updated");
    },
    [showToast]
  );

  const updatePreferences = useCallback(
    (preferences) => {
      setProfile((prev) => ({ ...prev, preferences: { ...prev.preferences, ...preferences } }));
      showToast("Preferences saved");
    },
    [showToast]
  );

  const completedOrdersCount = orders.filter(
    (o) => o.status === "Completed" || o.status === "Delivered"
  ).length;

  const updateSellerProfile = useCallback(
    (data) => {
      setSellerProfile((prev) => ({ ...prev, ...data }));
      showToast("Store profile updated");
    },
    [showToast]
  );

  const deleteSellerProduct = useCallback(
    (id) => {
      setSellerProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted", "info");
    },
    [showToast]
  );

  const updateSellerProduct = useCallback(
    (id, data) => {
      setSellerProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      showToast("Product updated");
    },
    [showToast]
  );

  const addSellerProduct = useCallback(
    (product) => {
      const newProduct = {
        id: generateSellerProductId(),
        slug: product.name.toLowerCase().replace(/\s+/g, "-"),
        sales: 0,
        status: "Draft",
        ...product,
      };
      setSellerProducts((prev) => [newProduct, ...prev]);
      showToast("Product added");
      return newProduct;
    },
    [showToast]
  );

  const deleteSellerAccount = useCallback(
    (id) => {
      setSellerAccounts((prev) => prev.filter((a) => a.id !== id));
      showToast("Account listing removed", "info");
    },
    [showToast]
  );

  const updateSellerAccount = useCallback(
    (id, data) => {
      setSellerAccounts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
      showToast("Account listing updated");
    },
    [showToast]
  );

  const addSellerAccount = useCallback(
    (account) => {
      const newAccount = {
        id: generateSellerAccountId(),
        verificationStatus: "Pending",
        status: "Draft",
        ...account,
      };
      setSellerAccounts((prev) => [newAccount, ...prev]);
      showToast("Account listing added");
      return newAccount;
    },
    [showToast]
  );

  const getSellerOrder = useCallback(
    (id) => sellerOrders.find((o) => o.id === id),
    [sellerOrders]
  );

  const requestWithdrawal = useCallback(
    (amount, method) => {
      if (!amount || amount <= 0) return { ok: false, error: "Invalid amount" };
      if (amount > sellerEarnings.availableBalance) {
        return { ok: false, error: "Insufficient balance" };
      }
      const withdrawal = {
        id: generateWithdrawalId(),
        amount,
        method,
        status: "Pending",
        date: new Date().toISOString(),
      };
      setWithdrawals((prev) => [withdrawal, ...prev]);
      setSellerEarnings((prev) => ({
        ...prev,
        availableBalance: prev.availableBalance - amount,
        pendingBalance: prev.pendingBalance + amount,
      }));
      setEarningTransactions((prev) => [
        {
          id: `et-${Date.now()}`,
          label: `Withdrawal request — ${method}`,
          amount,
          type: "debit",
          date: withdrawal.date,
        },
        ...prev,
      ]);
      showToast("Withdrawal request submitted (demo)");
      return { ok: true, withdrawal };
    },
    [sellerEarnings.availableBalance, showToast]
  );

  const updatePublisherProfile = useCallback(
    (data) => {
      setPublisherProfile((prev) => ({ ...prev, ...data }));
      showToast("Publisher profile updated");
    },
    [showToast]
  );

  const addPublisherGame = useCallback(
    (game) => {
      const next = { id: generatePublisherId("pg"), packageCount: 0, status: "Draft", ...game };
      setPublisherGames((prev) => [next, ...prev]);
      showToast("Game added");
      return next;
    },
    [showToast]
  );

  const updatePublisherGame = useCallback(
    (id, data) => {
      setPublisherGames((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
      showToast("Game updated");
    },
    [showToast]
  );

  const deletePublisherGame = useCallback(
    (id) => {
      setPublisherGames((prev) => prev.filter((g) => g.id !== id));
      showToast("Game removed", "info");
    },
    [showToast]
  );

  const addPublisherProduct = useCallback(
    (product) => {
      const next = { id: generatePublisherId("pp"), sales: 0, status: "Draft", ...product };
      setPublisherProducts((prev) => [next, ...prev]);
      showToast("Product added");
      return next;
    },
    [showToast]
  );

  const updatePublisherProduct = useCallback(
    (id, data) => {
      setPublisherProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
      showToast("Product updated");
    },
    [showToast]
  );

  const deletePublisherProduct = useCallback(
    (id) => {
      setPublisherProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product removed", "info");
    },
    [showToast]
  );

  const regenerateApiKey = useCallback(
    (id) => {
      setPublisherApiKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, masked: maskApiKey(), lastUsed: new Date().toISOString() } : k))
      );
      showToast("API key regenerated (mock)");
    },
    [showToast]
  );

  const copyApiKey = useCallback(
    (key) => {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(key.masked).catch(() => {});
      }
      showToast("Masked key copied — demo only", "info");
    },
    [showToast]
  );

  const addPublisherWebhook = useCallback(
    (webhook) => {
      const next = {
        id: generatePublisherId("wh"),
        status: "Active",
        created: new Date().toISOString(),
        ...webhook,
      };
      setPublisherWebhooks((prev) => [next, ...prev]);
      showToast("Webhook added");
      return next;
    },
    [showToast]
  );

  const updatePublisherWebhook = useCallback(
    (id, data) => {
      setPublisherWebhooks((prev) => prev.map((w) => (w.id === id ? { ...w, ...data } : w)));
      showToast("Webhook updated");
    },
    [showToast]
  );

  const deletePublisherWebhook = useCallback(
    (id) => {
      setPublisherWebhooks((prev) => prev.filter((w) => w.id !== id));
      showToast("Webhook removed", "info");
    },
    [showToast]
  );

  const testPublisherWebhook = useCallback(
    (id) => {
      const hook = publisherWebhooks.find((w) => w.id === id);
      if (!hook || hook.status !== "Active") {
        showToast("Webhook inactive — test skipped", "info");
        return;
      }
      showToast("Mock test delivery sent (200)");
    },
    [publisherWebhooks, showToast]
  );

  const patchById = useCallback((setter, id, data, message) => {
    setter((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
    showToast(message);
  }, [showToast]);

  const updateAdminUser = useCallback(
    (id, data) => patchById(setAdminUsers, id, data, "User updated (mock)"),
    [patchById]
  );
  const updateAdminSeller = useCallback(
    (id, data) => patchById(setAdminSellers, id, data, "Seller updated (mock)"),
    [patchById]
  );
  const updateAdminPublisher = useCallback(
    (id, data) => patchById(setAdminPublishers, id, data, "Publisher updated (mock)"),
    [patchById]
  );
  const updateAdminCatalog = useCallback(
    (id, data) => patchById(setAdminCatalog, id, data, "Catalog item updated (mock)"),
    [patchById]
  );
  const updateAdminDispute = useCallback(
    (id, data) => patchById(setAdminDisputes, id, data, "Dispute updated (mock)"),
    [patchById]
  );
  const saveAdminSettings = useCallback(
    (data) => {
      setAdminSettings((prev) => ({ ...prev, ...data }));
      showToast("Platform settings saved (mock)");
    },
    [showToast]
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        walletBalance,
        transactions,
        purchases,
        tickets,
        notifications,
        profile,
        sellerProfile,
        sellerProducts,
        sellerAccounts,
        sellerOrders,
        sellerEarnings,
        earningTransactions,
        withdrawals,
        unreadCount,
        completedOrdersCount,
        hydrated,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getCartSubtotal,
        calcDiscount,
        placeOrder,
        getOrder,
        addMoney,
        createTicket,
        markNotificationRead,
        markAllNotificationsRead,
        updateProfile,
        updatePreferences,
        updateSellerProfile,
        deleteSellerProduct,
        updateSellerProduct,
        addSellerProduct,
        deleteSellerAccount,
        updateSellerAccount,
        addSellerAccount,
        getSellerOrder,
        requestWithdrawal,
        publisherProfile,
        publisherGames,
        publisherProducts,
        publisherOrders,
        publisherRevenue,
        publisherApiKeys,
        publisherWebhooks,
        webhookLogs,
        updatePublisherProfile,
        addPublisherGame,
        updatePublisherGame,
        deletePublisherGame,
        addPublisherProduct,
        updatePublisherProduct,
        deletePublisherProduct,
        regenerateApiKey,
        copyApiKey,
        addPublisherWebhook,
        updatePublisherWebhook,
        deletePublisherWebhook,
        testPublisherWebhook,
        adminUsers,
        adminOrders,
        adminSellers,
        adminPublishers,
        adminCatalog,
        adminDisputes,
        adminSettings,
        updateAdminUser,
        updateAdminSeller,
        updateAdminPublisher,
        updateAdminCatalog,
        updateAdminDispute,
        saveAdminSettings,
        showToast,
        resolveItem,
        getSellerById,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
