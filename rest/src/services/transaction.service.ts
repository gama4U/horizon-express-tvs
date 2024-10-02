import prisma from "../../prisma/db";

export async function createTransaction(userId: string) {
  return await prisma.transaction.create({
    data: {
      userId
    } 
  })
}
