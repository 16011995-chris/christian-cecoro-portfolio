"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidEdgeProps {
    position: "top" | "bottom" | "left" | "right";
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function LiquidEdge({ position, className, children, onClick }: LiquidEdgeProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Define the "Blob" expansion logic based on position
    const getInitialPath = () => {
        // Flat line (Base state)
        if (position === "top") return "M0,0 Q50,0 100,0 V0 H0 Z"; // Top Edge (y=0)
        if (position === "bottom") return "M0,60 Q50,60 100,60 V60 H0 Z"; // Bottom Edge (y=60) - ViewBox height is 60
        if (position === "left") return "M0,0 Q0,50 0,100 H0 V0 Z"; // Left Edge (x=0)
        if (position === "right") return "M60,0 Q60,50 60,100 H60 V0 Z"; // Right Edge (x=60) - ViewBox width is 60
        return "";
    };

    const getHoverPath = () => {
        // Expanded Curved Blob - More accentuated (Strong on all sides)
        // Top: Bulge Down (positive Y) to 110
        if (position === "top") return "M0,0 Q50,110 100,0 V0 H0 Z";

        // Bottom: Bulge Up (negative Y relative to 60 base) -> Go to -50
        if (position === "bottom") return "M0,60 Q50,-50 100,60 V60 H0 Z";

        // Left: Bulge Right (positive X) to 110
        if (position === "left") return "M0,0 Q110,50 0,100 H0 V0 Z";

        // Right: Bulge Left (negative X relative to 60 base) -> Go to -50
        if (position === "right") return "M60,0 Q-50,50 60,100 H60 V0 Z";
        return "";
    };

    const isHorizontal = position === "top" || position === "bottom";

    return (
        <div
            className={cn(
                "absolute z-50 flex items-center justify-center cursor-pointer-desktop pointer-events-auto",
                isHorizontal ? "w-full h-12 left-0" : "h-full w-12 top-0",
                position === "top" && "top-0",
                position === "bottom" && "bottom-0",
                position === "left" && "left-0",
                position === "right" && "right-0",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Liquid SVG Background */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox={isHorizontal ? "0 0 100 60" : "0 0 60 100"}
                    preserveAspectRatio="none"
                >
                    <motion.path
                        d={isHovered ? getHoverPath() : getInitialPath()}
                        fill="#EF2917" // Brand Red
                        animate={{ d: isHovered ? getHoverPath() : getInitialPath() }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="opacity-90"
                    />
                </svg>
            </div>

            {/* Content (Text) */}
            <div className={cn(
                "relative z-10 transition-colors duration-300 font-medium tracking-widest uppercase text-xs pointer-events-none",
                isHovered ? "text-white" : "text-white/60",
                !isHorizontal && "rotate-180 [writing-mode:vertical-rl]" // Rotate text for sidebars
            )}>
                {children}
            </div>
        </div>
    );
}
