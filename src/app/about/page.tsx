import AboutHero from "@/components/about/AboutHero";
import PageLayout from "@/components/layout/PageLayout";

export default function AboutPage() {
    return (
        <PageLayout>
            <main className="bg-black min-h-screen">
                <AboutHero />
            </main>
        </PageLayout>
    );
}
