
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const settingsSchema = z.object({
    clinicName: z.string().min(1, "El nombre de la clínica es obligatorio"),
    clinicEmail: z.string().email("Email inválido"),
    clinicPhone: z.string().min(1, "El teléfono es obligatorio"),
    clinicAddress: z.string().min(1, "La dirección es obligatoria"),
});

export async function getSettings() {
    const settings = await prisma.setting.findMany();
    // Transform array of {key, value} to object
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
        settingsMap[s.key] = s.value || "";
    });

    return {
        clinicName: settingsMap.clinicName || "Patitas - Clínica Veterinaria",
        clinicEmail: settingsMap.clinicEmail || "contacto@patitas.com",
        clinicPhone: settingsMap.clinicPhone || "+51 999 888 777",
        clinicAddress: settingsMap.clinicAddress || "Av. Principal 123, Lima",
    };
}

export async function updateSettings(prevState: unknown, formData: FormData) {
    const rawData = {
        clinicName: formData.get("clinicName"),
        clinicEmail: formData.get("clinicEmail"),
        clinicPhone: formData.get("clinicPhone"),
        clinicAddress: formData.get("clinicAddress"),
    };

    const validation = settingsSchema.safeParse(rawData);

    if (!validation.success) {
        return {
            success: false,
            error: validation.error.flatten().fieldErrors,
        };
    }

    const { data } = validation;

    try {
        // Upsert each setting
        for (const [key, value] of Object.entries(data)) {
            await prisma.setting.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        }

        revalidatePath("/admin/configuracion");
        return { success: true };
    } catch (error) {
        console.error("Error updating settings:", error);
        return { success: false, error: "Error al guardar la configuración" };
    }
}
