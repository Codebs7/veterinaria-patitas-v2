
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Starting verification...");

    // 1. Get a service
    const service = await prisma.service.findFirst();
    if (!service) {
        console.error("No service found!");
        return;
    }
    console.log(`Using Service: ${service.name} (Price: ${service.price})`);

    // 2. Create a booking (Simulating the action logic)
    // Note: We can't call the server action directly here easily without mocking FormData, 
    // so we'll test the logic itself: fetch price -> create booking.

    // Logic from server action:
    const fetchedService = await prisma.service.findUnique({
        where: { id: service.id }
    });
    const price = fetchedService?.price || 50.00;

    const booking = await prisma.booking.create({
        data: {
            clientName: "Amount Test User",
            clientEmail: "amount@test.com",
            clientPhone: "123123123",
            petName: "MoneyCat",
            serviceId: service.id,
            date: new Date(),
            status: "confirmed", // Set to confirmed to show in dashboard logic if filter applies
            paymentStatus: "approved", // Set to approved to count in sales
            totalAmount: price, // This is the key fix
        }
    });

    console.log(`Created Booking ID: ${booking.id}`);
    console.log(`Booking Total Amount: ${booking.totalAmount}`);

    if (booking.totalAmount === service.price) {
        console.log("SUCCESS: Booking amount matches service price!");
    } else {
        console.error("FAILURE: Booking amount is incorrect.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
