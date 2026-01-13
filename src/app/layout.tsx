import type { Metadata } from "next";
import "./globals.css";
import ClientOnlyLayout from "@/components/layout/ClientOnlyLayout";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL('https://christiancecoro.com'),
  title: {
    default: 'Christian Cecoro | Digital Designer & Art Director',
    template: '%s | Christian Cecoro',
  },
  description: 'Portfolio of Christian Cecoro - Digital Designer & Art Director specializing in Brand Identity, UX/UI Design, and Visual Design.',
  keywords: ['digital designer', 'art director', 'brand identity', 'ux ui design', 'visual design', 'portfolio'],
  authors: [{ name: 'Christian Cecoro' }],
  creator: 'Christian Cecoro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://christiancecoro.com',
    siteName: 'Christian Cecoro Portfolio',
    title: 'Christian Cecoro | Digital Designer & Art Director',
    description: 'Portfolio of Christian Cecoro - Digital Designer & Art Director specializing in Brand Identity, UX/UI Design, and Visual Design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Christian Cecoro Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Cecoro | Digital Designer & Art Director',
    description: 'Portfolio of Christian Cecoro - Digital Designer & Art Director',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        )}
      </body>
    </html>
  );
}
