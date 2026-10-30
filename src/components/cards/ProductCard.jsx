import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Price from "@/components/ui/Price";
import Rating from "@/components/ui/Rating";
import { cn } from "@/lib/utils";

export default function ProductCard({ product, className }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn("group glass-card overflow-hidden flex flex-col", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        {product.featured && (
          <Badge className="absolute left-3 top-3">Featured</Badge>
        )}
        {product.trending && (
          <Badge variant="hot" className="absolute right-3 top-3">
            Hot
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Badge variant="muted" className="mb-2 w-fit">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-accent-light transition-colors">
          {product.name}
        </h3>
        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-auto pt-3">
          <Price
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="sm"
          />
        </div>
      </div>
    </Link>
  );
}
