"use client";

import { useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Users, Heart, CalendarClock, Activity } from "lucide-react";

function Counter({ value, label, icon: Icon, color, suffix = "", prefix = "" }: { value: number, label: string, icon: any, color: string, suffix?: string, prefix?: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { duration: 3000, bounce: 0 });
    const displayValue = useTransform(springValue, (current) => Math.round(current));

    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        const unsubscribe = displayValue.on("change", (latest) => {
            setCurrentValue(latest);
        });
        return () => unsubscribe();
    }, [displayValue]);

    return (
        <div ref={ref} className="flex flex-col items-center text-center p-6 bg-white dark:bg-card rounded-2xl shadow-md border hover:border-secondary transition-all hover:-translate-y-1">
            <div className={`p-4 rounded-full ${color} mb-4 text-white shadow-lg`}>
                <Icon className="w-8 h-8" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-2">
                {prefix}{currentValue.toLocaleString()}{suffix}
            </div>
            <p className="text-muted-foreground font-medium">{label}</p>
        </div>
    );
}

export function StatsSection() {
    const stats = [
        { value: 5000, label: "Mascotas Atendidas", icon: Heart, color: "bg-primary", prefix: "+" },
        { value: 4800, label: "Clientes Felices", icon: Users, color: "bg-secondary", prefix: "+" },
        { value: 15, label: "Experiencia", icon: CalendarClock, color: "bg-teal-600", suffix: " Años" },
        { value: 24, label: "Atención", icon: Activity, color: "bg-red-500", suffix: "/7" },
    ];

    return (
        <section id="stats" className="py-24 bg-muted relative z-20">
            <div className="container px-4 md:px-6">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                        Nuestros Resultados
                    </h2>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Compromiso real con la salud animal.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                            <Counter {...stat} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
