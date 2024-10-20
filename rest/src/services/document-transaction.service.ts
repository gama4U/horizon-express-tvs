import { DocumentTransactionType, Prisma } from "@prisma/client";
import prisma from "../utils/db.utils";
import { getNextDtsNumber } from "../utils/generate-number";

export interface ICreateDocumentTransaction {
  type: DocumentTransactionType
  preparedById: string
  clientId: string
}

export async function createDocumentTransaction(data: ICreateDocumentTransaction) {
  const lastDts = await prisma.documentTransaction.findFirst({
    orderBy: { dtsNumber: 'desc' },
  });

  const nextDtsNumber = getNextDtsNumber(lastDts?.dtsNumber || null);

  return await prisma.documentTransaction.create({
    data: {
      ...data,
      dtsNumber: nextDtsNumber,
    },
  });
}
export async function deleteDocumentTransaction(id: string) {
  return await prisma.documentTransaction.delete({
    where: {
      id
    }
  })
}
export interface IUpdateDocumentTransaction {
  id: string
  documents: string[]

  recievedById?: string
  transmittedById?: string
  returnedById?: string
  recievedByOutsider?: string
  recievedFromOutsider?: string
}
export async function updateDocumentTransaction({ id, ...data }: IUpdateDocumentTransaction) {
  return await prisma.documentTransaction.update({
    where: {
      id
    },
    data
  })
}

export interface IFindDocumentTransaction {
  skip?: number;
  take?: number;
  search?: string;
}

export async function fetchDocumentTransactions({ skip, take, search }: IFindDocumentTransaction) {
  let whereInput: Prisma.DocumentTransactionWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        {
          client: {
            name: { contains: search, mode: "insensitive" }
          }
        },
        { dtsNumber: { contains: search, mode: "insensitive" } },
      ],
    }
  }

  const documentTransactions = prisma.documentTransaction.findMany({
    where: {
      ...whereInput,
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countDocumentTransactions = prisma.documentTransaction.count({
    where: {
      ...whereInput
    },
  });

  const [documentTransactionData, total] = await prisma.$transaction([
    documentTransactions,
    countDocumentTransactions
  ]);

  return { documentTransactionData, total };
}
export async function findDocumentTransactionById(id: string) {
  return await prisma.documentTransaction.findUnique({
    where: { id },
    include: {
      preparedBy: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true
        }
      },
      client: true,
      recievedBy: true,
      returnedBy: true,
      transmittedBy: true
    }
  });
}

