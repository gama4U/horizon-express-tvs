import prisma from "../../prisma/db";

interface ICreateTransaction {
  leadId: string;
  salesAgreementId: string;
}
export async function createTransaction({leadId, salesAgreementId}: ICreateTransaction) {
  return await prisma.transaction.create({
    data: {
      leadId,
      salesAgreementId
    } 
  })
}
