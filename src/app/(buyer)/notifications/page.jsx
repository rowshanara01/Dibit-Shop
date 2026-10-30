"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

const TYPE_ICONS = {
  order: "📦",
  payment: "💳",
  delivery: "🚀",
  promotion: "🎁",
};

export default function NotificationsPage() {
  const { notifications, hydrated, markNotificationRead, markAllNotificationsRead } = useShop();

  const unread = notifications.filter((n) => !n.read);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">Notifications</h1>
          <p className="section-subtitle">
            {unread.length > 0 ? `${unread.length} unread` : "All caught up"}
          </p>
        </div>
        {unread.length > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllNotificationsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No notifications"
          description="Order updates and promotions will appear here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const content = (
              <>
                <span className="text-xl shrink-0">{TYPE_ICONS[n.type] || "📢"}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{n.title}</p>
                    {!n.read && (
                      <Badge variant="default" className="text-[10px]">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{n.message}</p>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(n.date).toLocaleString()}
                  </p>
                </div>
              </>
            );

            const className = cn(
              "glass-card flex gap-4 p-4 transition-all",
              !n.read && "border-accent/30 bg-accent/5",
              n.href && "hover:border-accent/40"
            );

            if (n.href) {
              return (
                <Link
                  key={n.id}
                  href={n.href}
                  className={className}
                  onClick={() => markNotificationRead(n.id)}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={n.id}
                type="button"
                className={cn(className, "w-full text-left")}
                onClick={() => markNotificationRead(n.id)}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
