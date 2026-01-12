"use client";

import LiquidEdge from "@/components/ui/LiquidEdge";
// import Link from "next/link"; // Link might be used in LiquidEdge? No, navigateTo.
// Check if Link is used elsewhere. No, only in the removed top bar.
// Check Image and RollingButton.
import { usePathname, useRouter } from "next/navigation";

export default function ViewportNavigation() {
    const pathname = usePathname();
    const router = useRouter(); // Use router for cleaner client-side nav if preferred, but window.location is consistent with previous code. 
    // Wait, the previous code used window.location.href. I will keep it consistent or upgrade to router.push. 
    // Router is better for SPA feel. I'll switch to router.push for better UX (no reload).

    const navigateTo = (path: string) => {
        // window.location.href = path; 
        router.push(path);
    };

    const isWorksPage = pathname === '/works';
    const isServicesPage = pathname === '/services';
    const isAboutPage = pathname === '/about';
    const isContactPage = pathname === '/contact';

    return (
        <div className="fixed inset-0 z-50 pointer-events-none hidden md:block">
            {/* Top Bar removed - handled by Header component */}

            {/* Left Liquid Edge */}
            <LiquidEdge
                position="left"
                onClick={() => navigateTo(isWorksPage ? '/' : '/works')}
            >
                {isWorksPage ? 'Back to Home' : 'Explore Projects'}
            </LiquidEdge>

            {/* Right Liquid Edge */}
            <LiquidEdge
                position="right"
                onClick={() => navigateTo(isServicesPage ? '/' : '/services')}
            >
                {isServicesPage ? 'Back to Home' : 'Discover Services'}
            </LiquidEdge>

            {/* Bottom Liquid Edge */}
            <LiquidEdge
                position="bottom"
                onClick={() => navigateTo(isAboutPage ? '/' : '/about')}
            >
                {isAboutPage ? 'Back to Home' : 'Discover Christian Cecoro'}
            </LiquidEdge>
        </div>
    );
}
