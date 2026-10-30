import Link from "next/link";

const footerLinks = {
  Marketplace: [
    { label: "Games", href: "/games" },
    { label: "Top-Up", href: "/top-up" },
    { label: "Products", href: "/products" },
    { label: "Accounts", href: "/accounts" },
  ],
  Partners: [
    { label: "Become a Partner", href: "/partners" },
    { label: "Publisher Hub", href: "/publisher" },
    { label: "API Docs", href: "/publisher/api" },
  ],
  Support: [
    { label: "Buyer Protection", href: "#buyer-protection" },
    { label: "FAQ", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/50">
      <div className="section-container py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-lg font-bold">
                A
              </div>
              <span className="font-display text-xl font-bold">
                Anony<span className="text-accent-light">Shop</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted leading-relaxed">
              Premium gaming digital marketplace. Top-ups, accounts, products, and gift cards — delivered fast and secure.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white">{title}</h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} AnonyShop. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Twitter", "Discord", "Telegram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-muted transition-colors hover:text-accent-light"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
