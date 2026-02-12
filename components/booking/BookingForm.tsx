"use client";

import { createBooking, getBookedSlots, processPayment } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// Initialize MercadoPago with PUBLIC KEY
initMercadoPago('TEST-7c1401ed-0935-418c-946b-872363a111ef', { locale: 'es-PE' });

export function BookingForm({ serviceId, serviceName }: { serviceId: number, serviceName: string }) {
    const [state, formAction, isPending] = useActionState(createBooking, null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const timeSlots = [];
    for (let h = 9; h < 18; h++) {
        timeSlots.push(`${h.toString().padStart(2, '0')}:00`);
        timeSlots.push(`${h.toString().padStart(2, '0')}:30`);
    }

    useEffect(() => {
        let isMounted = true;

        if (selectedDate) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoadingSlots(true);
            setSelectedTime("");

            getBookedSlots(selectedDate)
                .then(slots => {
                    if (isMounted) setBookedSlots(slots);
                })
                .catch(err => console.error(err))
                .finally(() => {
                    if (isMounted) setLoadingSlots(false);
                });
        }

        return () => {
            isMounted = false;
        };
    }, [selectedDate]);

    const finalDate = (selectedDate && selectedTime)
        ? new Date(`${selectedDate}T${selectedTime}:00`).toISOString()
        : "";

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
        >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-teal-400 to-green-300" />

            <div className="text-center pb-8 border-b border-gray-100 mb-8">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Reserva tu Cita: <span className="text-primary">{serviceName}</span>
                </h2>
                <p className="text-gray-500 mt-2">Completa el formulario para asegurar el cuidado de tu mascota.</p>
            </div>

            {state?.preferenceId ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center space-y-6 w-full"
                >
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                            💳
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Elige cómo pagar</h3>
                        <p className="text-gray-500">Tarjetas o Yape, todo aquí mismo.</p>
                    </div>

                    <div className="w-full max-w-2xl bg-gray-50 p-4 rounded-xl">
                        <Payment
                            initialization={{
                                amount: state.amount,
                                payer: {
                                    email: state.clientEmail || '',
                                }
                            }}
                            customization={{
                                paymentMethods: {
                                    ticket: "all",
                                    bankTransfer: "all",
                                    creditCard: "all",
                                    debitCard: "all",
                                    mercadoPago: "all",
                                },
                            }}
                            onSubmit={async (param) => {
                                console.log("Payment Data:", param);
                                if (state?.bookingId) {
                                    const result = await processPayment({ ...param, external_reference: String(state.bookingId) });
                                    if (result.success) {
                                        window.location.href = "/reservas/confirmacion?status=approved";
                                    } else {
                                        console.error("Payment Error:", result);
                                        // You might want to set an error state here to show in the UI
                                        alert("Error al procesar el pago. Por favor intenta de nuevo.");
                                    }
                                }
                            }}
                        />
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm text-gray-400 hover:text-gray-600 underline"
                    >
                        Cancelar y volver
                    </button>
                </motion.div>
            ) : (
                <form action={formAction} className="space-y-8">
                    <input type="hidden" name="serviceId" value={serviceId} />
                    <input type="hidden" name="date" value={finalDate} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Personal Data */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-700 border-l-4 border-primary pl-3">Datos Personales</h3>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="clientName" className="text-gray-600">Tu Nombre</Label>
                                    <Input id="clientName" name="clientName" required placeholder="Ej: Juan Pérez" className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="clientPhone" className="text-gray-600">Teléfono</Label>
                                    <Input id="clientPhone" name="clientPhone" required placeholder="Ej: +51 999 999 999" className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="clientEmail" className="text-gray-600">Email</Label>
                                    <Input id="clientEmail" name="clientEmail" type="email" required placeholder="Ej: juan@gmail.com" className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="petName" className="text-gray-600">Nombre de Mascota</Label>
                                    <Input id="petName" name="petName" required placeholder="Ej: Firulais" className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Date & Time */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-700 border-l-4 border-secondary pl-3">Fecha y Hora</h3>

                            <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 space-y-6">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-gray-700 font-medium">
                                        <CalendarIcon className="w-4 h-4 text-primary" />
                                        Selecciona el Día
                                    </Label>
                                    <Input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="h-12 bg-white border-gray-200 shadow-sm font-medium text-gray-700 cursor-pointer hover:border-primary transition-colors"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2 text-gray-700 font-medium">
                                        <Clock className="w-4 h-4 text-primary" />
                                        Horarios Disponibles
                                    </Label>

                                    {!selectedDate ? (
                                        <div className="h-[260px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-200 rounded-xl text-center p-6">
                                            <span className="text-4xl opacity-20 mb-2">📅</span>
                                            <p className="text-sm text-gray-400 font-medium">Elige una fecha arriba para ver los horarios.</p>
                                        </div>
                                    ) : loadingSlots ? (
                                        <div className="h-[260px] flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-inner">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-sm text-primary font-medium">Cargando horarios...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="p-1 pr-2 max-h-[260px] overflow-y-auto custom-scrollbar"
                                            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}
                                        >
                                            {timeSlots.map(time => {
                                                const isBooked = bookedSlots.includes(time);
                                                const isSelected = selectedTime === time;

                                                return (
                                                    <button
                                                        key={time}
                                                        type="button"
                                                        disabled={isBooked}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`
                                                            relative h-10 w-full text-xs font-bold rounded-lg transition-all duration-200
                                                            flex items-center justify-center border
                                                            ${isBooked
                                                                ? "bg-gray-100 text-gray-300 border-transparent cursor-not-allowed"
                                                                : isSelected
                                                                    ? "bg-primary text-white border-primary shadow-lg transform scale-105 z-10"
                                                                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:bg-green-50"
                                                            }
                                                        `}
                                                    >
                                                        {isBooked ? (
                                                            <span className="line-through decoration-2 decoration-gray-300">{time}</span>
                                                        ) : (
                                                            time
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Messages */}
                    <AnimatePresence>
                        {state?.error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium text-center"
                            >
                                ❌ {typeof state.error === 'string' ? state.error : "Hubo un error en los datos. Revisa el formulario."}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-gray-100">
                        <Button
                            type="submit"
                            className="w-full text-lg font-bold py-7 rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            disabled={isPending || !selectedDate || !selectedTime || !!state?.preferenceId}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Generando pago...
                                </span>
                            ) : "Confirmar e Ir a Pagar"}
                        </Button>
                    </div>
                </form>
            )}
        </motion.div>
    );
}
