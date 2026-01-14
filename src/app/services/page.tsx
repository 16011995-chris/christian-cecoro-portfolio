import type { Metadata } from 'next';
import ServicesList from "@/components/services/ServicesList";
import ContactCTA from "@/components/home/ContactCTA";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: 'Services',
  description: 'Digital design services offered by Christian Cecoro - Brand Identity, UX/UI Design, Visual Design, and Motion Design.',
  openGraph: {
    title: 'Services | Christian Cecoro',
    description: 'Digital design services offered by Christian Cecoro - Brand Identity, UX/UI Design, Visual Design, and Motion Design.',
  },
};

export default function ServicesPage() {
    return (
        <PageLayout>
            <main className="bg-black min-h-screen relative">


            <div className="pt-32 px-6 md:px-24 mb-12">
                <div className="max-w-[1400px] mx-auto w-full text-left">
                    <h1 className="font-serif text-[56px] md:text-[8vw] leading-[1.1] text-white">
                        <span className="text-brand-red italic">Capabilities</span>
                    </h1>
                </div>
            </div>

            <ServicesList />
        </main>
        </PageLayout>
    );
}
