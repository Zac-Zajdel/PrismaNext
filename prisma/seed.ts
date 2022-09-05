import { prisma } from '../lib/prisma'

async function main() {
  // Seed your models with data
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
