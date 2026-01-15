"use client";

import React from "react";

interface RollingButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function RollingButton({ text, href, onClick, className = "" }: RollingButtonProps) {
    const sharedClasses = `group relative inline-flex justify-center h-14 overflow-hidden rounded-full border border-white/20 bg-transparent px-8 transition-colors hover:border-brand-red ${className}`;

    const content = (
        <div className="relative flex h-full items-center flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[100%]">
            <span className="flex h-full items-center text-sm uppercase tracking-widest text-white">{text}</span>
            <span className="absolute top-full flex h-full items-center text-sm uppercase tracking-widest text-brand-red">{text}</span>
        </div>
    );

    if (href) {
        return (
            <a href={href} onClick={onClick} className={sharedClasses}>
                {content}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={sharedClasses}>
            {content}
        </button>
    );
}
