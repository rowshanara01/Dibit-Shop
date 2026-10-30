"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

const buyerLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/orders", label: "Orders", icon: "📦" },
  { href: "/wishlist", label: "Wishlist", icon: "💜" },
  { href: "/purchases", label: "Purchases", icon: "🎮" },
  { href: "/wallet", label: "Wallet", icon: "💳" },
  { href: "/support", label: "Support", icon: "🎧" },
  { href: "/notifications", label: "Notifications", icon: "🔔" },
  { href: "/profile/settings", label: "Settings", icon: "⚙️" },
];

function isActive(pathname, href) {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/profile/settings") return pathname.startsWith("/profile");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BuyerNav({ mobile = false, onNavigate }) {
  const pathname = usePathname();
  const { unreadCount, profile, hydrated } = useShop();

  const links = buyerLinks.map((link) => ({
    ...link,
    badge: link.href === "/notifications" && hydrated ? unreadCount : 0,
  }));

  if (mobile) {
    return (
      <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Buyer navigation">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors",
              isActive(pathname, link.href)
                ? "bg-accent/15 text-accent-light"
                : "bg-surface text-muted hover:text-white"
            )}
          >
            <span>{link.icon}</span>
            {link.label}
            {link.badge > 0 && (
              <span className="rounded-full bg-accent px-1.5 text-[10px] text-white">
                {link.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24 space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 font-bold text-accent-light">
            {profile.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{profile.name}</p>
            <p className="truncate text-xs text-muted">Buyer Account</p>
          </div>
        </div>

        <nav className="space-y-1" aria-label="Buyer navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(pathname, link.href)
                  ? "bg-accent/15 text-accent-light"
                  : "text-muted hover:bg-surface-light hover:text-white"
              )}
            >
              <span className="text-base">{link.icon}</span>
              <span className="flex-1">{link.label}</span>
              {link.badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
