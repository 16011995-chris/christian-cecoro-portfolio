import type { Metadata } from 'next';
import AboutHero from "@/components/about/AboutHero";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Christian Cecoro - Digital Designer & Art Director with expertise in Brand Identity, UX/UI Design, and Visual Design.',
  openGraph: {
    title: 'About | Christian Cecoro',
    description: 'Learn more about Christian Cecoro - Digital Designer & Art Director with expertise in Brand Identity, UX/UI Design, and Visual Design.',
  },
};

export default function AboutPage() {
    return (
        <PageLayout>
            <main className="bg-black min-h-screen">
                <AboutHero />
            </main>
        </PageLayout>
    );
}
