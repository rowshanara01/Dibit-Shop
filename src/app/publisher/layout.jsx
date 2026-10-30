"use client";

import PublisherNav from "@/components/layout/PublisherNav";

export default function PublisherLayout({ children }) {
  return (
    <div className="section-container py-6 sm:py-10">
      <div className="mb-6 lg:hidden">
        <PublisherNav mobile />
      </div>
      <div className="flex gap-8 lg:gap-10">
        <PublisherNav />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
