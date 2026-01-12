"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function IubendaBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted
        const hasAccepted = localStorage.getItem("iubenda-accepted");
        if (!hasAccepted) {
            setIsVisible(true);
        }

        // Load Iubenda script
        const script = document.createElement("script");
        script.src = "https://cdn.iubenda.com/iubenda.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleAccept = () => {
        localStorage.setItem("iubenda-accepted", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm"
                >
                    <div className="bg-black border border-white/20 rounded-lg p-6 shadow-2xl backdrop-blur-md">
                        {/* Close Button */}
                        <button
                            onClick={handleAccept}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Content */}
                        <div className="pr-6">
                            <h3 className="text-white font-medium text-sm mb-3">
                                Cookie & Privacy
                            </h3>
                            <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                                We use cookies to enhance your browsing experience and analyze our traffic.
                                By continuing to use this site, you accept our use of cookies.
                            </p>

                            {/* Links */}
                            <div className="flex gap-4 mb-4">
                                <a
                                    href="https://www.iubenda.com/privacy-policy/33864853"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-brand-red hover:underline transition-all"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="https://www.iubenda.com/privacy-policy/33864853/cookie-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-brand-red hover:underline transition-all"
                                >
                                    Cookie Policy
                                </a>
                            </div>

                            {/* Accept Button */}
                            <button
                                onClick={handleAccept}
                                className="w-full px-4 py-2 bg-brand-red text-white text-xs uppercase tracking-widest rounded hover:bg-brand-red/90 transition-colors"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
