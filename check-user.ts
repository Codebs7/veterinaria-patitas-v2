
import { PrismaClient } from '@prisma/client'
import { verifyPassword } from './lib/password'

const prisma = new PrismaClient()

async function main() {
    const username = 'Admin182';
    const password = 'Anarquia182';

    const user = await prisma.user.findUnique({
        where: { username },
    })

    console.log('User found:', user ? 'YES' : 'NO');
    if (user) {
        console.log('Role:', user.role);
        const isValid = await verifyPassword(password, user.password);
        console.log('Password valid:', isValid);
    }
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
