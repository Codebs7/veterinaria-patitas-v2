"use client";

import Link from "next/link";
import { PawPrint, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Resultados", href: "/#stats" }, // Linking to stats/services area
        { name: "Testimonios", href: "/#testimonials" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                        <PawPrint className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Patitas
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Button asChild className="rounded-full px-6">
                        <Link href="/#map">Contacto</Link>
                    </Button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button asChild className="w-full rounded-full mt-4">
                                <Link href="/reservas">Reservar Cita</Link>
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
