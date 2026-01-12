"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RollingButton from "@/components/ui/RollingButton";

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const rafIdRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Reveal Animation
            tl.from(titleRef.current?.querySelectorAll(".line-inner") || [], {
                y: 200,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.5
            })
                .from(subtitleRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1");
        }, heroRef);

        // Optimized mousemove with RAF
        const updateMousePosition = () => {
            const x = (mouseRef.current.x / window.innerWidth - 0.5) * 2;
            const y = (mouseRef.current.y / window.innerHeight - 0.5) * 2;
            setMousePosition({ x, y });
            rafIdRef.current = null;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            if (rafIdRef.current === null) {
                rafIdRef.current = requestAnimationFrame(updateMousePosition);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            ctx.revert();
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    return (
        <section ref={heroRef} className="h-screen w-full flex flex-col justify-center px-6 md:px-16 pt-20 relative overflow-hidden perspective-1000">
            {/* 3D Spline Scene - 30x Multiplier + Scale 125% to hide Spline Logo */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-100 ease-out will-change-transform scale-[1.25]"
                style={{
                    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

                <iframe
                    src='https://my.spline.design/untitled-Thz2WHNgWf8kwiiT9e6KzZ0Z/'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                    className="w-full h-full pointer-events-none"
                    title="Spline 3D Scene"
                ></iframe>
            </div>

            <div className="relative z-10 pointer-events-none flex flex-col items-center text-center w-full px-4">
                {/* Subtitle moved UP - Tighter spacing (mb-4) */}
                <div className="overflow-hidden mb-4">
                    <p ref={subtitleRef} className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-400">
                        Digital Designer & Art Director
                    </p>
                </div>

                {/* Main Title - Increased Leading to prevent overlap */}
                <h1 ref={titleRef} className="font-serif text-[56px] lg:text-[120px] leading-[1.1] text-white mix-blend-difference mb-6 py-2">
                    <div className="overflow-visible"><span className="line-inner block">Making Complexity</span></div>
                    <div className="overflow-visible"><span className="line-inner block text-brand-red">Intuitive</span></div>
                </h1>

                {/* Glass CTA - Standardized: 56px Height, Transparent Background, 24px from Text */}
                <div className="pointer-events-auto fade-in-up" style={{ opacity: 1 }}>
                    <RollingButton
                        href="/works"
                        text="Explore Projects"
                        className="h-[56px] px-8 text-xs font-medium tracking-widest uppercase border border-white/20 bg-transparent backdrop-blur-md"
                    />
                </div>
            </div>
        </section>
    );
}
