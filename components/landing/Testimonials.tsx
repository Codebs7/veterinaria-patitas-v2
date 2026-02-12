"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "María González",
        pet: "Luna (Golden Retriever)",
        text: "La atención en Patitas es increíble. Luna siempre entra moviendo la cola y sale feliz. Los doctores son muy atentos y explican todo con paciencia.",
        rating: 5,
        initial: "M",
        color: "bg-blue-100 text-blue-600"
    },
    {
        name: "Carlos Ruiz",
        pet: "Simba (Gato Persa)",
        text: "Llevé a Simba para una cirugía dental y todo salió perfecto. Me mantuvieron informado todo el tiempo y la recuperación fue muy rápida.",
        rating: 5,
        initial: "C",
        color: "bg-purple-100 text-purple-600"
    },
    {
        name: "Ana Morales",
        pet: "Rocky (Bulldog)",
        text: "El servicio de peluquería es el mejor de la ciudad. Rocky queda guapísimo y huele delicioso por días. ¡Totalmente recomendado!",
        rating: 5,
        initial: "A",
        color: "bg-green-100 text-green-600"
    }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <FadeIn className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                        Historias reales de mascotas felices y dueños tranquilos.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <FadeIn key={i} delay={i * 0.1} className="h-full">
                            <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-xl md:text-2xl font-medium text-gray-800 italic relative z-10">
                                    &quot;{t.text}&quot;
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}>
                                        {t.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{t.name}</h4>
                                        <p className="text-sm text-muted-foreground">{t.pet}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
