import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";
import { ICreateSalesAgreement, IFindSalesAgreements, IUpdateSalesAgreement } from "../interfaces/sales-agreement.interface";

export async function createSalesAgreement(data: ICreateSalesAgreement) {
  return prisma.salesAgreement.create({data});
}

export async function updateSalesAgreement({id, ...data}: IUpdateSalesAgreement) {
  return prisma.salesAgreement.update({
    where: {
      id
    },
    data
  })
}

export async function findSalesAgreements({skip, take, search, typeOfClient}: IFindSalesAgreements) {
  let whereInput: Prisma.SalesAgreementWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        { clientName: { contains: search, mode: "insensitive" } },
        { serialNumber: { contains: search, mode: "insensitive" } },
      ],
    }
  }

  if (typeOfClient) {
    whereInput = {
      ...whereInput,
      typeOfClient,
    }
  }

  const findSalesAgreements =  prisma.salesAgreement.findMany({
    where: {
      ...whereInput,
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
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countSalesAgreements = prisma.salesAgreement.count({
    where: {
      ...whereInput
    },
  });

  const [salesAgreements, total] =  await prisma.$transaction([
    findSalesAgreements, 
    countSalesAgreements
  ]);

  return {salesAgreements, total};
}

export async function findSalesAgreementById(id: string) {
  return await prisma.salesAgreement.findUnique({
    where: {id},
    include: {
      creator: {
        select: {
          id: true,
          avatar: true,
          firstName: true,
          lastName: true,
          email: true,
          userType: true,
        }
      },
      purchaseOrder: true,
      transaction: true,
      salesAgreementItems: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      _count: {
        select: {
          salesAgreementItems: true
        }
      }
    }
  });
}

export async function deleteSalesAgreementById(id: string) {
  return await prisma.salesAgreement.delete({
    where: {
      id
    }
  });
}
