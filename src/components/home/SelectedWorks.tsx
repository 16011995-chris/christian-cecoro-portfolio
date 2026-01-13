import Link from 'next/link';
import { getProjects } from '@/lib/sanity';
import { Project } from '@/types';
import { formatCategoryName } from '@/lib/formatCategory';

export default async function SelectedWorks() {
    const projects = await getProjects();

    return (
        <section className="min-h-screen bg-black px-8 md:px-16 py-32">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-16">Selected Works</h2>

            <div className="flex flex-col">
                {projects.map((project: Project, index: number) => (
                    <Link key={project.slug.current} href={`/projects/${project.slug.current}`} className="group border-t border-white/20 py-12 flex justify-between items-center transition-colors hover:bg-white/5">
                        <div className="flex items-center gap-8">
                            <span className="text-xs font-mono text-gray-600 group-hover:text-brand-red transition-colors">0{index + 1}</span>
                            <h3 className="font-serif text-5xl md:text-7xl group-hover:translate-x-4 transition-transform duration-500">
                                {project.title}
                            </h3>
                        </div>
                        <span className="text-xs uppercase border border-white/20 px-3 py-1 rounded-full group-hover:bg-brand-red group-hover:border-brand-red transition-colors">
                            {project.projectTypes?.[0] ? formatCategoryName(project.projectTypes[0]) : 'Project'}
                        </span>
                    </Link>
                ))}
            </div>

            <div className="border-t border-white/20"></div>
        </section>
    );
}
