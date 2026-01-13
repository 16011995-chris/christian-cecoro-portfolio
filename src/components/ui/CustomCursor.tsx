"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const rafIdRef = useRef<number | null>(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true per SSR

    useEffect(() => {
        // Detect touch device
        const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

        setIsTouchDevice(hasTouchSupport || hasCoarsePointer);

        // Don't attach listeners on touch devices
        if (hasTouchSupport || hasCoarsePointer) {
            return;
        }

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // RAF-based update for smooth 60fps
        const updateCursorPosition = () => {
            const { x, y } = mousePositionRef.current;
            gsap.to(cursor, { x, y, duration: 0.1, overwrite: true });
            gsap.to(follower, { x, y, duration: 0.5, ease: "power2.out", overwrite: true });
            rafIdRef.current = null;
        };

        // Throttled mousemove using RAF
        const moveCursor = (e: MouseEvent) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
            if (rafIdRef.current === null) {
                rafIdRef.current = requestAnimationFrame(updateCursorPosition);
            }
        };

        const handleHoverStart = () => {
            gsap.to(cursor, { scale: 0, duration: 0.2 });
            gsap.to(follower, { backgroundColor: "rgba(255, 59, 48, 0.5)", mixBlendMode: 'normal', duration: 0.3 });
        };

        const handleHoverEnd = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, { backgroundColor: "transparent", mixBlendMode: 'difference', duration: 0.3 });
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });

        const clickables = document.querySelectorAll("a, button, .cursor-hover");
        clickables.forEach(el => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
            clickables.forEach(el => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, []);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
            <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-colors" />
        </>
    );
}
