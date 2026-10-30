"use client";

import { useState, useMemo } from "react";
import AccountCard from "@/components/cards/AccountCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar, { SortSelect } from "@/components/ui/FilterBar";
import EmptyState from "@/components/ui/EmptyState";
import { gameAccounts, games } from "@/data/mock";

const gameFilters = [
  { label: "All Games", value: "all" },
  ...games.map((g) => ({ label: g.name, value: g.id })),
];

export default function AccountsPage() {
  const [search, setSearch] = useState("");
  const [gameFilter, setGameFilter] = useState("all");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let result = gameAccounts.filter((acc) => {
      const matchesSearch =
        acc.title.toLowerCase().includes(search.toLowerCase()) ||
        acc.rank.toLowerCase().includes(search.toLowerCase());
      const matchesGame = gameFilter === "all" || acc.gameId === gameFilter;
      return matchesSearch && matchesGame;
    });

    switch (sort) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "level":
        result = [...result].sort((a, b) => b.level - a.level);
        break;
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, gameFilter, sort]);

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="section-title">Premium Accounts</h1>
        <p className="section-subtitle">
          High-rank accounts with rare items and full inventory
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          placeholder="Search accounts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lg:max-w-md"
        />
        <SortSelect
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={[
            { label: "Featured", value: "featured" },
            { label: "Price: Low to High", value: "price-low" },
            { label: "Price: High to Low", value: "price-high" },
            { label: "Highest Level", value: "level" },
          ]}
        />
      </div>

      <FilterBar
        filters={gameFilters}
        activeFilter={gameFilter}
        onFilterChange={setGameFilter}
        className="mb-8"
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="👤"
          title="No accounts found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}
    </div>
  );
}
