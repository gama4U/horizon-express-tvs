import { OfficeBranch, Prisma } from "@prisma/client";
import prisma from "../utils/db.utils";
import { ICreateSalesAgreement, IFindSalesAgreements, IUpdateSalesAgreement, IUpdateSalesAgreementApprover } from "../interfaces/sales-agreement.interface";
import moment from "moment";
import { generateSerialNumber } from "../utils/generate-number";

export async function createSalesAgreement({officeBranch, ...data}: ICreateSalesAgreement) {
  const latestSalesAgreement = await prisma.salesAgreement.findFirst({
    where: {
      client: {
        officeBranch
      },
    },
    orderBy: {
      sequenceNumber: 'desc'
    }
  });

  const serialNumber = generateSerialNumber({
    prefix: 'SA',
    uniqueNumber: latestSalesAgreement ? latestSalesAgreement.sequenceNumber + 1 : 1,
    postfix: officeBranch.slice(0, 3)
  });

  return prisma.salesAgreement.create({ data: {...data, serialNumber} });
}

export async function updateSalesAgreement({ id, ...data }: IUpdateSalesAgreement) {
  return prisma.salesAgreement.update({
    where: {
      id
    },
    data
  })
}

export async function findSalesAgreements({ skip, take, search, branch }: IFindSalesAgreements) {
  let whereInput: Prisma.SalesAgreementWhereInput = {};
  let searchFilter = {}

  if (search) {
    const searchParts = search.split(/\s+/)
    searchFilter = {
      AND: searchParts.map((part) => ({
        OR: [
          { firstName: { contains: part, mode: "insensitive" } },
          { lastName: { contains: part, mode: "insensitive" } },
          { email: { contains: part, mode: "insensitive" } },
          { serialNumber: { contains: search, mode: "insensitive" } },
        ],
      })),
    }
  }
  const where: Prisma.SalesAgreementWhereInput = {
    ...searchFilter,
  }


  const findSalesAgreements = prisma.salesAgreement.findMany({
    where: {
      ...where,
      client: {
        officeBranch: branch as OfficeBranch
      }
    },
    include: {
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          userType: true,
          signature: true
        }
      },
      approver: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          userType: true,
          signature: true
        }
      },
      client: true,
      _count: {
        select: {
          salesAgreementItems: true
        }
      }
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countSalesAgreements = prisma.salesAgreement.count({
    where: {
      ...whereInput,
      client: {
        officeBranch: branch as OfficeBranch
      }
    },
  });

  const [salesAgreements, total] = await prisma.$transaction([
    findSalesAgreements,
    countSalesAgreements
  ]);

  return { salesAgreements, total };
}

export async function findSalesAgreementById(id: string) {
  return await prisma.salesAgreement.findUnique({
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
      client: true,
      purchaseRequestOrders: true,
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

export async function fetchSalesAgreementSummary() {
  const oneWeekAgo = moment().subtract(7, 'days').startOf('day').toDate();

  const [total, since7days] = await Promise.all([
    prisma.salesAgreement.count(),
    prisma.salesAgreement.count({
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

export async function updateSalesAgreementApprover({ id, approverId }: IUpdateSalesAgreementApprover) {
  return await prisma.salesAgreement.update({
    where: { id },
    data: { approverId }
  });
}
