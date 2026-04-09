import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configure Prisma with Accelerate for connection pooling
const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
  
  // Use Accelerate extension if DATABASE_URL starts with prisma+postgres
  if (process.env.DATABASE_URL?.startsWith('prisma+postgres')) {
    return client.$extends(withAccelerate()) as unknown as PrismaClient
  }
  
  return client
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
