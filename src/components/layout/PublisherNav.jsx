"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const publisherLinks = [
  { href: "/publisher", label: "Dashboard", icon: "📊" },
  { href: "/publisher/games", label: "Games", icon: "🎮" },
  { href: "/publisher/products", label: "Products", icon: "📦" },
  { href: "/publisher/orders", label: "Orders", icon: "🛒" },
  { href: "/publisher/analytics", label: "Analytics", icon: "📈" },
  { href: "/publisher/api", label: "API", icon: "🔑" },
  { href: "/publisher/webhooks", label: "Webhooks", icon: "🔗" },
  { href: "/publisher/settings", label: "Settings", icon: "⚙️" },
];

function isActive(pathname, href) {
  if (href === "/publisher") return pathname === "/publisher";
  return pathname.startsWith(href);
}

export default function PublisherNav({ mobile = false }) {
  const pathname = usePathname();
  const { publisherProfile, hydrated } = useShop();

  if (mobile) {
    return (
      <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Publisher navigation">
        {publisherLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors",
              isActive(pathname, link.href)
                ? "bg-accent/15 text-accent-light"
                : "bg-surface text-muted hover:text-white"
            )}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24 space-y-6">
        <div className="px-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Publisher Hub</p>
          {hydrated && (
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 font-bold text-accent-light">
                {publisherProfile.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{publisherProfile.name}</p>
                <Badge variant="success" className="mt-1 text-[10px]">
                  {publisherProfile.verificationStatus}
                </Badge>
              </div>
            </div>
          )}
        </div>

        <nav className="space-y-1" aria-label="Publisher navigation">
          {publisherLinks.map((link) => (
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
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/partners"
          className="block rounded-lg border border-border/50 px-3 py-2 text-xs text-muted transition-colors hover:border-accent/30 hover:text-white"
        >
          ← Partner Program
        </Link>
      </div>
    </aside>
  );
}
