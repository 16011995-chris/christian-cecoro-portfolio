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
        // Detect touch-primary devices using media queries (most reliable)
        const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
        const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // A device is touch-primary if it has coarse pointer OR mobile user agent
        // BUT we prioritize fine pointer (desktop with mouse) over touch
        const isTouchPrimary = (hasCoarsePointer && !hasFinePointer) || isMobileUserAgent;

        setIsTouchDevice(isTouchPrimary);

        // Don't attach listeners on touch-primary devices
        if (isTouchPrimary) {
            return;
        }

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) {
            return;
        }

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
    }, [isTouchDevice]); // Re-run when isTouchDevice changes

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            <div ref={cursorRef} data-custom-cursor className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
            <div ref={followerRef} data-custom-cursor className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-colors" />
        </>
    );
}
