import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Price from "@/components/ui/Price";
import Rating from "@/components/ui/Rating";
import { getGameById, getSellerById } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function AccountCard({ account, className }) {
  const game = getGameById(account.gameId);
  const seller = getSellerById(account.sellerId);

  return (
    <Link
      href={`/accounts/${account.id}`}
      className={cn("group glass-card overflow-hidden flex flex-col", className)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={account.image}
          alt={account.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {account.featured && (
          <Badge className="absolute left-3 top-3">Premium</Badge>
        )}
        <Badge variant="success" className="absolute right-3 top-3">
          {account.rank}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-accent-light">{game?.name}</p>
        <h3 className="mt-1 font-semibold text-white group-hover:text-accent-light transition-colors">
          {account.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="muted">Lv. {account.level}</Badge>
          <Badge variant="muted">{account.inventory} items</Badge>
        </div>
        {account.rareItems.length > 0 && (
          <p className="mt-2 text-xs text-muted line-clamp-1">
            {account.rareItems.join(" · ")}
          </p>
        )}
        {seller && (
          <p className="mt-2 text-xs text-muted">
            by {seller.name}
            {seller.verified && " ✓"}
          </p>
        )}
        <div className="mt-2">
          <Rating value={account.rating} reviews={account.reviews} />
        </div>
        <div className="mt-auto pt-3">
          <Price
            price={account.price}
            originalPrice={account.originalPrice}
            size="sm"
          />
        </div>
      </div>
    </Link>
  );
}
