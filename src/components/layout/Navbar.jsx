"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import Button from "@/components/ui/Button";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/top-up", label: "Top-Up" },
  { href: "/products", label: "Products" },
  { href: "/accounts", label: "Accounts" },
];

function NavIconLink({ href, label, children, badge }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-white"
    >
      {children}
      {badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cart, wishlist, hydrated } = useShop();

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-lg font-bold">
              A
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Anony<span className="text-accent-light">Shop</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-accent/15 text-accent-light"
                    : "text-muted hover:bg-surface-light hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 max-w-xs md:block lg:max-w-sm">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="sm"
            />
          </div>

          <div className="flex items-center gap-1">
            <NavIconLink href="/cart" label="Cart" badge={hydrated ? cartCount : 0}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </NavIconLink>
            <NavIconLink href="/wishlist" label="Wishlist" badge={hydrated ? wishlistCount : 0}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </NavIconLink>
            <Link href="/partners" className="hidden xl:block">
              <Button variant="ghost" size="sm">
                Partners
              </Button>
            </Link>
            <Link href="/publisher" className="hidden lg:block">
              <Button variant="ghost" size="sm">
                Publisher
              </Button>
            </Link>
            <Link href="/seller" className="hidden lg:block">
              <Button variant="ghost" size="sm">
                Seller
              </Button>
            </Link>
            <Link href="/dashboard" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/orders" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Orders
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:inline-flex ml-1">
                Account
              </Button>
            </Link>
            <button
              className="rounded-lg p-2 text-muted hover:bg-surface-light hover:text-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border/50 py-4 lg:hidden animate-fade-in">
            <div className="mb-4 md:hidden">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="sm"
              />
            </div>
            <nav className="flex flex-col gap-1">
              {[...navLinks, { href: "/dashboard", label: "Dashboard" }, { href: "/seller", label: "Seller" }, { href: "/publisher", label: "Publisher" }, { href: "/partners", label: "Partners" }, { href: "/orders", label: "Orders" }, { href: "/cart", label: "Cart" }, { href: "/wishlist", label: "Wishlist" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-accent/15 text-accent-light"
                      : "text-muted hover:bg-surface-light hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/dashboard" className="mt-4 block">
              <Button variant="outline" size="sm" className="w-full">
                Account
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
