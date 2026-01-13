import type { Metadata } from "next";
import "./globals.css";
import ClientOnlyLayout from "@/components/layout/ClientOnlyLayout";

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
        <ClientOnlyLayout>{children}</ClientOnlyLayout>
      </body>
    </html>
  );
}
