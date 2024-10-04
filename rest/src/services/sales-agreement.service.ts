import prisma from "../../prisma/db";
import { ICreateSalesAgreement, IFindSalesAgreements } from "../interfaces/sales-agreement.interface";

export async function createSalesAgreement(data: ICreateSalesAgreement) {
  return prisma.salesAgreement.create({data});
}

export async function findSalesAgreements({skip, take, search}: IFindSalesAgreements) {
  console.log(">>", search)
  let searchFilter = {};

  if (search) {
    searchFilter = {
      OR: [
        { salesAgreementNumber: { contains: search, mode: "insensitive" } },
        { suppliersPoNumber: { contains: search, mode: "insensitive" } },
      ],
    }
  }

  const findSalesAgreements =  prisma.salesAgreement.findMany({
    where: {
      ...searchFilter
    },
    skip:skip ?? 0,
    take: take ?? 10
  });

  const countSalesAgreements = prisma.salesAgreement.count({
    where: {
      ...searchFilter
    },
  });

  const [salesAgreements, total] =  await prisma.$transaction([findSalesAgreements, countSalesAgreements]);

  return {salesAgreements, total};
}
