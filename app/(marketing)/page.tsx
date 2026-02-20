import { Hero } from "@/components/landing/Hero";
import { ScrollVelocitySection } from "@/components/landing/ScrollVelocitySection";
import { StatsSection } from "@/components/landing/StatsSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { MapSection } from "@/components/landing/MapSection";
import { Footer } from "@/components/layout/Footer";

// Optimización: Cachear la página principal por 1 hora
export const revalidate = 3600;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <ScrollVelocitySection />
      <StatsSection />
      <Testimonials />
      <MapSection />
      <Footer />
    </main>
  );
}
