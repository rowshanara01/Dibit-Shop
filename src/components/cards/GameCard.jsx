import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function GameCard({ game, className }) {
  return (
    <Link
      href={`/top-up?game=${game.slug}`}
      className={cn("group glass-card overflow-hidden", className)}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {game.trending && (
          <Badge variant="hot" className="absolute right-3 top-3">
            Trending
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-accent-light transition-colors">
          {game.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{game.genre}</p>
      </div>
    </Link>
  );
}
