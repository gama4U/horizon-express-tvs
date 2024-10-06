import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";

interface ICreateTransaction {
  leadId: string;
  salesAgreementId: string;
}
export async function createTransaction({ leadId, salesAgreementId }: ICreateTransaction) {
  return await prisma.transaction.create({
    data: {
      leadId,
      salesAgreementId
    }
  })
}

interface IFetchTransaction {
  id: string;
}

export async function fetchTransaction({ id }: IFetchTransaction) {
  return await prisma.transaction.findUnique({
    where: {
      id
    },
    include: {
      lead: true,
      tourVoucher: {
        include: {
          itineraries: true
        }
      },
      travelVoucher: {
        include: {
          airline: true,
          shipping: true
        }
      },
      accommodationVoucher: true,
      transportVoucher: {
        include: {
          itineraries: true
        }
      }
    }
  })
}
export interface IFetchTransactions {
  skip?: number;
  take?: number;
  search?: string;
}
export async function fetchTransactions({ skip, take, search }: IFetchTransactions) {
  let whereInput: Prisma.TransactionWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        { lead: { firstName: { contains: search, mode: 'insensitive' } } },
        { lead: { lastName: { contains: search, mode: 'insensitive' } } },
      ],
    };
  }

  const findTransaction = prisma.transaction.findMany({
    where: {
      ...whereInput,
    },
    include: {
      lead: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          userType: true
        }
      },
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countTransactions = prisma.transaction.count({
    where: {
      ...whereInput
    },
  });

  const [transactions, total] = await prisma.$transaction([
    findTransaction,
    countTransactions
  ]);

  return { transactions, total };
}
