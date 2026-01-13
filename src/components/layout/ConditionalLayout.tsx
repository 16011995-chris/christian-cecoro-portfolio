"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import ViewportNavigation from "@/components/layout/ViewportNavigation";
import CustomCursor from "@/components/ui/CustomCursor";
import IubendaBanner from "@/components/shared/IubendaBanner";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isStudioRoute = pathname?.startsWith("/studio");

  useEffect(() => {
    setMounted(true);

    // Add class to body for CSS targeting
    if (isStudioRoute) {
      document.body.classList.add("studio-page");
    } else {
      document.body.classList.remove("studio-page");
    }

    return () => {
      document.body.classList.remove("studio-page");
    };
  }, [isStudioRoute]);

  // Don't render UI components on studio route
  if (isStudioRoute) {
    return <>{children}</>;
  }

  // For non-studio routes, don't render UI until mounted (prevents SSR hydration mismatch)
  if (!mounted) {
    return <>{children}</>;
  }

  // For all other routes, render with header, navigation, cursor
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
