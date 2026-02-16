"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { sendConfirmationEmail } from "@/lib/email";

// Initialize MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

// 1. Zod Schema (Updated to include price if needed, or fetched from DB)
const bookingSchema = z.object({
    clientName: z.string().min(2, "El nombre es obligatorio"),
    clientPhone: z.string().min(9, "Teléfono inválido"),
    clientEmail: z.string().email("Email inválido"),
    petName: z.string().min(2, "El nombre de la mascota es obligatorio"),
    serviceId: z.coerce.number().int().positive(),
    date: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBooking(prevState: any, formData: FormData) {
    // Validate Input
    const rawData = {
        clientName: formData.get("clientName"),
        clientPhone: formData.get("clientPhone"),
        clientEmail: formData.get("clientEmail"),
        petName: formData.get("petName"),
        serviceId: formData.get("serviceId"),
        date: formData.get("date"),
    };

    const validation = bookingSchema.safeParse(rawData);

    if (!validation.success) {
        return {
            success: false,
            error: validation.error.flatten().fieldErrors,
        };
    }

    const { data } = validation;
    const bookingDate = new Date(data.date);

    try {
        // Fetch Service Price
        const service = await prisma.service.findUnique({
            where: { id: parseInt(data.serviceId.toString()) }
        });
        const price = service?.price || 50.00;

        // 1. Create Booking in DB (Pending)
        const newBooking = await prisma.booking.create({
            data: {
                clientName: data.clientName,
                clientPhone: data.clientPhone,
                clientEmail: data.clientEmail,
                petName: data.petName,
                serviceId: data.serviceId,
                date: bookingDate,
                status: "pending",
                paymentStatus: "pending",
                totalAmount: price, // Save the amount!
            },
            include: { service: true }
        });

        // 2. Create MercadoPago Preference
        const preference = new Preference(client);

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://veterinaria-patitas-v2.vercel.app';

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: String(data.serviceId),
                        title: newBooking.service?.name || "Servicio Veterinario",
                        quantity: 1,
                        unit_price: Number(price.toFixed(2)),
                        currency_id: 'PEN',
                    }
                ],
                payer: {
                    email: data.clientEmail,
                    name: data.clientName,
                    phone: {
                        number: data.clientPhone
                    }
                },
                back_urls: {
                    success: `${appUrl}/reservas/confirmacion`,
                    failure: `${appUrl}/reservas/fallo`,
                    pending: `${appUrl}/reservas/pendiente`
                },
                external_reference: String(newBooking.id), // Link Payment to Booking ID
            }
        });

        revalidatePath("/admin/reservas");

        // 3. Return the Payment URL and Preference ID
        return {
            success: true,
            bookingId: newBooking.id,
            paymentUrl: result.init_point, // Fallback
            preferenceId: result.id, // For Wallet Brick
            amount: price, // For Payment Brick
            clientEmail: data.clientEmail, // For Payment Brick payer
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Payment Error:", error);
        return { success: false, error: error.message };
    }
}

export async function getBookedSlots(dateString: string) {
    if (!dateString) return [];

    // Create start and end of the day provided
    // dateString acts as YYYY-MM-DD
    const startOfDay = new Date(`${dateString}T00:00:00`);
    const endOfDay = new Date(`${dateString}T23:59:59`);

    try {
        const bookings = await prisma.booking.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                paymentStatus: "approved" // Only block slots if paid
            },
            select: { date: true }
        });

        // Return array of "HH:mm"
        return bookings.map(b => {
            const d = new Date(b.date);
            // Adjust to local time or keep UTC? Prisma usually handles UTC. 
            // Ideally we store UTC and front converts, or we operate in offsets.
            // For simplicity in this demo, we'll assume the server returns formatted strings.
            // But actually, new Date(b.date) might be UTC.
            // Let's format manually to ensure consistency:
            // We'll extract getHours and getMinutes.
            // Note: in a real app, timezones are critical. 
            // Assuming server and client are same timezone or using offsets.
            // Let's use toLocaleTimeString with Peru timezone if possible or just generic.
            const hours = d.getHours().toString().padStart(2, '0');
            const minutes = d.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        });
    } catch (e) {
        console.error("Error fetching slots", e);
        return [];
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function processPayment(paymentData: any) {
    const payment = new Payment(client);

    try {
        const { formData, external_reference } = paymentData;
        console.log("Full Payment Data:", JSON.stringify(paymentData, null, 2));

        if (!formData) {
            throw new Error("No se recibió información del formulario de pago (formData is missing)");
        }

        const { transaction_amount, token, description, installments, payment_method_id, issuer_id, payer } = formData;

        // Ensure transaction_amount is a valid number and greater than 0
        const amount = Number(Number(transaction_amount).toFixed(2));
        if (isNaN(amount) || amount <= 0) {
            console.error("Invalid amount detected:", transaction_amount);
            throw new Error(`Monto de transacción inválido: ${transaction_amount}`);
        }

        const response = await payment.create({
            body: {
                transaction_amount: amount,
                token,
                description: description || "Pago Servicio Veterinario",
                installments: Number(installments) || 1,
                payment_method_id,
                issuer_id,
                payer: {
                    email: payer.email,
                    identification: payer?.identification
                },
                external_reference: String(external_reference)
            }
        });

        if (response.status === 'approved' || response.status === 'in_process') {
            await prisma.booking.update({
                where: { id: parseInt(external_reference) },
                data: {
                    paymentStatus: response.status === 'approved' ? 'approved' : 'pending',
                    status: 'confirmed'
                }
            });

            // Send Confirmation Email
            try {
                // Fetch booking details for email
                const booking = await prisma.booking.findUnique({
                    where: { id: parseInt(external_reference) },
                    include: { service: true }
                });

                if (booking && booking.clientEmail) {
                    await sendConfirmationEmail(booking.clientEmail, {
                        clientName: booking.clientName || "Cliente",
                        petName: booking.petName || "Mascota",
                        serviceName: booking.service?.name || "Servicio Veterinario",
                        date: booking.date,
                        orderId: String(booking.id)
                    });
                }
            } catch (emailError) {
                console.error("Error sending email:", emailError);
                // Don't fail the payment if email fails, just log it
            }
        }

        return {
            success: true,
            status: response.status,
            status_detail: response.status_detail,
            id: response.id
        };

    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error("Error processing payment:", error);
        if (error.cause) console.error("Error Cause:", error.cause);
        if (error.message) console.error("Error Message:", error.message);
        return { success: false, error: "Error al procesar el pago" };
    }
}

export async function updateBookingNotes(id: number, notes: string) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { notes },
        });
        revalidatePath("/admin/reservas");
        return { success: true };
    } catch (error) {
        console.error("Error updating notes:", error);
        return { success: false, error: "Error al guardar la nota" };
    }
}
