import { formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";
import Badge from "./Badge";

export default function Price({
  price,
  originalPrice,
  discount,
  size = "md",
  className,
}) {
  const sizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className={cn("font-bold text-white", sizes[size])}>
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted line-through">
          {formatPrice(originalPrice)}
        </span>
      )}
      {discount > 0 && <Badge variant="hot">-{discount}%</Badge>}
    </div>
  );
}
