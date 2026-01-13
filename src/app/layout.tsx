import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

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
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
