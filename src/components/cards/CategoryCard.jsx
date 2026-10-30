import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoryCard({ category, className }) {
  return (
    <Link
      href={category.href}
      className={cn(
        "group glass-card flex flex-col items-center p-6 text-center transition-all duration-300 hover:neon-glow",
        className
      )}
    >
      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
        {category.icon}
      </span>
      <h3 className="mt-3 font-semibold text-white group-hover:text-accent-light transition-colors">
        {category.name}
      </h3>
      {category.count !== undefined && (
        <p className="mt-1 text-sm text-muted">{category.count}+ items</p>
      )}
    </Link>
  );
}
