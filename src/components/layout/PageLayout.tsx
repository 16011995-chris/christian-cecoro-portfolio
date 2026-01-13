"use client";

import Header from "@/components/shared/Header";
import ViewportNavigation from "@/components/layout/ViewportNavigation";
import CustomCursor from "@/components/ui/CustomCursor";
import IubendaBanner from "@/components/shared/IubendaBanner";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function PageLayout({ children }: { children: React.ReactNode }) {
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
