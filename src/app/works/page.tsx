"use client";

import { motion } from "framer-motion";
import { getProjects } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Project } from "@/types";
import { formatCategoryName } from "@/lib/formatCategory";
import PageLayout from "@/components/layout/PageLayout";
import { urlForImage } from "@/sanity/lib/image";

export default function WorksPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);

                // Extract unique categories from projectTypes array
                const categories = new Set<string>();
                data.forEach(project => {
                    if (project.projectTypes && Array.isArray(project.projectTypes)) {
                        project.projectTypes.forEach(type => {
                            categories.add(type);
                        });
                    }
                });
                setAllCategories(Array.from(categories).sort());
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Filter logic - check if project has any of the selected categories
    const filteredProjects = selectedCategories.length === 0
        ? projects
        : projects.filter(project => {
            if (!project.projectTypes || !Array.isArray(project.projectTypes)) return false;
            return selectedCategories.some(selectedCat => project.projectTypes.includes(selectedCat));
        });

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => setSelectedCategories([]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <PageLayout>
            <main className="min-h-screen w-full bg-black pt-32 pb-24 px-6 md:px-24 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto">
                {/* Title */}
                <motion.div
                    className="mb-10 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="font-serif text-[56px] md:text-[80px] leading-[1.1] text-white">
                        Visual <span className="text-brand-red italic">Chronicles</span>
                    </h1>
                    <p className="text-white mt-4 max-w-md mx-auto md:max-w-none md:mx-0 text-[16px] tracking-wide">
                        A curation of digital experiences, branding, and motion design.
                    </p>
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/3] bg-neutral-900 mb-4 rounded-sm" />
                                <div className="h-6 bg-neutral-900 rounded mb-3 w-3/4" />
                                <div className="flex gap-2">
                                    <div className="h-6 bg-neutral-900 rounded w-20" />
                                    <div className="h-6 bg-neutral-900 rounded w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filters */}
                {!isLoading && allCategories.length > 0 && (
                    <motion.div
                        className="mb-12 overflow-x-auto scrollbar-hide -mx-6 md:mx-0 px-6 md:px-0"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex gap-3 min-w-max md:flex-wrap md:min-w-0">
                        {/* All Button */}
                        <button
                            onClick={clearFilters}
                            className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all duration-300 ${
                                selectedCategories.length === 0
                                    ? 'border-brand-red text-brand-red bg-brand-red/10'
                                    : 'border-white/20 text-neutral-400 hover:border-white/40 hover:text-white'
                            }`}
                        >
                            All
                        </button>

                        {/* Category Pills */}
                        {allCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                                    selectedCategories.includes(category)
                                        ? 'border-brand-red text-brand-red bg-brand-red/10'
                                        : 'border-white/20 text-neutral-400 hover:border-white/40 hover:text-white'
                                }`}
                            >
                                {formatCategoryName(category)}
                            </button>
                        ))}
                        </div>
                    </motion.div>
                )}

                {/* Grid - 3 Columns with Staggered Entrance */}
                {!isLoading && filteredProjects.length > 0 && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10"
                        variants={container}
                        initial="hidden"
                        animate="show"
                        key={selectedCategories.join(',')}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project._id || index}
                                variants={item}
                            >
                                <Link href={`/projects/${project.slug?.current}`} className="group block">
                                    {/* Card Image Container */}
                                    <div className="aspect-[4/3] bg-neutral-900 mb-4 overflow-hidden rounded-sm relative">
                                        {project.mainImage ? (
                                            <Image
                                                src={typeof project.mainImage === 'string'
                                                    ? project.mainImage
                                                    : urlForImage(project.mainImage).width(800).quality(85).url()}
                                                alt={typeof project.mainImage === 'string'
                                                    ? project.title
                                                    : (project.mainImage.alt || project.title)}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={index < 6}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-800 group-hover:bg-neutral-700 transition-colors duration-500" />
                                        )}

                                        {/* Overlay Darkener for Text Readability (Optional, lighter than before) */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                                        {/* Abstract 'Wow' Element - Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

                                        {/* Number (Only if no image, or keep specific design choice? User wants images. Let's hide number if image exists to be clean) */}
                                        {!project.mainImage && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-6xl font-serif italic text-white">
                                                {index + 1}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col items-start gap-4">
                                        <h2 className="text-2xl font-medium text-white group-hover:text-brand-red transition-colors duration-300">
                                            {project.title}
                                        </h2>

                                        {/* Pill Tags - Rendered from projectTypes array */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.projectTypes?.map((type, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-neutral-400 bg-white/5 backdrop-blur-sm group-hover:border-white/30 group-hover:text-white transition-all"
                                                >
                                                    {formatCategoryName(type)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!isLoading && filteredProjects.length === 0 && projects.length > 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-neutral-500 text-lg">
                            No projects found for the selected categories.
                        </p>
                    </motion.div>
                )}
            </div>
        </main>
        </PageLayout>
    );
}
