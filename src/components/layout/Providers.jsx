"use client";

import { ShopProvider, useShop } from "@/context/ShopContext";
import Toast from "@/components/ui/Toast";

function ToastBridge({ children }) {
  const { toast } = useShop();
  return (
    <>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

export default function Providers({ children }) {
  return (
    <ShopProvider>
      <ToastBridge>{children}</ToastBridge>
    </ShopProvider>
  );
}
