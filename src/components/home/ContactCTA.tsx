import Link from "next/link";
import RollingButton from "@/components/ui/RollingButton";

export default function ContactCTA() {
    return (
        <section className="bg-black px-8 md:px-16 py-32 flex flex-col items-center text-center border-t border-white/10">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-8">Next Level</p>
            <h2 className="font-serif text-[6vw] leading-[1.1] text-white mb-12 max-w-4xl">
                Have a project in mind? <br />
                <span className="text-gray-500 italic">Let's craft it together.</span>
            </h2>

            <RollingButton
                href="mailto:hello@christiancecoro.com"
                text="Start a specific conversation"
                className="h-[56px] px-8 text-xs font-medium tracking-widest uppercase text-white border border-white/20 bg-transparent backdrop-blur-md hover:bg-white/10"
            />
        </section>
    );
}
