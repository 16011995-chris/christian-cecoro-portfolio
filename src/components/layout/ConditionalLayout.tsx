"use client";

import { usePathname } from "next/navigation";
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
  const isStudioRoute = pathname?.startsWith("/studio");

  // For studio route, render children without any wrapper
  if (isStudioRoute) {
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
