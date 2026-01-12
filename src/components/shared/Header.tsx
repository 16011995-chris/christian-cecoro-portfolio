"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RollingButton from '@/components/ui/RollingButton';
import MobileMenu from '@/components/shared/MobileMenu';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const isContactPage = pathname === '/contact';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full px-6 py-6 flex justify-between items-center z-50 mix-blend-difference">
                <Link href="/" className="block w-[72px] relative">
                    <Image
                        src="/logo.svg"
                        alt="Christian Cecoro"
                        width={72}
                        height={72}
                        className="w-[72px] h-auto dark:invert"
                        priority
                    />
                </Link>

                <nav className="hidden md:block">
                    {/* Desktop navigation can be added here if needed */}
                </nav>

                {!isContactPage && (
                    <RollingButton
                        text="Let's work together"
                        href="/contact"
                        className="max-[1279px]:hidden xl:inline-flex border-white/30 text-white"
                    />
                )}

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="xl:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white/10 transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5 text-white" />
                </button>
            </header>

            {/* Mobile Menu Component */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
}
