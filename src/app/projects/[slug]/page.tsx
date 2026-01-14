"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProject } from "@/lib/sanity";
import { Project } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatCategoryName } from "@/lib/formatCategory";
import PageLayout from "@/components/layout/PageLayout";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { urlForImage } from "@/sanity/lib/image";

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                if (slug && typeof slug === 'string') {
                    const data = await getProject(slug);
                    setProject(data);

                    // Update document title and meta description
                    if (data) {
                        document.title = `${data.title} | Christian Cecoro`;

                        // Update meta description
                        const metaDesc = document.querySelector('meta[name="description"]');
                        if (metaDesc && data.description) {
                            metaDesc.setAttribute('content', data.description);
                        }
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (isLoading) {
        return (
            <PageLayout>
                <main className="min-h-screen bg-black text-white pb-32">
                <div className="pt-40 px-8 md:px-24 mb-16 animate-pulse">
                    <div className="h-4 bg-neutral-900 rounded w-32 mb-12" />
                    <div className="h-20 bg-neutral-900 rounded w-3/4 mb-8" />
                    <div className="border-t border-white/20 pt-8">
                        <div className="h-8 bg-neutral-900 rounded w-1/2" />
                    </div>
                </div>
                <div className="px-8 md:px-24 max-w-[1400px] mx-auto mb-24">
                    <div className="w-full aspect-video bg-neutral-900 rounded-sm animate-pulse" />
                </div>
            </main>
            </PageLayout>
        );
    }

    if (!project) return <PageLayout><div className="min-h-screen bg-black" /></PageLayout>;

    return (
        <PageLayout>
            <main className="min-h-screen bg-black text-white pb-32">

            {/* 1. Header Section */}
            <div className="pt-40 px-8 md:px-24 mb-16 relative z-10">
                <Link href="/works" className="relative z-50 inline-flex items-center text-neutral-400 hover:text-white mb-12 transition-colors text-sm uppercase tracking-widest cursor-pointer-desktop">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Works
                </Link>

                <h1 className="font-serif text-[12vw] leading-[0.9] mb-8">
                    {project.title}
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-8 gap-8">
                    {/* Project Categories */}
                    <div className="flex flex-wrap gap-2 max-w-md">
                        {project.projectTypes?.map((type, i) => (
                            <span key={i} className="px-3 py-1 rounded-full border border-white/20 text-xs uppercase tracking-widest">
                                {formatCategoryName(type)}
                            </span>
                        ))}
                    </div>

                    {/* Client Info */}
                    <div className="text-right">
                        <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Client</span>
                        <span className="text-xl font-medium">{project.client || "Confidential"}</span>
                    </div>
                </div>
            </div>

            {/* 2. Hero Image - Contained with Margins */}
            <div className="px-8 md:px-24 max-w-[1400px] mx-auto mb-24 relative z-10">
                <motion.div
                    className="w-full aspect-video relative overflow-hidden rounded-sm"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {project.mainImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={typeof project.mainImage === 'string'
                                ? project.mainImage
                                : urlForImage(project.mainImage).width(1400).quality(90).url()}
                            alt={typeof project.mainImage === 'string'
                                ? project.title
                                : (project.mainImage.alt || project.title)}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                </motion.div>
            </div>

            {/* 3. Context Grid */}
            <div className="px-8 md:px-24 max-w-[1400px] mx-auto mb-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-brand-red font-serif text-3xl italic mb-4">The Challenge</h3>
                        <p className="text-neutral-300 leading-relaxed text-sm">
                            {project.challenge || "Identification of the core problem and market positioning requirements."}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-brand-red font-serif text-3xl italic mb-4">The Approach</h3>
                        <p className="text-neutral-300 leading-relaxed text-sm">
                            {project.approach || "Strategic design thinking combined with modern technical implementation."}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-brand-red font-serif text-3xl italic mb-4">The Solution</h3>
                        <p className="text-neutral-300 leading-relaxed text-sm">
                            {project.solution || "A comprehensive digital ecosystem tailored to the client's needs."}
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. Gallery */}
            {project.images && project.images.length > 0 && (
                <ProjectGallery images={project.images} />
            )}

            {/* 5. Next Project */}
            <div className="border-t border-white/10 pt-24 text-center relative z-10">
                <p className="text-neutral-500 uppercase tracking-widest text-xs mb-4">Next Project</p>
                <Link href="/works" className="font-serif text-[8vw] hover:text-brand-red transition-colors cursor-pointer-desktop">
                    View All Works
                </Link>
            </div>

        </main>
        </PageLayout>
    );
}
