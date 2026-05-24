import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

let prismaInstance: PrismaClient | null = null;

if (typeof window === 'undefined') {
  const connectionString = process.env.DATABASE_URL;
  
  // Only initialize the real Prisma client if DATABASE_URL is provided 
  // and is not the default unmigrated template localhost connection string.
  const isValidConnection = connectionString && 
                            !connectionString.includes('localhost:51213') &&
                            !connectionString.includes('prisma+postgres://');

  if (isValidConnection) {
    try {
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      prismaInstance = new PrismaClient({ adapter });
      console.log("Prisma Client successfully initialized with pg driver adapter.");
    } catch (error) {
      console.error("Failed to initialize Prisma Client with PG Adapter:", error);
    }
  } else {
    console.warn("DATABASE_URL is missing or using unconfigured local template. Running in Mock Fallback Mode.");
  }
}

export const prisma = prismaInstance;
export type SafePrismaClient = PrismaClient | null;
