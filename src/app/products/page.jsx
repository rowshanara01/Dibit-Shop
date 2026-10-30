"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/cards/ProductCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar, { SortSelect } from "@/components/ui/FilterBar";
import EmptyState from "@/components/ui/EmptyState";
import LoadingGrid from "@/components/ui/LoadingGrid";
import { products } from "@/data/mock";

const categories = [
  { label: "All", value: "all" },
  ...Array.from(new Set(products.map((p) => p.category))).map((cat) => ({
    label: cat,
    value: cat,
  })),
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="section-title">Products</h1>
        <p className="section-subtitle">
          Game passes, skins, currency, and digital items
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          placeholder="Search products..."
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
            { label: "Top Rated", value: "rating" },
          ]}
        />
      </div>

      <FilterBar
        filters={categories}
        activeFilter={category}
        onFilterChange={setCategory}
        className="mb-8"
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="📦"
          title="No products found"
          description="Try adjusting your search, category, or sort options."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="section-container py-12">
        <LoadingGrid count={8} />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
