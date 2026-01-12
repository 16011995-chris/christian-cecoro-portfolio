import Link from "next/link";

interface FooterProps {
    simple?: boolean;
}

export default function Footer({ simple = false }: FooterProps) {
    return (
        <footer className="bg-black text-white px-8 md:px-16 py-12 flex flex-col md:flex-row justify-between items-end border-t border-white/10">
            <div>
                {!simple ? (
                    <>
                        <h2 className="font-serif text-[4vw] leading-none mb-4">Let's work together</h2>
                        <a href="mailto:hello@christiancecoro.com" className="text-gray-400 hover:text-white transition-colors">hello@christiancecoro.com</a>
                    </>
                ) : (
                    <span className="text-neutral-500 text-xs uppercase tracking-widest">© 2024 Christian Cecoro</span>
                )}
            </div>

            <div className="flex gap-8 mt-8 md:mt-0 text-xs uppercase tracking-widest items-center">
                <a href="#" className="hover:text-brand-red transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-brand-red transition-colors">Instagram</a>
                <a href="#" className="hover:text-brand-red transition-colors">Colors</a>
            </div>
        </footer>
    );
}
