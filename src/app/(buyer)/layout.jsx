"use client";

import BuyerNav from "@/components/layout/BuyerNav";

export default function BuyerLayout({ children }) {
  return (
    <div className="section-container py-6 sm:py-10">
      <div className="mb-6 lg:hidden">
        <BuyerNav mobile />
      </div>
      <div className="flex gap-8 lg:gap-10">
        <BuyerNav />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
