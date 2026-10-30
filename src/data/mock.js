export const sellers = [
  {
    id: "seller-1",
    name: "NeonVault",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    rating: 4.9,
    sales: 2840,
    verified: true,
  },
  {
    id: "seller-2",
    name: "CyberLoot",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    rating: 4.7,
    sales: 1520,
    verified: true,
  },
  {
    id: "seller-3",
    name: "PixelForge",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    rating: 4.8,
    sales: 980,
    verified: false,
  },
];

export const games = [
  {
    id: "pubg-mobile",
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    genre: "Battle Royale",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
    trending: true,
    featured: true,
  },
  {
    id: "free-fire",
    slug: "free-fire",
    name: "Free Fire",
    genre: "Battle Royale",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=600&fit=crop",
    trending: true,
    featured: false,
  },
  {
    id: "cod-mobile",
    slug: "cod-mobile",
    name: "Call of Duty Mobile",
    genre: "FPS",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    trending: false,
    featured: true,
  },
  {
    id: "mobile-legends",
    slug: "mobile-legends",
    name: "Mobile Legends",
    genre: "MOBA",
    image: "https://images.unsplash.com/photo-1538481190775-a9415413164c?w=600&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1511884642898-4c92249e20b9?w=1200&h=600&fit=crop",
    trending: true,
    featured: true,
  },
  {
    id: "honor-of-kings",
    slug: "honor-of-kings",
    name: "Honor of Kings",
    genre: "MOBA",
    image: "https://images.unsplash.com/photo-1560419015-7c4278218d5a?w=600&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=600&fit=crop",
    trending: false,
    featured: false,
  },
  {
    id: "ea-fc-mobile",
    slug: "ea-fc-mobile",
    name: "EA FC Mobile",
    genre: "Sports",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=600&fit=crop",
    trending: false,
    featured: true,
  },
];

export const topUpPackages = [
  {
    id: "pubg-uc-660",
    gameId: "pubg-mobile",
    name: "660 UC",
    amount: 660,
    bonus: 60,
    price: 9.99,
    currency: "USD",
    popular: false,
  },
  {
    id: "pubg-uc-3250",
    gameId: "pubg-mobile",
    name: "3,250 UC",
    amount: 3250,
    bonus: 325,
    price: 49.99,
    currency: "USD",
    popular: true,
  },
  {
    id: "ff-diamonds-520",
    gameId: "free-fire",
    name: "520 Diamonds",
    amount: 520,
    bonus: 52,
    price: 4.99,
    currency: "USD",
    popular: true,
  },
  {
    id: "ml-diamonds-275",
    gameId: "mobile-legends",
    name: "275 Diamonds",
    amount: 275,
    bonus: 25,
    price: 4.99,
    currency: "USD",
    popular: false,
  },
  {
    id: "cod-cp-2400",
    gameId: "cod-mobile",
    name: "2,400 CP",
    amount: 2400,
    bonus: 240,
    price: 19.99,
    currency: "USD",
    popular: true,
  },
];

