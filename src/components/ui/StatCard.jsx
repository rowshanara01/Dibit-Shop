import Link from "next/link";
import { cn } from "@/lib/utils";

export default function StatCard({ label, value, icon, className, href }) {
  const inner = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold text-white">{value}</p>
        </div>
        {icon && <span className="text-2xl opacity-80">{icon}</span>}
      </div>
    </>
  );

  const classes = cn(
    "glass-card block p-5 transition-all hover:border-accent/30",
    href && "hover:neon-glow",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
