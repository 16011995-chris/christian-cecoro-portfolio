"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import RollingButton from '@/components/ui/RollingButton';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/works', label: 'Works' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const pathname = usePathname();

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-[80vw] max-w-sm bg-black border-l border-white/20 z-50 flex flex-col"
                    >
                        {/* Close Button */}
                        <div className="flex justify-end p-6">
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 px-6 py-12">
                            <ul className="space-y-8">
                                {menuItems.map((item, index) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <motion.li
                                            key={item.href}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={onClose}
                                                className={`block font-serif text-4xl transition-colors ${
                                                    isActive ? 'text-brand-red' : 'text-white hover:text-brand-red'
                                                }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Footer CTA */}
                        <div className="p-6 border-t border-white/20">
                            <RollingButton
                                text="Let's work together"
                                href="/contact"
                                onClick={onClose}
                                className="w-full border-white/30 text-white"
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
