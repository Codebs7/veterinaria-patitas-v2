import { prisma } from "@/lib/prisma";
import { BookingForm } from "@/components/booking/BookingForm";
import { redirect } from "next/navigation";

// Next.js 15+ compatible props type
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BookingPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams;
    const serviceId = searchParams.service ? Number(searchParams.service) : null;

    if (!serviceId) {
        redirect("/servicios");
    }

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
    });

    if (!service) {
        return (
            <div className="container py-24 text-center">
                <h1 className="text-2xl font-bold text-red-500">Servicio no encontrado</h1>
                <p className="mt-4">El servicio que intentas reservar no existe.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-32 pb-24 bg-gray-50/50">
            <div className="container max-w-2xl px-4">
                <div className="mb-8 text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
                        Reserva tu Cita
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Estás a un paso de darle el mejor cuidado a tu mascota.
                    </p>
                </div>

                <BookingForm serviceId={service.id} serviceName={service.name} />
            </div>
        </div>
    );
}
