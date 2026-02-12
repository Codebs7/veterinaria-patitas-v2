"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

// ... (keep existing code) but I need to be careful with replace chunks.
// I will do two chunks. One for import, one for usage.


export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center overflow-hidden bg-background pt-32 lg:pt-20">
      {/* Background Shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10"
      />

      <div className="container px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Content */}
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
              transition={{
                duration: 0.5,
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              className="bg-gradient-to-r from-primary/10 to-teal-400/10 border border-primary/20 px-6 py-2 rounded-full text-sm font-bold text-primary flex items-center justify-center gap-2 shadow-lg shadow-primary/5 hover:shadow-primary/20 transition-all cursor-default mx-auto"
            >
              <HeartPulse className="w-5 h-5 animate-pulse" />
              <span>Cuidado veterinario de primera clase</span>
            </motion.div>

            <motion.h1
              style={{ opacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-2xl"
            >
              Amor y ciencia para <br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400">
                tus mejores amigos
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg"
            >
              Servicios veterinarios integrales con tecnología de punta y un equipo
              apasionado por el bienestar de tu mascota.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                href="/reservas"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Reservar Cita
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-primary bg-transparent px-8 text-sm font-medium text-primary shadow-sm transition-transform hover:scale-105 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Servicios
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] lg:h-[600px] w-full flex justify-center lg:justify-end"
          >
            {/* Abstract blob behind image */}
            <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl transform scale-75 translate-y-10" />

            {/* Hero Image */}
            <motion.div
              className="relative w-full h-full max-w-[500px]"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1000&auto=format&fit=crop"
                alt="Golden Retriever Puppy"
                width={500}
                height={500}
                className="object-contain w-full h-full drop-shadow-2xl z-10 relative"
                style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
