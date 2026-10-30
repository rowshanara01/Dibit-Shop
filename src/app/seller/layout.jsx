"use client";

import SellerNav from "@/components/layout/SellerNav";

export default function SellerLayout({ children }) {
  return (
    <div className="section-container py-6 sm:py-10">
      <div className="mb-6 lg:hidden">
        <SellerNav mobile />
      </div>
      <div className="flex gap-8 lg:gap-10">
        <SellerNav />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
