import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";
import { ICreatePurchaseRequest, IFindPurchaseRequests, IUpdatePurchaseRequest } from "../interfaces/purchase-request.interface";

export async function createPurchaseRequest(data: ICreatePurchaseRequest) {
  return prisma.purchaseRequestOrder.create({
    data
  });
}

export async function updatePurchaseRequest({id, ...data}: IUpdatePurchaseRequest) {
  return prisma.purchaseRequestOrder.update({
    where: {
      id
    },
    data
  })
}

export async function findPurchaseRequests({skip, take, search, type, paymentType}: IFindPurchaseRequests) {
  let whereInput: Prisma.PurchaseRequestOrderWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        { suppliersName: { contains: search, mode: "insensitive" } },
        { serialNumber: { contains: search, mode: "insensitive" } },
      ],
    }
  }

  if (type) {
    whereInput = {
      ...whereInput,
      type,
    }
  }

  if (paymentType) {
    whereInput = {
      ...whereInput,
      paymentType,
    }
  }

  const findPurchaseRequests =  prisma.purchaseRequestOrder.findMany({
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
          purchaseOrderItems: true
        }
      }
    },
    skip:skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countPurchaseRequests = prisma.purchaseRequestOrder.count({
    where: {
      ...whereInput
    },
  });

  const [purchaseRequests, total] =  await prisma.$transaction([
    findPurchaseRequests, 
    countPurchaseRequests
  ]);

  return {purchaseRequests, total};
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
