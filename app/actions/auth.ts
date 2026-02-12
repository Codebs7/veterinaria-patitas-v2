"use server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
    username: z.string().min(1, "El usuario es obligatorio"),
    password: z.string().min(1, "La contraseña es obligatoria"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(prevState: any, formData: FormData) {
    try {
        const result = loginSchema.safeParse(Object.fromEntries(formData));

        if (!result.success) {
            return { message: "Datos inválidos" };
        }

        const { username, password } = result.data;

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return { message: "Credenciales incorrectas" };
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
            return { message: "Credenciales incorrectas" };
        }

        // Create Session
        const token = await signToken({ userId: user.id, role: user.role });

        (await cookies()).set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Login Error:", error);
        return { message: "Error en el servidor" };
    }

    // Redirect to admin dashboard on success
    redirect("/admin");
}

export async function logoutAction() {
    (await cookies()).delete("session");
    redirect("/login");
}
