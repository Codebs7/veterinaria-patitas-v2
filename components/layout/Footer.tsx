"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    // Animation variants for children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <footer className="relative bg-teal-900 text-teal-100 overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

            <div className="container relative px-4 md:px-6 py-12 md:py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-4 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 font-bold text-2xl text-white">
                            <HeartPulse className="w-8 h-8 text-primary animate-pulse" />
                            <span>Patitas</span>
                        </div>
                        <p className="text-sm text-teal-200/80 max-w-xs mx-auto md:mx-0">
                            Cuidando a tus mascotas con el amor y profesionalismo que se merecen desde 2010.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Quick Links with Hover Effect */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-bold text-lg text-white mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Inicio</Link></li>
                            <li><Link href="/servicios" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Servicios</Link></li>
                            <li><Link href="/reservas" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Reservar Cita</Link></li>
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-bold text-lg text-white mb-4">Servicios</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            {["Consulta General", "Vacunación", "Cirugías", "Peluquería & Spa", "Hospedaje"].map((service) => (
                                <li key={service}>
                                    <Link href="/servicios" className="hover:text-primary hover:translate-x-1 inline-block transition-all cursor-pointer">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-bold text-lg text-white mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/legal/terminos" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Términos y Condiciones</Link></li>
                            <li><Link href="/legal/privacidad" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Política de Privacidad</Link></li>
                            <li><Link href="/libro-de-reclamaciones" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Libro de Reclamaciones</Link></li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 pt-8 border-t border-teal-800/50 pb-24 md:pb-8"
                >
                    <div className="flex flex-col items-center justify-center gap-6 text-center text-sm text-teal-400/60 transition-colors duration-500">
                        <div className="flex flex-col items-center gap-2">
                            <p className="flex items-center justify-center gap-1 group">
                                &copy; {new Date().getFullYear()} Veterinaria Patitas. Hecho con
                                <span className="inline-block animate-pulse text-red-500 group-hover:scale-125 transition-transform duration-300">❤️</span>
                                para las mascotas.
                            </p>
                            <p className="hover:text-white transition-colors duration-500 cursor-default font-medium">
                                Creado por Codebs
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
