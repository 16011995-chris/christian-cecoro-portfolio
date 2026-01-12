export default function Expertise() {
    const areas = [
        {
            title: "Branding",
            services: ["Brand Strategy", "Visual Identity", "Art Direction", "Brand Guidelines", "Naming"]
        },
        {
            title: "Digital",
            services: ["Web Design", "UI/UX Design", "Interactive Prototyping", "Awwwards Development", "E-Commerce"]
        },
        {
            title: "Content",
            services: ["Social Media Strategy", "Content Creation", "Motion Design", "3D Visuals", "Copywriting"]
        }
    ];

    return (
        <section className="bg-black px-8 md:px-16 py-32 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                    <h2 className="text-sm uppercase tracking-widest text-brand-red mb-8">Expertise</h2>
                    <p className="font-serif text-3xl md:text-4xl text-gray-200 leading-tight">
                        A multidisciplinary approach to build brands that matter in the digital age.
                    </p>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {areas.map((area, i) => (
                        <div key={i} className="space-y-8">
                            <h3 className="font-serif text-2xl text-white">{area.title}</h3>
                            <ul className="space-y-4">
                                {area.services.map((service, j) => (
                                    <li key={j} className="text-gray-400 text-base border-b border-white/10 pb-2 hover:text-white hover:border-white transition-colors cursor-pointer">
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
