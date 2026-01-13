"use client";

import Header from "@/components/shared/Header";
import ViewportNavigation from "@/components/layout/ViewportNavigation";
import CustomCursor from "@/components/ui/CustomCursor";
import IubendaBanner from "@/components/shared/IubendaBanner";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { usePathname } from "next/navigation";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't render layout components on /studio routes
  if (pathname?.startsWith('/studio')) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor />
      <SmoothScrollProvider>
        <Header />
        <ViewportNavigation />
        {children}
        <IubendaBanner />
      </SmoothScrollProvider>
    </>
  );
}
