import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const staffPassword = await hashPassword("PatitasStaff2024");
        const staff = await prisma.user.upsert({
            where: { username: 'Staff' },
            update: { password: staffPassword },
            create: {
                username: 'Staff',
                name: 'Dr. Veterinario',
                password: staffPassword,
                role: 'staff',
            },
        });

        return NextResponse.json({ success: true, message: `Created staff user: ${staff.username}` });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message });
    }
}
