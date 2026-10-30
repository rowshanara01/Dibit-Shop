import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AccountCard from "@/components/cards/AccountCard";
import Badge from "@/components/ui/Badge";
import AccountActions from "@/components/product/AccountActions";
import Price from "@/components/ui/Price";
import Rating from "@/components/ui/Rating";
import {
  getAccountById,
  getSellerById,
  getGameById,
  gameAccounts,
} from "@/data/mock";

export async function generateStaticParams() {
  return gameAccounts.map((a) => ({ id: a.id }));
}

export default function AccountDetailPage({ params }) {
  const { id } = params;
  const account = getAccountById(id);

  if (!account) notFound();

  const seller = getSellerById(account.sellerId);
  const game = getGameById(account.gameId);
  const related = gameAccounts
    .filter((a) => a.id !== account.id && a.gameId === account.gameId)
    .slice(0, 3);

  return (
    <div className="section-container py-8 sm:py-12">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/accounts" className="hover:text-accent-light transition-colors">
          Accounts
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{account.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl glass-card">
            <Image
              src={account.images[0]}
              alt={account.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <Badge variant="success" className="absolute right-4 top-4">
              {account.rank}
            </Badge>
          </div>
          {account.images.length > 1 && (
            <div className="flex gap-3">
              {account.images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-20 w-28 overflow-hidden rounded-lg border border-border"
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="112px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {game && (
            <p className="text-sm font-medium text-accent-light">{game.name}</p>
          )}
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {account.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="muted">Level {account.level}</Badge>
            <Badge variant="muted">{account.inventory} items</Badge>
            <Badge variant="success">{account.rank}</Badge>
          </div>

          <div className="mt-4">
            <Rating value={account.rating} reviews={account.reviews} size="md" />
          </div>

          <div className="mt-6">
            <Price
              price={account.price}
              originalPrice={account.originalPrice}
              size="lg"
            />
          </div>

          <p className="mt-6 text-muted leading-relaxed">{account.description}</p>

          {/* Inventory */}
          <div className="mt-6 rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-white">Rare Items</h3>
            <ul className="mt-3 space-y-2">
              {account.rareItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted">
                  <span className="text-accent-light">★</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {seller && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={seller.avatar} alt={seller.name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {seller.name}
                  {seller.verified && (
                    <span className="ml-1 text-accent-light">✓ Verified</span>
                  )}
                </p>
                <p className="text-xs text-muted">{seller.sales.toLocaleString()} sales</p>
              </div>
            </div>
          )}

          <AccountActions account={account} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border/50 pt-12">
          <h2 className="section-title mb-8">Similar Accounts</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <AccountCard key={a.id} account={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
