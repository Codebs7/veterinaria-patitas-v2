
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function check() {
    const users = await prisma.user.findMany();
    console.log('--- USERS IN DB ---');
    users.forEach(u => {
        console.log(`ID: ${u.id} | Username: "${u.username}" | Role: ${u.role}`);
    });
}

check().then(() => prisma.$disconnect());
