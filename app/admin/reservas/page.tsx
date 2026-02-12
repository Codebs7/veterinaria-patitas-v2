import { prisma } from "@/lib/prisma";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { BookingNotes } from "@/components/admin/BookingNotes";

export const dynamic = 'force-dynamic';

async function getBookings() {
    return await prisma.booking.findMany({
        include: {
            service: true,
        },
        orderBy: {
            date: "desc",
        },
    });
}

export default async function AdminBookingsPage() {
    const bookings = await getBookings();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Reservas</h1>
            </div>

            <div className="rounded-md border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Mascota</TableHead>
                            <TableHead>Servicio</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Pago</TableHead>
                            <TableHead className="text-right">Notas</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No hay reservas registradas.
                                </TableCell>
                            </TableRow>
                        ) : (
                            bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <div className="font-medium">{booking.clientName}</div>
                                        <div className="text-sm text-muted-foreground">{booking.clientEmail}</div>
                                    </TableCell>
                                    <TableCell>{booking.petName}</TableCell>
                                    <TableCell>{booking.service?.name || "Eliminado"}</TableCell>
                                    <TableCell>
                                        {format(new Date(booking.date), "PPP p", { locale: es })}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                                            {booking.status === "confirmed" ? "Confirmada" : "Pendiente"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={booking.paymentStatus === "completed" ? "outline" : "destructive"}>
                                            {booking.paymentStatus === "completed" ? "Pagado" : "Pendiente"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <BookingNotes
                                            bookingId={booking.id}
                                            initialNotes={booking.notes}
                                            clientName={booking.clientName}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
