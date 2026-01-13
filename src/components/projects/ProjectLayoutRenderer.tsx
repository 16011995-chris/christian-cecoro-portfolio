import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { formatCategoryName } from "@/lib/formatCategory";

interface LayoutProps {
    project: Project;
}

// Sub-components for specific layouts
const BrandingLayout = ({ project }: LayoutProps) => (
    <div className="space-y-24">
        {/* Branding Specific: Palette Section */}
        <section className="px-8 md:px-16">
            <h3 className="font-serif text-3xl mb-8">Visual Identity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.brandColors?.map((color: string, i: number) => (
                    <div key={i} className="aspect-square flex items-end p-4 border border-white/10" style={{ backgroundColor: color }}>
                        <span className="text-xs uppercase bg-black/50 px-2 py-1 rounded backdrop-blur text-white">{color}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* Branding Specific: Logo Grid Placeholder */}
        <section className="px-8 md:px-16">
            <h3 className="font-serif text-3xl mb-8">Logo Construction</h3>
            <div className="w-full aspect-video bg-white/5 border border-white/10 rounded flex items-center justify-center">
                <p className="text-gray-500">Logo Safe Area & Grid (Placeholder)</p>
            </div>
        </section>
    </div>
);

const UXUILayout = ({ project }: LayoutProps) => (
    <div className="space-y-24">
        {/* UX Specific: Challenge & Solution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 px-8 md:px-16">
            <div>
                <h3 className="text-sm uppercase tracking-widest text-brand-red mb-4">The Challenge</h3>
                <p className="text-xl leading-relaxed text-gray-300">{project.challenge}</p>
            </div>
            <div>
                <h3 className="text-sm uppercase tracking-widest text-brand-red mb-4">The Solution</h3>
                <p className="text-xl leading-relaxed text-gray-300">{project.solution}</p>
            </div>
        </section>

        {/* UX Specific: Wireframes Placeholder */}
        <section className="px-8 md:px-16">
            <h3 className="font-serif text-3xl mb-8">Wireframes & Flows</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[9/16] bg-white/5 border border-white/10"></div>
                <div className="aspect-[9/16] bg-white/5 border border-white/10"></div>
            </div>
        </section>
    </div>
);

export default function ProjectLayoutRenderer({ project }: LayoutProps) {
    return (
        <article className="min-h-screen bg-black text-white pt-32 pb-24">
            {/* Common Hero for all projects */}
            <div className="px-8 md:px-16 mb-24">
                <span className="text-xs uppercase border border-white/20 px-3 py-1 rounded-full mb-6 inline-block">
                    {formatCategoryName(project.projectTypes?.[0] || '') || 'Project'}
                </span>
                <h1 className="font-serif text-[8vw] leading-none mb-8">{project.title}</h1>
                <p className="text-2xl text-gray-400 max-w-4xl leading-tight">{project.description}</p>
            </div>

            {/* AUTOMATION TRIGGER: Render layout based on type */}
            {project.projectTypes?.includes('brand-identity') && <BrandingLayout project={project} />}
            {project.projectTypes?.includes('uxui') && <UXUILayout project={project} />}

            {/* Fallback or default content */}
            {!project.projectTypes?.some(type => ['brand-identity', 'uxui'].includes(type)) && (
                <div className="px-8 md:px-16"><p>Standard Project Layout</p></div>
            )}
        </article>
    );
}
