import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";
import { ICreateSalesAgreement, IFindSalesAgreements } from "../interfaces/sales-agreement.interface";

export async function createSalesAgreement(data: ICreateSalesAgreement) {
  return prisma.salesAgreement.create({data});
}

export async function findSalesAgreements({skip, take, search}: IFindSalesAgreements) {
  let searchFilter: Prisma.SalesAgreementWhereInput = {};

  if (search) {
    searchFilter = {
      OR: [
        { clientName: { contains: search, mode: "insensitive" } },
        { serialNumber: { contains: search, mode: "insensitive" } },
      ],
    }
  }

  const findSalesAgreements =  prisma.salesAgreement.findMany({
    where: {
      ...searchFilter,
    },
    include: {
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          userType: true
        }
      },
      _count: {
        select:  {
          salesAgreementItems: true
        }
      }
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
