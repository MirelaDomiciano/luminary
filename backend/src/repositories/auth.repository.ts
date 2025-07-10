import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findUserByUsername = async (username: string) => {
  return prisma.user.findFirst({ where: { username } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findFirst({ where: { email } });
}; 