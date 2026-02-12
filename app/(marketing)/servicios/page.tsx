import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import NextImage from "next/image";
import { ArrowRight, Clock } from "lucide-react";

async function getServices() {
    const services = await prisma.service.findMany({
        orderBy: {
            price: "asc",
        },
    });
    return services;
}

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="container py-24">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Nuestros Servicios
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    Cuidado profesional y especializado para que tu mascota viva feliz y
                    saludable.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Card key={service.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
                        {service.imageUrl && (
                            <div className="aspect-video w-full overflow-hidden relative">
                                <NextImage
                                    src={service.imageUrl}
                                    alt={service.name}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-2">
                                <Clock className="w-4 h-4" />
                                {service.duration} minutos
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {service.description}
                            </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between border-t p-6 bg-secondary/20">
                            <span className="text-lg font-bold text-primary">
                                S/ {service.price?.toFixed(2)}
                            </span>
                            <Link
                                href={`/reservas?service=${service.id}`}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                            >
                                Reservar
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
