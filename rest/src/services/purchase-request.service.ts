import { Prisma } from "@prisma/client";
import moment from 'moment';
import prisma from "../utils/db.utils";
import { ICreatePurchaseRequest, IFindPurchaseRequests, IUpdatePurchaseRequest, IUpdatePurchaseRequestApprover } from "../interfaces/purchase-request.interface";

export async function createPurchaseRequest(data: ICreatePurchaseRequest) {
  return prisma.purchaseRequestOrder.create({
    data
  });
}

export async function updatePurchaseRequest({ id, ...data }: IUpdatePurchaseRequest) {
  return prisma.purchaseRequestOrder.update({
    where: {
      id
    },
    data
  })
}

export async function findPurchaseRequests({ skip, take, search, type, paymentType }: IFindPurchaseRequests) {
  let whereInput: Prisma.PurchaseRequestOrderWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        {
          supplier: {
            name: { contains: search, mode: "insensitive" },
            address: { contains: search, mode: "insensitive" },
            contact: { contains: search, mode: "insensitive" },
          }
        },
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

  const findPurchaseRequests = prisma.purchaseRequestOrder.findMany({
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
        select: {
          purchaseOrderItems: true
        }
      }
    },
    skip: skip ?? 0,
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

  const [purchaseRequests, total] = await prisma.$transaction([
    findPurchaseRequests,
    countPurchaseRequests
  ]);

  return { purchaseRequests, total };
}

export async function findPurchaseRequestById(id: string) {
  return await prisma.purchaseRequestOrder.findUnique({
    where: { id },
    include: {
      creator: {
        select: {
          id: true,
          avatar: true,
          firstName: true,
          lastName: true,
          email: true,
          userType: true,
          signature: true
        }
      },
      salesAgreement: true,
      transaction: true,
      purchaseOrderItems: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      approver: {
        select: {
          id: true,
          avatar: true,
          firstName: true,
          lastName: true,
          email: true,
          userType: true,
          signature: true
        }
      },
      _count: {
        select: {
          purchaseOrderItems: true
        }
      }
    }
  });
}

export async function deletePurchaseRequestById(id: string) {
  return await prisma.purchaseRequestOrder.delete({
    where: {
      id
    }
  });
}
export async function fetchPurchaseRequestSummary() {
  const oneWeekAgo = moment().subtract(7, 'days').startOf('day').toDate();

  const [total, since7days] = await Promise.all([
    prisma.purchaseRequestOrder.count(),
    prisma.purchaseRequestOrder.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    }),
  ]);

  const rate = total > 0 ? (since7days / total) * 100 : 0;

  return {
    total, since7days, rate
  }
}


export async function updatePurchaseRequestOrderApprover({ id, approverId }: IUpdatePurchaseRequestApprover) {
  return await prisma.purchaseRequestOrder.update({
    where: { id },
    data: { approverId }
  });
}
