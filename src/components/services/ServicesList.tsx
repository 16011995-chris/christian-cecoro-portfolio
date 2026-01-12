"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "UX/UI & Product Design",
        description: "Designing intuitive and user-centered interfaces through clear structure, flow, and interaction. We build scalable UI frameworks to ensure visual consistency.",
        deliverables: ["UX/UI Design", "Product Design", "Design Systems", "Prototyping", "Mobile Apps", "Web Platforms"]
    },
    {
        id: "02",
        title: "Visual & Brand Identity",
        description: "Creating visual systems that express brand values across digital and physical touchpoints. We define and guide the visual language of projects across formats.",
        deliverables: ["Visual Identity", "Art Direction", "Visual Storytelling", "Brand Guidelines", "Iconography", "Print Design"]
    },
    {
        id: "03",
        title: "Motion & 3D Design",
        description: "Adding depth and movement through animations and 3D assets for digital storytelling. We turn static concepts into immersive visual narratives.",
        deliverables: ["3D Motion", "UI Animation", "Visual Effects", "Digital Storytelling", "Promo Videos", "Micro-interactions"]
    },
    {
        id: "04",
        title: "Strategic Design",
        description: "Solving design challenges with purpose, user insight, and business-driven thinking. We lead collaborative sessions to spark ideas and shape outcomes.",
        deliverables: ["Design Strategy", "Workshops", "Co-Creation", "User Research", "Market Analysis", "Concept Development"]
    }
];

export default function ServicesList() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="pb-24 pt-0 px-6 md:px-24 bg-black text-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="border-t border-white/20 last:border-b"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full py-6 md:py-12 flex flex-col md:flex-row items-start justify-between group text-left transition-colors hover:bg-white/5 px-0 md:px-4"
                            >
                                <span className="font-mono text-sm text-neutral-500 mb-4 md:mb-0 w-24 group-hover:text-white transition-colors shrink-0">
                                    /{service.id}
                                </span>
                                <div className="flex items-start justify-between flex-1 w-full md:w-auto">
                                    <h3 className="font-serif text-4xl md:text-6xl flex-1 group-hover:text-brand-red transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <ArrowUpRight className={`w-6 h-6 text-neutral-500 transition-transform duration-500 shrink-0 ml-4 ${activeIndex === index ? 'rotate-90 text-brand-red' : 'group-hover:rotate-45 group-hover:text-white'}`} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        {/* Content aligned with Title: Title starts after w-24 (approx 6rem) + gaps.
                                            We'll use a grid or left margin to match the title's start position. */}
                                        <div className="pb-8 px-0 md:px-4 md:flex">
                                            {/* Spacer to match the ID width */}
                                            <div className="hidden md:block w-24 shrink-0" />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1 pt-4">
                                                <div>
                                                    <p className="text-neutral-300 leading-relaxed text-lg">
                                                        {service.description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-6">Deliverables</h4>
                                                    <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                                                        {service.deliverables.map((item, i) => (
                                                            <li key={i} className="text-sm text-white flex items-center before:content-[''] before:w-1 before:h-1 before:bg-brand-red before:rounded-full before:mr-3">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
