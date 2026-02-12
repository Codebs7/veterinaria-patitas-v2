"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const serviceSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    price: z.coerce.number().min(0, "El precio no puede ser negativo"),
    duration: z.coerce.number().min(1, "La duración debe ser mayor a 0"),
    imageUrl: z.string().url("URL de imagen inválida"),
});

export async function getServices() {
    return await prisma.service.findMany({
        orderBy: { name: 'asc' }
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createService(prevState: any, formData: FormData) {
    try {
        const valid = serviceSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            duration: formData.get("duration"),
            imageUrl: formData.get("imageUrl"),
        });

        await prisma.service.create({
            data: valid,
        });

        revalidatePath("/admin/servicios");
        revalidatePath("/servicios"); // Public page
        return { message: "Servicio creado correctamente", success: true };
    } catch {
        return { message: "Error al crear servicio" };
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateService(id: number, prevState: any, formData: FormData) {
    try {
        const valid = serviceSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            duration: formData.get("duration"),
            imageUrl: formData.get("imageUrl"),
        });

        await prisma.service.update({
            where: { id },
            data: valid,
        });

        revalidatePath("/admin/servicios");
        revalidatePath("/servicios");
        return { message: "Servicio actualizado correctamente", success: true };
    } catch {
        return { message: "Error al actualizar el servicio" };
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteService(id: number) {
    try {
        await prisma.service.delete({
            where: { id }
        });
        revalidatePath("/admin/servicios");
        revalidatePath("/servicios");
        return { success: true };
    } catch {
        return { message: "Error al eliminar" };
    }
}
