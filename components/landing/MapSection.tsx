"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function MapSection() {
    return (
        <section id="map" className="py-0 flex flex-col lg:flex-row h-auto lg:h-[600px] scroll-mt-24">
            <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-gray-50 text-gray-800 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200">
                <FadeIn>
                    <h2 className="text-3xl font-bold mb-8 text-primary">Visítanos</h2>

                    <div className="space-y-6">
                        {/* Address Item */}
                        <motion.div
                            whileHover={{ scale: 1.02, x: 10 }}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-default group"
                        >
                            <div className="p-3 bg-white rounded-full shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <MapPin className="w-6 h-6 shrink-0" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Dirección</h3>
                                <p className="text-gray-600">Av. Las Patitas 123, Miraflores<br />Lima, Perú</p>
                            </div>
                        </motion.div>

                        {/* Hours Item */}
                        <motion.div
                            whileHover={{ scale: 1.02, x: 10 }}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-default group"
                        >
                            <div className="p-3 bg-white rounded-full shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <Clock className="w-6 h-6 shrink-0" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Horarios</h3>
                                <p className="text-gray-600">Lunes - Viernes: 8:00 AM - 8:00 PM</p>
                                <p className="text-gray-600">Sábados: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-600">Domingos: Solo Emergencias</p>
                            </div>
                        </motion.div>

                        {/* Contact Item */}
                        <motion.div
                            whileHover={{ scale: 1.02, x: 10 }}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-default group"
                        >
                            <div className="p-3 bg-white rounded-full shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <Phone className="w-6 h-6 shrink-0" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">Contacto</h3>
                                <p className="text-gray-600">+51 999 888 777</p>
                                <p className="text-gray-600">citas@patitas.com</p>
                            </div>
                        </motion.div>
                    </div>
                </FadeIn>
            </div>

            <div className="w-full lg:w-1/2 h-[400px] lg:h-full bg-slate-200 group overflow-hidden relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.665476336592!2d-77.03196292415668!3d-12.112108142347204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8146313fa7d%3A0xc30af2ee3df77cb8!2sParque%20Kennedy!5e0!3m2!1ses!2spe!4v1709669547844!5m2!1ses!2spe"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                ></iframe>
                {/* Overlay hint */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" />
            </div>
        </section>
    );
}
