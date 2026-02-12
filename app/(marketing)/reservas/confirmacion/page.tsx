"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-100"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                        className="bg-green-100 p-4 rounded-full"
                    >
                        <CheckCircle className="w-16 h-16 text-green-600" />
                    </motion.div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h1>
                <p className="text-gray-600 mb-8">
                    Tu cita ha sido agendada con éxito. Hemos enviado todos los detalles de la reserva a tu correo electrónico.
                </p>

                <div className="flex flex-col gap-3">
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg">
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5" />
                            Volver al Inicio
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full h-12 text-lg">
                        <Link href="/servicios">
                            <Calendar className="mr-2 h-5 w-5" />
                            Reservar otra cita
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
