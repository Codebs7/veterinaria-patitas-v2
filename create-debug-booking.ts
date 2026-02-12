
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const service = await prisma.service.findFirst();
    if (!service) {
        console.log("No service found to link booking");
        return;
    }

    const booking = await prisma.booking.create({
        data: {
            clientName: "Debug User",
            clientEmail: "debug@example.com",
            clientPhone: "999888777",
            petName: "Debug Pet",
            serviceId: service.id,
            date: new Date(),
            status: "confirmed",
            paymentStatus: "completed",
            notes: null
        }
    });

    console.log("Created booking:", booking.id);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
