
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/password'

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding started...");

    // 1. Create Admin User
    const password = await hashPassword("Anarquia182");
    console.log("Admin password hash generated.");

    const admin = await prisma.user.upsert({
        where: { username: 'Admin182' },
        update: { password: password },
        create: {
            username: 'Admin182',
            name: 'Admin Patitas',
            password: password,
            role: 'admin',
        },
    })

    // 2. Create Staff User
    const staffPassword = await hashPassword("PatitasStaff2024");
    console.log("Staff password hash generated.");

    const staff = await prisma.user.upsert({
        where: { username: 'Staff' },
        update: { password: staffPassword },
        create: {
            username: 'Staff',
            name: 'Dr. Veterinario',
            password: staffPassword,
            role: 'staff',
        },
    })

    console.log("Seeding completed.", { admin, staff })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
