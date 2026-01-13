"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Add data-route attribute to body for CSS targeting if needed
    const cleanPath = pathname?.replace(/\//g, '-').slice(1) || 'home';
    document.body.setAttribute('data-route', cleanPath);

    return () => {
      document.body.removeAttribute('data-route');
    };
  }, [pathname]);

  return <>{children}</>;
}
