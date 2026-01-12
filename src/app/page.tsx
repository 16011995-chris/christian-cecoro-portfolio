import Hero from "@/components/home/Hero";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Preloader - Only on Home (Once per Session) */}
      <Preloader />

      <Hero />
    </main>
  );
}
