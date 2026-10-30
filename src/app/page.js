import Link from "next/link";
import Hero from "@/components/sections/Hero";
import GameCard from "@/components/cards/GameCard";
import ProductCard from "@/components/cards/ProductCard";
import AccountCard from "@/components/cards/AccountCard";
import CategoryCard from "@/components/cards/CategoryCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  games,
  products,
  gameAccounts,
  categories,
  topUpPackages,
} from "@/data/mock";

function SectionHeader({ title, subtitle, href, linkText = "View All" }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href}>
          <Button variant="ghost" size="sm">
            {linkText} →
          </Button>
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const trendingGames = games.filter((g) => g.trending);
  const featuredProducts = products.filter((p) => p.featured);
  const premiumAccounts = gameAccounts.filter((a) => a.featured);
  const popularPackages = topUpPackages.filter((p) => p.popular);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="section-container py-16">
        <SectionHeader
          title="Explore Categories"
          subtitle="Everything you need in one marketplace"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Top-Up Games */}
      <section className="section-container py-16">
        <SectionHeader
          title="Top-Up Games"
          subtitle="Instant currency delivery for your favorite titles"
          href="/top-up"
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {games.slice(0, 6).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Popular Packages */}
      <section className="border-y border-border/30 bg-surface/30 py-16">
        <div className="section-container">
          <SectionHeader
            title="Popular Packages"
            subtitle="Best value top-up deals"
            href="/top-up"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularPackages.map((pkg) => {
              const game = games.find((g) => g.id === pkg.gameId);
              return (
                <div key={pkg.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-xs text-accent-light">{game?.name}</p>
                    <h3 className="mt-1 font-semibold text-white">{pkg.name}</h3>
                    {pkg.bonus > 0 && (
                      <Badge variant="success" className="mt-2">
                        +{pkg.bonus} bonus
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-white">
                      ${pkg.price}
                    </p>
                    <Link href="/top-up">
                      <Button size="sm" className="mt-2">Buy Now</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Game Accounts */}
      <section className="section-container py-16">
        <SectionHeader
          title="Premium Game Accounts"
          subtitle="High-rank accounts with rare items"
          href="/accounts"
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {premiumAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </section>

      {/* Digital Products */}
      <section className="border-y border-border/30 bg-surface/30 py-16">
        <div className="section-container">
          <SectionHeader
            title="Digital Products"
            subtitle="Passes, skins, and in-game items"
            href="/products"
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Gift Cards */}
      <section className="section-container py-16">
        <SectionHeader
          title="Gift Cards"
          subtitle="Redeem on your favorite platforms"
          href="/products?category=Gift+Cards"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.category === "Gift Cards")
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* Featured / Trending */}
      <section className="border-y border-border/30 bg-surface/30 py-16">
        <div className="section-container">
          <SectionHeader
            title="Featured & Trending"
            subtitle="Hot picks from the community"
            href="/games"
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {trendingGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Protection */}
      <section id="buyer-protection" className="section-container py-16">
        <div className="glass-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <Badge className="mb-4">Buyer Protection</Badge>
              <h2 className="section-title">Shop with Confidence</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Every purchase is protected. Instant delivery, secure transactions,
                and dedicated support ensure you get exactly what you paid for.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Instant digital delivery",
                  "Money-back guarantee",
                  "Verified sellers only",
                  "24/7 customer support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent-light text-xs">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex items-center justify-center bg-accent/5 p-12">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-accent/20 text-5xl animate-glow">
                  🛡️
                </div>
                <p className="mt-4 font-display text-3xl font-bold gradient-text">
                  100% Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
