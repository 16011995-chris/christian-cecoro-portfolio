"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import ViewportNavigation from "@/components/layout/ViewportNavigation";
import CustomCursor from "@/components/ui/CustomCursor";
import IubendaBanner from "@/components/shared/IubendaBanner";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isStudioRoute = pathname?.startsWith("/studio");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted client-side
  if (!mounted) {
    return <>{children}</>;
  }

  // Don't render UI components on studio route - just children
  if (isStudioRoute) {
    return <>{children}</>;
  }

  // For all other routes, wrap children with UI components
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
