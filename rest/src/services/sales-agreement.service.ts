import prisma from "../../prisma/db";
import { ICreateSalesAgreement } from "../interfaces/sales-agreement.interface";

export async function createSalesAgreement(data: ICreateSalesAgreement) {
  return prisma.salesAgreement.create({data});
}
