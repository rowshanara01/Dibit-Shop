"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import LoadingGrid from "@/components/ui/LoadingGrid";
import { games, topUpPackages, formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

function TopUpContent() {
  const searchParams = useSearchParams();
  const initialGame = searchParams.get("game");
  const [selectedGameId, setSelectedGameId] = useState(
    games.find((g) => g.slug === initialGame)?.id || games[0].id
  );

  const selectedGame = games.find((g) => g.id === selectedGameId);
  const packages = useMemo(
    () => topUpPackages.filter((p) => p.gameId === selectedGameId),
    [selectedGameId]
  );

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="section-title">Top-Up</h1>
        <p className="section-subtitle">
          Select a game and choose your package for instant delivery
        </p>
      </div>

      {/* Game Selection */}
      <div className="mb-10">
        <h2 className="mb-4 text-sm font-medium text-muted uppercase tracking-wider">
          Select Game
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGameId(game.id)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl border p-3 transition-all duration-200",
                selectedGameId === game.id
                  ? "border-accent bg-accent/10 neon-glow"
                  : "border-border bg-surface hover:border-accent/30"
              )}
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                <Image src={game.image} alt={game.name} fill className="object-cover" sizes="40px" />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{game.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Game Banner */}
      {selectedGame && (
        <div className="relative mb-10 overflow-hidden rounded-2xl glass-card">
          <div className="relative h-40 sm:h-52">
            <Image
              src={selectedGame.banner}
              alt={selectedGame.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 flex items-center p-6 sm:p-8">
              <div>
                <Badge className="mb-2">{selectedGame.genre}</Badge>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">
                  {selectedGame.name}
                </h2>
                <p className="mt-1 text-sm text-muted">Instant delivery · Secure payment</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Packages */}
      <div>
        <h2 className="mb-6 text-lg font-semibold">Popular Packages</h2>
        {packages.length === 0 ? (
          <EmptyState
            icon="⚡"
            title="No packages available"
            description="Packages for this game are coming soon."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  "glass-card p-6 flex flex-col",
                  pkg.popular && "border-accent/40 neon-glow"
                )}
              >
                {pkg.popular && (
                  <Badge variant="hot" className="mb-3 w-fit">
                    Most Popular
                  </Badge>
                )}
                <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-accent-light">
                    {formatPrice(pkg.price)}
                  </span>
                </div>
                {pkg.bonus > 0 && (
                  <p className="mt-2 text-sm text-green-400">
                    +{pkg.bonus.toLocaleString()} bonus included
                  </p>
                )}
                <Button className="mt-6 w-full">Buy Now</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TopUpPage() {
  return (
    <Suspense fallback={
      <div className="section-container py-12">
        <LoadingGrid count={3} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
      </div>
    }>
      <TopUpContent />
    </Suspense>
  );
}
