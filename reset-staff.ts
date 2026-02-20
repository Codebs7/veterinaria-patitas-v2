
import { PrismaClient } from '@prisma/client'
import { hashPassword } from './lib/password'

const prisma = new PrismaClient()

async function resetStaff() {
    const newPass = await hashPassword("Staff123!");
    const user = await prisma.user.update({
        where: { username: 'Staff' },
        data: { password: newPass }
    });
    console.log('Password reset for user:', user.username);
}

resetStaff()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });
