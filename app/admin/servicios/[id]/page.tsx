
import { ServiceForm } from "@/components/admin/ServiceForm";
import { prisma } from "@/lib/prisma";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await prisma.service.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!service) {
        return <div className="p-8 text-red-600">Servicio no encontrado</div>;
    }

    return (
        <div className="p-8">
            <ServiceForm service={service} />
        </div>
    );
}
