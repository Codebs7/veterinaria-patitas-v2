
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";

// We will need a delete form component to handle the action properly
import { DeleteServiceButton } from "@/components/admin/DeleteServiceButton";

async function getServices() {
    return await prisma.service.findMany({
        orderBy: { name: 'asc' }
    });
}

import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
    const services = await getServices();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await getSession();
    const isReadOnly = session?.role === "staff";

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">
                    Servicios
                    {isReadOnly && <span className="ml-3 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">(Solo Lectura)</span>}
                </h1>
                {!isReadOnly && (
                    <Link
                        href="/admin/servicios/new"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Servicio
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Descripción</th>
                            <th className="px-6 py-4">Precio</th>
                            <th className="px-6 py-4">Duración</th>
                            {!isReadOnly && <th className="px-6 py-4 text-right">Acciones</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-800">{service.name}</td>
                                <td className="px-6 py-4 max-w-xs truncate">{service.description}</td>
                                <td className="px-6 py-4 font-medium">{formatCurrency(service.price || 0)}</td>
                                <td className="px-6 py-4">{service.duration} min</td>
                                {!isReadOnly && (
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <Link
                                            href={`/admin/servicios/${service.id}`}
                                            className="text-slate-400 hover:text-blue-600 p-1"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <DeleteServiceButton id={service.id} />
                                    </td>
                                )}
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                    No hay servicios registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
