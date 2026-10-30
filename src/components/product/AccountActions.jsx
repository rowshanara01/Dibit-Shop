"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

export default function AccountActions({ account }) {
  const { addToCart, addToWishlist, isInWishlist } = useShop();
  const router = useRouter();
  const inWishlist = isInWishlist("account", account.id);

  const handleBuyNow = () => {
    addToCart("account", account.id, 1);
    router.push("/checkout");
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button size="lg" className="flex-1" onClick={handleBuyNow}>
        Buy Now
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="flex-1"
        onClick={() => addToCart("account", account.id, 1)}
      >
        Add to Cart
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => addToWishlist("account", account.id)}
        className={cn(inWishlist && "text-accent-light")}
      >
        <svg
          className="h-5 w-5"
          fill={inWishlist ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Wishlist
      </Button>
    </div>
  );
}
