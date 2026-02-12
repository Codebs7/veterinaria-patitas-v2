"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { transporter, emailDefaults } from "@/lib/email";

// Zod Schema for Validation
const complaintSchema = z.object({
    clientName: z.string().min(2, "El nombre es obligatorio"),
    clientDni: z.string().min(8, "DNI inválido"),
    clientEmail: z.string().email("Email inválido"),
    clientPhone: z.string().min(9, "Teléfono inválido"),
    clientAddress: z.string().min(5, "La dirección es obligatoria"),
    goodType: z.enum(["Producto", "Servicio"]),
    goodDescription: z.string().min(5, "Descripción del bien requerida"),
    amountClaimed: z.coerce.number().optional(),
    type: z.enum(["Queja", "Reclamo"]),
    description: z.string().min(10, "Detalle del reclamo requerido"),
    consumerRequest: z.string().min(5, "Pedido del consumidor requerido"),
});

export type ComplaintState = {
    success: boolean;
    message?: string;
    ticketNumber?: string;
    error?: {
        clientName?: string[];
        clientDni?: string[];
        clientEmail?: string[];
        clientPhone?: string[];
        clientAddress?: string[];
        goodType?: string[];
        goodDescription?: string[];
        amountClaimed?: string[];
        type?: string[];
        description?: string[];
        consumerRequest?: string[];
    };
};

export async function createComplaint(prevState: ComplaintState, formData: FormData): Promise<ComplaintState> {
    // 1. Validate Fields
    const validation = complaintSchema.safeParse({
        clientName: formData.get("clientName"),
        clientDni: formData.get("clientDni"),
        clientEmail: formData.get("clientEmail"),
        clientPhone: formData.get("clientPhone"),
        clientAddress: formData.get("clientAddress"),
        goodType: formData.get("goodType"),
        goodDescription: formData.get("goodDescription"),
        amountClaimed: formData.get("amountClaimed"),
        type: formData.get("type"),
        description: formData.get("description"),
        consumerRequest: formData.get("consumerRequest"),
    });

    if (!validation.success) {
        return {
            success: false,
            error: validation.error.flatten().fieldErrors,
        };
    }

    const data = validation.data;

    try {
        // 2. Generate Ticket Number (REC-YYYY-XXXX)
        const count = await prisma.complaint.count();
        const year = new Date().getFullYear();
        const ticketNumber = `REC-${year}-${(count + 1).toString().padStart(4, "0")}`;

        // 3. Save to Database
        const complaint = await prisma.complaint.create({
            data: {
                ticketNumber,
                ...data,
            },
        });

        // 4. Send Email to Consumer (Constancy)
        await transporter.sendMail({
            from: emailDefaults.from,
            to: data.clientEmail,
            subject: `Hoja de Reclamación ${ticketNumber} - Patitas`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2E5C5A;">Constancia de Reclamación</h2>
          <p>Hola <strong>${data.clientName}</strong>,</p>
          <p>Hemos registrado tu Hoja de Reclamación con el código:</p>
          <h1 style="background: #F2C94C; padding: 10px; text-align: center; border-radius: 5px;">${ticketNumber}</h1>
          <p>Detalles:</p>
          <ul>
            <li><strong>Tipo:</strong> ${data.type}</li>
            <li><strong>Fecha:</strong> ${new Date().toLocaleString()}</li>
            <li><strong>Bien Contratado:</strong> ${data.goodType} - ${data.goodDescription}</li>
          </ul>
          <p>Nos pondremos en contacto contigo en un plazo máximo de 15 días hábiles.</p>
          <hr>
          <p style="font-size: 12px; color: #666;">Veterinaria Patitas - Atención al Cliente</p>
        </div>
      `,
        });

        // 5. Send Notification to Admin
        await transporter.sendMail({
            from: emailDefaults.from,
            to: "admin@patitas.com", // Replace with real admin email if available
            subject: `[ADMIN] Nuevo Reclamo: ${ticketNumber}`,
            html: `
        <h3>Nuevo Reclamo Registrado</h3>
        <p><strong>Cliente:</strong> ${data.clientName} (${data.clientDni})</p>
        <p><strong>Tipo:</strong> ${data.type}</p>
        <p><strong>Descripción:</strong> ${data.description}</p>
        <p><a href="http://localhost:3000/admin/reclamaciones/${complaint.id}">Ver en Admin</a></p>
      `,
        });

        return { success: true, ticketNumber };

    } catch (error) {
        console.error("Complaint Error:", error);
        return { success: false, message: "Error al procesar el reclamo. Intente nuevamente." };
    }
}
