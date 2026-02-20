"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const serviceSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    price: z.coerce.number().min(0, "El precio no puede ser negativo"),
    duration: z.coerce.number().min(1, "La duración debe ser mayor a 0"),
    imageUrl: z.string().optional(),
});

export async function getServices() {
    return await prisma.service.findMany({
        orderBy: { name: 'asc' }
    });
}

async function uploadImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `services/${fileName}`;

    const { data, error } = await supabase.storage
        .from('images') // Asegúrate de tener un bucket llamado 'images' en Supabase como público
        .upload(filePath, file);

    if (error) {
        console.error("Error uploading image:", error);
        return null;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    return publicUrl;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createService(prevState: any, formData: FormData) {
    try {
        const file = formData.get("imageFile") as File;
        let imageUrl = "";

        if (file && file.size > 0) {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) imageUrl = uploadedUrl;
        }

        const valid = serviceSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            duration: formData.get("duration"),
        });

        await prisma.service.create({
            data: {
                ...valid,
                imageUrl: imageUrl || "/placeholder-service.jpg"
            },
        });

        revalidatePath("/admin/servicios");
        revalidatePath("/servicios");
        return { message: "Servicio creado correctamente", success: true };
    } catch (error) {
        console.error(error);
        return { message: "Error al crear servicio" };
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateService(id: number, prevState: any, formData: FormData) {
    try {
        const file = formData.get("imageFile") as File;
        let imageUrl = formData.get("currentImageUrl") as string;

        if (file && file.size > 0) {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) imageUrl = uploadedUrl;
        }

        const valid = serviceSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            duration: formData.get("duration"),
        });

        await prisma.service.update({
            where: { id },
            data: {
                ...valid,
                imageUrl
            },
        });

        revalidatePath("/admin/servicios");
        revalidatePath("/servicios");
        return { message: "Servicio actualizado correctamente", success: true };
    } catch (error) {
        console.error(error);
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
