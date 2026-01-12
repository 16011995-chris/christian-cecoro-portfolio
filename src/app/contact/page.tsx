import Link from "next/link";
import ContactSpline from "@/components/contact/ContactSpline";
import RollingButton from "@/components/ui/RollingButton";

export default function ContactPage() {
    return (
        <main className="bg-black min-h-screen text-white relative overflow-x-hidden">
            <ContactSpline />

            <div className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24 relative z-10">
                <div className="flex flex-col items-center">
                    {/* Intro */}
                    <h1 className="font-serif text-[56px] md:text-[5vw] leading-[1.1] text-white/80 mb-6 md:mb-16 text-center">
                        Have a specific <span className="text-white">project?</span> <br />
                        Let's create <br />
                        <span className="text-brand-red italic">something iconic.</span>
                    </h1>

                    {/* Email CTA */}
                    <RollingButton
                        href="mailto:christiancecoro@gmail.com"
                        text="christiancecoro@gmail.com"
                        className="h-14 px-10 border-white/40 text-white"
                    />
                </div>
            </div>

            {/* Footer Info */}
            <div className="px-6 md:px-24 pb-12 relative z-10">
                <div className="max-w-[1400px] mx-auto w-full">
                    <div className="flex justify-between items-end border-t border-white/10 pt-12">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Location & Time</h3>
                            <p className="text-xl">Italy, CET</p>
                            <p className="text-white/60">Available for remote work</p>
                        </div>

                        <div className="text-right">
                            <p className="text-neutral-600 text-sm">© 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
