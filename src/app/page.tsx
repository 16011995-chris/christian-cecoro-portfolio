import Hero from "@/components/home/Hero";
import Preloader from "@/components/ui/Preloader";
import PageLayout from "@/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <main className="h-screen w-screen overflow-hidden bg-black relative">
        {/* Preloader - Only on Home (Once per Session) */}
        <Preloader />

        <Hero />
      </main>
    </PageLayout>
  );
}
