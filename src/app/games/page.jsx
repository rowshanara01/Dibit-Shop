"use client";

import { useState, useMemo } from "react";
import GameCard from "@/components/cards/GameCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import EmptyState from "@/components/ui/EmptyState";
import { games } from "@/data/mock";

const genreFilters = [
  { label: "All", value: "all", count: games.length },
  { label: "Battle Royale", value: "Battle Royale", count: games.filter((g) => g.genre === "Battle Royale").length },
  { label: "MOBA", value: "MOBA", count: games.filter((g) => g.genre === "MOBA").length },
  { label: "FPS", value: "FPS", count: games.filter((g) => g.genre === "FPS").length },
  { label: "Sports", value: "Sports", count: games.filter((g) => g.genre === "Sports").length },
];

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  const filtered = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genre === "all" || game.genre === genre;
      return matchesSearch && matchesGenre;
    });
  }, [search, genre]);

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="section-title">Games</h1>
        <p className="section-subtitle">
          Browse supported games for top-ups, products, and accounts
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lg:max-w-md"
        />
        <FilterBar
          filters={genreFilters}
          activeFilter={genre}
          onFilterChange={setGenre}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🎮"
          title="No games found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
