"use client";

import ProductCard from "@/components/cards/ProductCard";
import AccountCard from "@/components/cards/AccountCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Skeleton, { SkeletonCard } from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { products, gameAccounts } from "@/data/mock";

function WishlistItemActions({ itemType, itemId, onRemove, onAddToCart }) {
  return (
    <div className="mt-3 flex gap-2">
      <Button size="sm" className="flex-1" onClick={() => onAddToCart(itemType, itemId)}>
        Add to Cart
      </Button>
      <Button size="sm" variant="ghost" onClick={() => onRemove(itemType, itemId)}>
        Remove
      </Button>
    </div>
  );
}

export default function WishlistPage() {
  const { wishlist, hydrated, removeFromWishlist, addToCart } = useShop();

  const wishlistProducts = wishlist
    .filter((w) => w.itemType === "product")
    .map((w) => products.find((p) => p.id === w.itemId))
    .filter(Boolean);

  const wishlistAccounts = wishlist
    .filter((w) => w.itemType === "account")
    .map((w) => gameAccounts.find((a) => a.id === w.itemId))
    .filter(Boolean);

  const isEmpty = wishlistProducts.length === 0 && wishlistAccounts.length === 0;

  if (!hydrated) {
    return (
      <div className="section-container py-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="section-title">Wishlist</h1>
        <p className="section-subtitle">
          Saved products and accounts ({wishlist.length} items)
        </p>
      </div>

      {isEmpty ? (
        <EmptyState
          icon="💜"
          title="Your wishlist is empty"
          description="Save products and accounts you love for later."
        />
      ) : (
        <div className="space-y-10">
          {wishlistProducts.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-white">Products</h2>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="flex flex-col">
                    <ProductCard product={product} />
                    <WishlistItemActions
                      itemType="product"
                      itemId={product.id}
                      onRemove={removeFromWishlist}
                      onAddToCart={addToCart}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {wishlistAccounts.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-white">Accounts</h2>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {wishlistAccounts.map((account) => (
                  <div key={account.id} className="flex flex-col">
                    <AccountCard account={account} />
                    <WishlistItemActions
                      itemType="account"
                      itemId={account.id}
                      onRemove={removeFromWishlist}
                      onAddToCart={addToCart}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
