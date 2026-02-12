
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Searching for 'Toiku' booking...");

    const booking = await prisma.booking.findFirst({
        where: {
            petName: "Toiku"
        }
    });

    if (!booking) {
        console.log("Booking for 'Toiku' not found.");
        return;
    }

    console.log(`Found booking ID: ${booking.id} for ${booking.petName} (Client: ${booking.clientName})`);

    await prisma.booking.delete({
        where: {
            id: booking.id
        }
    });

    console.log("Booking deleted successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
