
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import {
    DollarSign,
    Calendar,
    Clock
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

async function getDashboardData() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalSales = await prisma.booking.aggregate({
        _sum: {
            totalAmount: true,
        },
        where: {
            paymentStatus: "approved",
        },
    });

    const todaySales = await prisma.booking.aggregate({
        _sum: {
            totalAmount: true,
        },
        where: {
            paymentStatus: "approved",
            updatedAt: {
                gte: today,
            },
        },
    });

    const pendingBookings = await prisma.booking.count({
        where: {
            status: "pending",
        },
    });

    const recentBookings = await prisma.booking.findMany({
        take: 5,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            service: true,
        },
    });

    return {
        totalSales: totalSales._sum.totalAmount || 0,
        todaySales: todaySales._sum.totalAmount || 0,
        pendingBookings,
        recentBookings,
    };
}

}

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const data = await getDashboardData();

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center space-x-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Ventas Totales</p>
                        <p className="text-2xl font-bold text-slate-800">{formatCurrency(data.totalSales)}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Ingresos Hoy</p>
                        <p className="text-2xl font-bold text-slate-800">{formatCurrency(data.todaySales)}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center space-x-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Reservas Pendientes</p>
                        <p className="text-2xl font-bold text-slate-800">{data.pendingBookings}</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800">Actividad Reciente</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4">Mascota</th>
                                <th className="px-6 py-4">Servicio</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Monto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.recentBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">{booking.clientName}</td>
                                    <td className="px-6 py-4">{booking.petName}</td>
                                    <td className="px-6 py-4">{booking.service?.name}</td>
                                    <td className="px-6 py-4 capitalize">
                                        {format(new Date(booking.date), "dd MMM yyyy", { locale: es })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                            booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                            {booking.status === 'confirmed' ? 'Confirmado' :
                                                booking.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{formatCurrency(booking.totalAmount || 0)}</td>
                                </tr>
                            ))}
                            {data.recentBookings.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                        No hay reservas recientes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
