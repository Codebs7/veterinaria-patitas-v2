
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
    {
        name: "Consulta General",
        description: "Evaluación completa de la salud de tu mascota por nuestros veterinarios expertos.",
        price: 50.00,
        duration: 30,
        imageUrl: "https://images.unsplash.com/photo-1623366302587-bca291d2fe5f?q=80&w=2574&auto=format&fit=crop"
    },
    {
        name: "Baño Básico",
        description: "Baño relajante con shampoo hipoalergénico, secado y cepillado.",
        price: 35.00,
        duration: 45,
        imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f43ad997?q=80&w=2669&auto=format&fit=crop"
    },
    {
        name: "Baño Medicado",
        description: "Tratamiento especial para problemas de piel con productos dermatológicos.",
        price: 55.00,
        duration: 60,
        imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop"
    },
    {
        name: "Vacunación",
        description: "Aplicación de vacunas esenciales para prevenir enfermedades comunes.",
        price: 45.00,
        duration: 15,
        imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Desparasitación",
        description: "Control interno y externo de parásitos para mantener a tu mascota protegida.",
        price: 25.00,
        duration: 15,
        imageUrl: "https://images.unsplash.com/photo-1628009368331-48c8c63a6a66?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Corte de Uñas",
        description: "Corte profesional de uñas para evitar molestias y problemas de postura.",
        price: 15.00,
        duration: 15,
        imageUrl: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Limpieza Dental",
        description: "Profilaxis dental para eliminar sarro y prevenir enfermedades bucales.",
        price: 120.00,
        duration: 60,
        imageUrl: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Hospedaje (Por Día)",
        description: "Cuidado amoroso y seguro durante tu ausencia, con paseos y juegos incluidos.",
        price: 40.00,
        duration: 1440,
        imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2670&auto=format&fit=crop"
    }
];

async function main() {
    console.log("Seeding services...");

    for (const service of services) {
        // Check if exists by name to update or create
        const existing = await prisma.service.findFirst({
            where: { name: service.name }
        });

        if (existing) {
            await prisma.service.update({
                where: { id: existing.id },
                data: service
            });
            console.log(`Updated: ${service.name}`);
        } else {
            await prisma.service.create({
                data: service
            });
            console.log(`Created: ${service.name}`);
        }
    }

    console.log("Services seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