export const products = [
  {
    id: "prod-1",
    slug: "pubg-royale-pass-premium",
    name: "PUBG Royale Pass Premium",
    category: "Game Pass",
    description:
      "Unlock the full Royale Pass with exclusive skins, emotes, and rewards. Instant delivery to your account.",
    price: 14.99,
    originalPrice: 19.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    ],
    gameId: "pubg-mobile",
    sellerId: "seller-1",
    rating: 4.8,
    reviews: 342,
    featured: true,
    trending: true,
    inStock: true,
  },
  {
    id: "prod-2",
    slug: "ml-skin-collector-bundle",
    name: "Mobile Legends Skin Bundle",
    category: "Skins",
    description:
      "Premium skin collection featuring 5 legendary skins for popular heroes. Limited time bundle.",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    image: "https://images.unsplash.com/photo-1538481190775-a9415413164c?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1538481190775-a9415413164c?w=800&h=600&fit=crop",
    ],
    gameId: "mobile-legends",
    sellerId: "seller-2",
    rating: 4.6,
    reviews: 128,
    featured: true,
    trending: false,
    inStock: true,
  },
  {
    id: "prod-3",
    slug: "cod-battle-pass-s11",
    name: "COD Mobile Battle Pass S11",
    category: "Game Pass",
    description:
      "Season 11 Battle Pass with tier rewards, operator skins, and weapon blueprints.",
    price: 9.99,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=600&fit=crop",
    ],
    gameId: "cod-mobile",
    sellerId: "seller-1",
    rating: 4.9,
    reviews: 567,
    featured: false,
    trending: true,
    inStock: true,
  },
  {
    id: "prod-4",
    slug: "steam-gift-card-50",
    name: "Steam Gift Card $50",
    category: "Gift Cards",
    description:
      "Redeemable Steam wallet code. Use for games, DLC, and in-game items on the Steam platform.",
    price: 50.0,
    originalPrice: null,
    discount: 0,
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=600&fit=crop",
    ],
    gameId: null,
    sellerId: "seller-3",
    rating: 5.0,
    reviews: 892,
    featured: true,
    trending: false,
    inStock: true,
  },
  {
    id: "prod-5",
    slug: "ea-fc-points-5000",
    name: "EA FC Mobile Points 5,000",
    category: "Currency",
    description:
      "5,000 FC Points for packs, players, and upgrades. Fast automated delivery.",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    ],
    gameId: "ea-fc-mobile",
    sellerId: "seller-2",
    rating: 4.7,
    reviews: 215,
    featured: false,
    trending: true,
    inStock: true,
  },
];

export const gameAccounts = [
  {
    id: "acc-1",
    gameId: "pubg-mobile",
    title: "PUBG Conqueror Account",
    level: 78,
    rank: "Conqueror",
    rareItems: ["M416 Glacier", "Golden Mirado", "Pharaoh X-Suit"],
    inventory: 142,
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    ],
    sellerId: "seller-1",
    rating: 4.9,
    reviews: 45,
    featured: true,
    description:
      "High-tier PUBG Mobile account with Conqueror rank, rare glacier skins, and extensive wardrobe collection.",
  },
  {
    id: "acc-2",
    gameId: "mobile-legends",
    title: "ML Mythic Glory Account",
    level: 95,
    rank: "Mythic Glory",
    rareItems: ["Kagura Cherry Blossom", "Gusion Epic Skin", "Lunox Legend"],
    inventory: 89,
    price: 189.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1538481190775-a9415413164c?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1538481190775-a9415413164c?w=800&h=600&fit=crop",
    ],
    sellerId: "seller-2",
    rating: 4.7,
    reviews: 32,
    featured: true,
    description:
      "Mythic Glory ranked account with premium skins and full hero roster unlocked.",
  },
  {
    id: "acc-3",
    gameId: "cod-mobile",
    title: "COD Legendary Loadout",
    level: 150,
    rank: "Legendary",
    rareItems: ["Dark Matter AK", "Mythic Holger", "Legendary Operator"],
    inventory: 67,
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=600&fit=crop",
    ],
    sellerId: "seller-1",
    rating: 4.8,
    reviews: 28,
    featured: false,
    description:
      "Max level COD Mobile account with legendary weapons and complete battle pass history.",
  },
];

export const categories = [
  { id: "top-up", name: "Top-Up", icon: "⚡", href: "/top-up", count: 120 },
  { id: "accounts", name: "Accounts", icon: "👤", href: "/accounts", count: 85 },
  { id: "products", name: "Products", icon: "🎮", href: "/products", count: 340 },
  { id: "gift-cards", name: "Gift Cards", icon: "🎁", href: "/products?category=Gift+Cards", count: 45 },
];

export function getGameById(id) {
  return games.find((g) => g.id === id);
}

export function getSellerById(id) {
  return sellers.find((s) => s.id === id);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getAccountById(id) {
  return gameAccounts.find((a) => a.id === id);
}

export function getPackagesByGame(gameId) {
  return topUpPackages.filter((p) => p.gameId === gameId);
}

export function formatPrice(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
