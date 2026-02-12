"use client";

import { motion, useAnimation, useMotionValue } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";

function MarqueeRow({ images, direction = "left" }: { images: string[], direction?: "left" | "right" }) {
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            // Measure total width of content
            setWidth(containerRef.current.scrollWidth);
        }
    }, [images]);

    useEffect(() => {
        // Start infinite animation
        if (!isDragging && width > 0) {
            const duration = 40; // Seconds for full loop
            const distance = width / 2; // We duplicate content, so move half way then reset

            controls.start({
                x: direction === "left" ? -distance : 0,
                transition: {
                    duration: duration,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                    // If going right, we might need different logic, but let's stick to standard left-moving marquee for stability first
                    // or invert initial position.
                }
            });
        } else {
            controls.stop();
        }
    }, [isDragging, width, controls, direction]);

    return (
        <div className="overflow-hidden w-full relative">
            <motion.div
                ref={containerRef}
                className="flex gap-4 w-max cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ right: 0, left: -width / 2 }} // Limit drag roughly
                style={{ x }}
                animate={controls}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)} // Resume animation on release? Or stay stopped?
                // User requirement: "If user wants to use cursor... they can".
                // Usually implies pausing while interacting.
                whileTap={{ cursor: "grabbing" }}
            >
                {/* 3 sets of images for seamless loop loop */}
                {[...images, ...images, ...images].map((src, i) => (
                    <div
                        key={i}
                        className="min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-md relative pointer-events-none select-none"
                    >
                        <div className="relative w-full h-full">
                            <NextImage
                                src={src}
                                alt={`Pet ${i}`}
                                fill
                                className="object-cover"
                                sizes="300px"
                                draggable={false}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function ScrollVelocitySection() {
    const images = [
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=300&fit=crop",
    ];

    return (
        <section className="py-24 bg-primary/5 overflow-hidden">
            <div className="container px-4 md:px-6 mb-8 text-center">
                <h2 className="text-2xl font-bold text-primary mb-2">Pacientes Felices</h2>
                <p className="text-muted-foreground text-sm">Nuestros amigos peludos en acción 🐾</p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Row 1 */}
                <MarqueeRow images={images} direction="left" />

                {/* Row 2 - Pass reversed images for variety */}
                {/* Note: True reverse direction Marquee is tricky with drag constraints. 
             Ideally kept uniform or carefully recalibrated. 
             Simulating 'Reverse' by just placing content differently often safer for 'No Lag'.
             But let's try standardizing left-drag for consistency.
         */}
                <MarqueeRow images={[...images].reverse()} direction="left" />
            </div>
        </section>
    );
}
