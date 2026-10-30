import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/cards/ProductCard";
import Badge from "@/components/ui/Badge";
import ProductActions from "@/components/product/ProductActions";
import Price from "@/components/ui/Price";
import Rating from "@/components/ui/Rating";
import {
  getProductBySlug,
  getSellerById,
  getGameById,
  products,
} from "@/data/mock";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const seller = getSellerById(product.sellerId);
  const game = product.gameId ? getGameById(product.gameId) : null;
  const related = products
    .filter((p) => p.id !== product.id && (p.gameId === product.gameId || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="section-container py-8 sm:py-12">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/products" className="hover:text-accent-light transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl glass-card">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-20 w-20 overflow-hidden rounded-lg border border-border"
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            <Badge variant="muted">{product.category}</Badge>
            {game && <Badge>{game.name}</Badge>}
            {product.inStock && <Badge variant="success">In Stock</Badge>}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4">
            <Rating value={product.rating} reviews={product.reviews} size="md" />
          </div>

          <div className="mt-6">
            <Price
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              size="lg"
            />
          </div>

          <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

          {seller && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={seller.avatar} alt={seller.name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {seller.name}
                  {seller.verified && (
                    <span className="ml-1 text-accent-light">✓</span>
                  )}
                </p>
                <Rating value={seller.rating} showValue={false} />
              </div>
            </div>
          )}

          <ProductActions product={product} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border/50 pt-12">
          <h2 className="section-title mb-8">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
