import { Hero } from "@/components/landing/Hero";
import { ScrollVelocitySection } from "@/components/landing/ScrollVelocitySection";
import { StatsSection } from "@/components/landing/StatsSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { MapSection } from "@/components/landing/MapSection";
import { Footer } from "@/components/layout/Footer";

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
