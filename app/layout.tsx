
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s | Patitas Veterinarias",
    default: "Patitas - Clínica Veterinaria de Confianza",
  },
  description: "Servicios veterinarios integrales: consultas, baños, vacunación y cirugía. Cuidamos a tus mascotas con los mejores profesionales.",
  keywords: ["veterinaria", "mascotas", "perros", "gatos", "clinica veterinaria", "vacunacion", "baño mascota"],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://veterinariapatitas.com",
    siteName: "Patitas Veterinarias",
    images: [
      {
        url: "/og-image.jpg", // We need to ensure this exists or use a placeholder
        width: 1200,
        height: 630,
        alt: "Patitas Clínica Veterinaria",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(inter.variable, "antialiased font-sans overflow-x-hidden")}>
        {children}
      </body>
    </html>
  );
}
