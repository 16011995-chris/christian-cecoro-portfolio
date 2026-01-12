"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("tachyon_visited");
        if (hasVisited) {
            setIsLoading(false);
            return;
        }

        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) return prev + 1;
                clearInterval(interval);
                return 100;
            });
        }, 20);

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("tachyon_visited", "true");
        }, 2500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    // RIMOSSO: if (!isLoading) return null;
    // AnimatePresence ha bisogno di rimanere montato per gestire l'exit!

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader" // Aggiungi una key!
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                >
                    <div className="relative overflow-hidden">
                        <motion.span
                            className="font-serif italic text-[15vw] md:text-[200px] text-brand-red leading-none select-none mix-blend-difference"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0.5 }
                            }}
                            transition={{ duration: 1 }}
                        >
                            {counter}%
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
