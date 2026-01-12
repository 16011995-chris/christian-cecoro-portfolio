import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

import Header from "@/components/shared/Header";
import ViewportNavigation from "@/components/layout/ViewportNavigation";
import IubendaBanner from "@/components/shared/IubendaBanner";

export const metadata: Metadata = {
  title: "Christian Cecoro | Portfolio",
  description: "Digital Designer & Art Director",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-black text-white selection:bg-brand-red selection:text-white">
        <CustomCursor />
        <SmoothScrollProvider>
          <Header />
          <ViewportNavigation />

          {children}

          <IubendaBanner />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
