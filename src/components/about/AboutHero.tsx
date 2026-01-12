"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
    return (
        <section className="min-h-screen bg-black text-white px-6 md:px-24 flex items-center pt-32 pb-10">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center w-full">

                {/* Text Column */}
                <div className="md:col-span-7 md:pr-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-[56px] md:text-[6vw] leading-[1.1] text-white mb-10"
                    >
                        Beyond <br />
                        <span className="text-brand-red italic whitespace-nowrap">the pixel.</span>
                    </motion.h1>

                    <div className="space-y-8 text-neutral-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                        <p>
                            I'm Christian Cecoro, a multidisciplinary designer from Italy.
                            My work sits at the intersection of brand identity, digital product design,
                            and immersive motion graphics.
                        </p>
                        <p>
                            I don't just design websites; I build digital ecosystems that tell stories.
                            My approach is rooted in strategic thinking—stripping away the unnecessary
                            to reveal the core essence of a brand.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Experience</h3>
                                <p className="text-2xl font-serif text-white">7+ Years</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Projects</h3>
                                <p className="text-2xl font-serif text-white">60+ Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Column */}
                <div className="md:col-span-5 relative mt-0 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden relative border border-white/20 shadow-2xl shadow-neutral-900/50"
                    >
                        <Image
                            src="/about/me.png"
                            alt="Christian Cecoro"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
